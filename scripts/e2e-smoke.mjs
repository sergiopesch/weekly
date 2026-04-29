import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";

class CdpClient {
  static connect(url) {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(url);
      const client = new CdpClient(socket);
      socket.addEventListener("open", () => resolve(client), { once: true });
      socket.addEventListener("error", reject, { once: true });
    });
  }

  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result || {});
    });
  }

  send(method, params = {}, sessionId = undefined) {
    const id = this.nextId++;
    const message = { id, method, params };
    if (sessionId) message.sessionId = sessionId;
    this.socket.send(JSON.stringify(message));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  close() {
    this.socket.close();
  }
}

const root = resolve(new URL("..", import.meta.url).pathname);
const appUrl = `file://${join(root, "index.html")}`;
const chromium = process.env.CHROMIUM_BIN || "chromium";
const port = 9400 + Math.floor(Math.random() * 400);
const userDataDir = await mkdtemp(join(tmpdir(), "casa-weekly-"));

const browser = spawn(
  chromium,
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);
const browserExit = new Promise((resolveExit) => {
  browser.once("exit", (code, signal) => resolveExit({ code, signal }));
});

let stderr = "";
browser.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});

try {
  const version = await waitForJson(`http://127.0.0.1:${port}/json/version`);
  const client = await CdpClient.connect(version.webSocketDebuggerUrl);
  const { targetId } = await client.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await client.send("Target.attachToTarget", { targetId, flatten: true });

  await client.send("Runtime.enable", {}, sessionId);
  await client.send("Page.enable", {}, sessionId);
  await client.send("Page.navigate", { url: `${appUrl}?test=${Date.now()}` }, sessionId);
  await waitFor(() => evalValue(client, sessionId, `document.readyState === "complete"`));
  await evalValue(client, sessionId, `localStorage.clear(); location.reload(); undefined`);
  await waitFor(() => evalValue(client, sessionId, `document.querySelectorAll(".meal-slot").length === 21`));

  assert.equal(await textIncludes(client, sessionId, "Casa Weekly"), true);
  assert.equal(await evalValue(client, sessionId, `Boolean(document.querySelector("#settings"))`), true);
  assert.equal(await evalValue(client, sessionId, `document.querySelectorAll(".helper-card").length`), 4);
  assert.equal(await evalValue(client, sessionId, `document.querySelectorAll(".meal-slot").length`), 21);
  assert.equal(await evalValue(client, sessionId, `document.querySelectorAll(".shopping-item").length > 0`), true);

  await evalValue(
    client,
    sessionId,
    `(() => {
      document.querySelector("#homeStyleInput").value = "Calm, colourful, low-pressure dinners with Slow Sundays.";
      document.querySelector("#householdInput").value = "Three people, one preschooler, lunches should reuse dinner leftovers.";
    })()`,
  );
  await click(client, sessionId, `[data-action="save-settings"]`);
  assert.equal(
    await evalValue(
      client,
      sessionId,
      `JSON.parse(localStorage.getItem("casa-weekly-v1")).settings.homeStyle.includes("Slow Sundays")`,
    ),
    true,
  );
  assert.equal(await evalValue(client, sessionId, `document.querySelector("#guidePreview").textContent.includes("Slow Sundays")`), true);

  await click(client, sessionId, `[data-promise][value="useGroceriesFirst"]`);
  assert.equal(
    await evalValue(client, sessionId, `JSON.parse(localStorage.getItem("casa-weekly-v1")).settings.promises.useGroceriesFirst`),
    false,
  );

  await evalValue(client, sessionId, `document.querySelector("#pantryInput").value = "broccoli"; undefined`);
  await click(client, sessionId, `[data-action="add-pantry"]`);
  assert.equal(await textIncludes(client, sessionId, "broccoli"), true);

  await evalValue(client, sessionId, `document.querySelector("#avoidInput").value = "salmon"; undefined`);
  await click(client, sessionId, `[data-action="add-avoid"]`);
  assert.equal(await textIncludes(client, sessionId, "salmon"), true);

  const monBreakfastBefore = await slotTitle(client, sessionId, "Mon", "breakfast");
  await click(client, sessionId, `[data-action="choose-meal"][data-day="Mon"][data-type="breakfast"]`);
  await waitFor(() => evalValue(client, sessionId, `document.querySelector("#mealDialog").open`));
  await click(client, sessionId, `[data-action="assign-meal"][data-meal-id="egg-toast"]`);
  await waitFor(() => slotTitle(client, sessionId, "Mon", "breakfast").then((title) => title === "Eggy avocado toast"));
  assert.notEqual(await slotTitle(client, sessionId, "Mon", "breakfast"), monBreakfastBefore);

  await click(client, sessionId, `[data-action="like-meal"][data-meal-id="egg-toast"]`);
  assert.equal(await evalValue(client, sessionId, `JSON.parse(localStorage.getItem("casa-weekly-v1")).memory.favorites["egg-toast"]`), 1);
  assert.equal(await textIncludes(client, sessionId, "Eggy avocado toast"), true);

  await click(client, sessionId, `[data-action="skip-meal"][data-day="Mon"][data-type="breakfast"]`);
  await waitFor(() => evalValue(client, sessionId, `JSON.parse(localStorage.getItem("casa-weekly-v1")).memory.skips["egg-toast"] === 1`));
  assert.equal(await evalValue(client, sessionId, `document.querySelector("#guidePreview").textContent.includes("Most loved: Eggy avocado toast")`), true);

  const tueLunchBefore = await slotTitle(client, sessionId, "Tue", "lunch");
  await click(client, sessionId, `[data-action="toggle-lock"][data-day="Tue"][data-type="lunch"]`);
  await click(client, sessionId, `[data-action="optimize-week"]`);
  assert.equal(await slotTitle(client, sessionId, "Tue", "lunch"), tueLunchBefore);

  await evalValue(client, sessionId, `document.querySelector("#memoryInput").value = "Pancakes were a win"; undefined`);
  await click(client, sessionId, `[data-action="add-memory-note"]`);
  assert.equal(await textIncludes(client, sessionId, "Pancakes were a win"), true);

  const currentWeek = await storageField(client, sessionId, "weekStart");
  const currentWeekMeal = await slotTitle(client, sessionId, "Mon", "breakfast");
  await click(client, sessionId, `[data-action="next-week"]`);
  await waitFor(() => storageField(client, sessionId, "weekStart").then((week) => week !== currentWeek));
  const nextWeek = await storageField(client, sessionId, "weekStart");
  await click(client, sessionId, `[data-action="choose-meal"][data-day="Mon"][data-type="breakfast"]`);
  await waitFor(() => evalValue(client, sessionId, `document.querySelector("#mealDialog").open`));
  await click(client, sessionId, `[data-action="assign-meal"][data-meal-id="banana-pancakes"]`);
  await waitFor(() => slotTitle(client, sessionId, "Mon", "breakfast").then((title) => title === "Banana oat pancakes"));

  await click(client, sessionId, `[data-action="previous-week"]`);
  await waitFor(() => storageField(client, sessionId, "weekStart").then((week) => week === currentWeek));
  assert.equal(await slotTitle(client, sessionId, "Mon", "breakfast"), currentWeekMeal);

  await click(client, sessionId, `[data-action="next-week"]`);
  await waitFor(() => storageField(client, sessionId, "weekStart").then((week) => week === nextWeek));
  assert.equal(await slotTitle(client, sessionId, "Mon", "breakfast"), "Banana oat pancakes");

  const storageShape = await evalValue(
    client,
    sessionId,
    `(() => {
      const state = JSON.parse(localStorage.getItem("casa-weekly-v1"));
      return {
        weeks: Object.keys(state.weeks).length,
        hasMemory: Boolean(state.memory && state.memory.notes.length && state.memory.favorites["egg-toast"]),
        hasCurrentWeek: Boolean(state.weeks[state.weekStart])
      };
    })()`,
  );
  assert.equal(storageShape.weeks >= 2, true);
  assert.equal(storageShape.hasMemory, true);
  assert.equal(storageShape.hasCurrentWeek, true);

  await client.close();
  console.log("E2E smoke passed: planner, groceries, learning, settings, and per-week persistence");
} finally {
  await stopBrowser(browser, browserExit);
  await removeUserDataDir(userDataDir);
  if (browser.exitCode && browser.exitCode !== 0) {
    process.stderr.write(stderr);
  }
}

