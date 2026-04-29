import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(process.argv[2] || join(root, "docs/assets/casa-weekly-banner.png"));
const chromium = process.env.CHROMIUM_BIN || "chromium";
const appUrl = `${pathToFileURL(join(root, "index.html")).href}?readme-banner=${Date.now()}`;

await mkdir(dirname(output), { recursive: true });

await run(chromium, [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--window-size=1440,900",
  `--screenshot=${output}`,
  appUrl,
]);

console.log(`Captured README banner: ${output}`);

function run(command, args) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", rejectRun);
    child.on("close", (code) => {
      if (code === 0) {
        resolveRun();
        return;
      }

      rejectRun(new Error(`${command} exited with code ${code}\n${stderr.trim()}`));
    });
  });
}
