import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "favicon.svg",
  "icons/casa-weekly-mark.svg",
  "site.webmanifest",
  "docs/assets/casa-weekly-banner.png",
];

await Promise.all(requiredFiles.map((path) => access(join(root, path))));

const [indexHtml, manifestText] = await Promise.all([
  readFile(join(root, "index.html"), "utf8"),
  readFile(join(root, "site.webmanifest"), "utf8"),
]);
const manifest = JSON.parse(manifestText);

assert.match(indexHtml, /<link rel="icon" href="favicon\.svg" type="image\/svg\+xml" \/>/);
assert.match(indexHtml, /<link rel="manifest" href="site\.webmanifest" \/>/);
assert.equal(manifest.name, "Casa Weekly");
assert.equal(manifest.display, "standalone");
assert.equal(manifest.theme_color, "#ff5a5f");
assert.equal(manifest.icons[0].src, "icons/casa-weekly-mark.svg");

console.log("Static app assets passed");
