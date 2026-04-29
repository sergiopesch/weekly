import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
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

const fileStats = await Promise.all(requiredFiles.map((path) => stat(join(root, path))));
fileStats.forEach((fileStat, index) => {
  assert.equal(fileStat.isFile(), true, `${requiredFiles[index]} should be a file`);
  assert.equal(fileStat.size > 0, true, `${requiredFiles[index]} should not be empty`);
});

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
assert.equal(manifest.icons.length > 0, true);
assert.equal(manifest.icons[0].src, "icons/casa-weekly-mark.svg");
assert.equal(manifest.icons[0].type, "image/svg+xml");
assert.match(manifest.icons[0].purpose, /maskable/);

console.log("Static app assets passed");