async function click(client, sessionId, selector) {
  await evalValue(
    client,
    sessionId,
    `(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) throw new Error("Missing selector: " + ${JSON.stringify(selector)});
      element.click();
    })()`,
  );
}

async function slotTitle(client, sessionId, day, type) {
  return evalValue(
    client,
    sessionId,
    `(() => {
      const slot = document.querySelector('[data-action="choose-meal"][data-day="${day}"][data-type="${type}"]').closest(".meal-slot");
      return slot.querySelector(".meal-title strong").textContent.trim();
    })()`,
  );
}

async function storageField(client, sessionId, field) {
  return evalValue(client, sessionId, `JSON.parse(localStorage.getItem("casa-weekly-v1"))[${JSON.stringify(field)}]`);
}

async function textIncludes(client, sessionId, text) {
  return evalValue(client, sessionId, `document.body.innerText.includes(${JSON.stringify(text)})`);
}

async function evalValue(client, sessionId, expression) {
  const response = await client.send(
    "Runtime.evaluate",
    {
      expression,
      awaitPromise: true,
      returnByValue: true,
    },
    sessionId,
  );
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text || "Runtime evaluation failed");
  }
  return response.result.value;
}

async function waitForJson(url) {
  return waitFor(async () => {
    const response = await fetch(url).catch(() => null);
    if (!response?.ok) return null;
    return response.json();
  });
}

async function waitFor(predicate, timeoutMs = 6000) {
  const started = Date.now();
  let lastError;
  while (Date.now() - started < timeoutMs) {
    try {
      const result = await predicate();
      if (result) return result;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  throw lastError || new Error("Timed out waiting for condition");
}

async function stopBrowser(browserProcess, exitPromise) {
  if (browserProcess.exitCode !== null || browserProcess.signalCode !== null) return;

  browserProcess.kill("SIGTERM");
  const stopped = await Promise.race([exitPromise, delay(2500).then(() => null)]);
  if (stopped) return;

  browserProcess.kill("SIGKILL");
  await Promise.race([exitPromise, delay(2500)]);
}

async function removeUserDataDir(path) {
  await rm(path, {
    recursive: true,
    force: true,
    maxRetries: 8,
    retryDelay: 125,
  });
}

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}
