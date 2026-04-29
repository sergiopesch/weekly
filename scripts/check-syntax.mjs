import { spawn } from "node:child_process";
import { readdir } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const skipDirs = new Set([".git", ".github", "node_modules"]);
const checkedExtensions = new Set([".js", ".mjs"]);
const files = await findJavaScriptFiles(root);

for (const file of files) {
  await run("node", ["--check", file]);
}

console.log(`Syntax checked ${files.length} JavaScript file${files.length === 1 ? "" : "s"}`);

async function findJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      results.push(...(await findJavaScriptFiles(join(directory, entry.name))));
      continue;
    }

    if (entry.isFile() && checkedExtensions.has(extname(entry.name))) {
      results.push(join(directory, entry.name));
    }
  }

  return results.sort((first, second) => relative(root, first).localeCompare(relative(root, second)));
}

function run(command, args) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let output = "";

    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });

    child.on("error", rejectRun);
    child.on("close", (code) => {
      if (code === 0) {
        resolveRun();
        return;
      }

      rejectRun(new Error(`${command} ${args.join(" ")} failed with code ${code}\n${output.trim()}`));
    });
  });
}
