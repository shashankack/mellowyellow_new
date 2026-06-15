import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");

const files = ["src/data/portfolio.js", "src/data/clients.js", "src/data/services.js"];
const pathRe = /["'`](\/(?:assets|content|clients)\/[^"'`]+)["'`]/g;

const fileIndex = new Map();

const indexPublicDir = (dir, webPrefix) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const webPath = `${webPrefix}/${entry.name}`.replace(/\\/g, "/");

    if (entry.isDirectory()) {
      indexPublicDir(full, webPath);
      continue;
    }

    fileIndex.set(webPath.toLowerCase(), webPath);
  }
};

for (const top of ["assets", "content", "clients"]) {
  const full = path.join(publicRoot, top);
  if (existsSync(full)) indexPublicDir(full, `/${top}`);
}

const resolvePath = (webPath) => {
  const direct = path.join(publicRoot, webPath.replace(/^\//, ""));
  if (existsSync(direct)) return true;

  const lower = webPath.toLowerCase();
  if (fileIndex.has(lower)) return true;

  const dirname = path.posix.dirname(webPath);
  const basename = path.posix.basename(webPath);
  const stem = basename.replace(/\.[^.]+$/, "");
  const ext = path.extname(basename).toLowerCase();

  for (const candidateExt of [ext, ext.toUpperCase(), ".jpg", ".jpeg", ".png", ".mp4", ".MP4", ".webm"]) {
    const candidate = `${dirname}/${stem}${candidateExt}`.toLowerCase();
    if (fileIndex.has(candidate)) return true;
  }

  return false;
};

const missing = new Set();
const referenced = new Set();

for (const file of files) {
  const text = readFileSync(path.join(root, file), "utf8");
  for (const match of text.matchAll(pathRe)) {
    const webPath = match[1];
    if (webPath.includes("${") || webPath.includes(":")) continue;
    referenced.add(webPath);
    if (!resolvePath(webPath)) missing.add(webPath);
  }
}

if (missing.size) {
  console.log([...missing].sort().join("\n"));
  process.exitCode = 1;
} else {
  console.log(`All ${referenced.size} referenced media paths exist.`);
}
