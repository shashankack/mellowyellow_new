import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(projectRoot, ".env") });
const publicRoot = path.join(projectRoot, "public");

const FOLDER_PREFIX = process.env.CLOUDINARY_FOLDER ?? "mellowyellow";
/** Roots walked recursively — any new subfolder under these is included automatically. */
const UPLOAD_DIRS = [
  path.join(publicRoot, "assets"),
  path.join(publicRoot, "content"),
  path.join(publicRoot, "clients"),
];

const MEDIA_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".avif",
  ".mp4",
  ".webm",
  ".mov",
  ".m4v",
  ".ttf",
  ".otf",
  ".woff",
  ".woff2",
]);

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const RAW_EXTENSIONS = new Set([".ttf", ".otf", ".woff", ".woff2"]);

const requiredEnv = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`Missing ${key}. Add it to a .env file in the project root.`);
    process.exit(1);
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (MEDIA_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

function toRelativeMediaPath(filePath) {
  return path.relative(publicRoot, filePath).replace(/\\/g, "/");
}

function toCloudinaryLocation(filePath) {
  const relative = toRelativeMediaPath(filePath);
  const relativeWithoutExt = relative.replace(/\.[^/.]+$/, "");
  const displayName = path.posix.basename(relativeWithoutExt);
  const dirname = path.posix.dirname(relativeWithoutExt);
  const assetFolder =
    dirname === "." ? FOLDER_PREFIX : `${FOLDER_PREFIX}/${dirname}`;
  const publicId = `${FOLDER_PREFIX}/${relativeWithoutExt}`;

  return { publicId, assetFolder, displayName };
}

const ensuredFolders = new Set();

async function ensureFolder(folderPath) {
  if (!folderPath || ensuredFolders.has(folderPath)) {
    return;
  }

  const segments = folderPath.split("/").filter(Boolean);
  let current = "";

  for (const segment of segments) {
    current = current ? `${current}/${segment}` : segment;
    if (ensuredFolders.has(current)) {
      continue;
    }

    try {
      await cloudinary.api.create_folder(current);
    } catch (error) {
      const code = error.http_code ?? error.error?.http_code;
      const message = error.message ?? error.error?.message ?? "";
      if (code !== 409 && !/already exists/i.test(message)) {
        throw error;
      }
    }

    ensuredFolders.add(current);
  }
}

async function ensureFoldersForFiles(files) {
  const folders = [
    ...new Set(files.map((filePath) => toCloudinaryLocation(filePath).assetFolder)),
  ].sort();

  console.log(`Ensuring ${folders.length} Cloudinary folder(s)...`);

  for (const folder of folders) {
    await ensureFolder(folder);
  }
}

function toResourceType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (RAW_EXTENSIONS.has(ext)) return "raw";
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  return "image";
}

async function resourceExists(publicId, resourceType) {
  try {
    await cloudinary.api.resource(publicId, { resource_type: resourceType });
    return true;
  } catch (error) {
    const code = error.http_code ?? error.error?.http_code;
    if (code === 404) return false;
    throw error;
  }
}

async function uploadFile(filePath) {
  const { publicId, assetFolder, displayName } = toCloudinaryLocation(filePath);
  const resourceType = toResourceType(filePath);

  if (await resourceExists(publicId, resourceType)) {
    const { size } = await stat(filePath);
    return {
      local: `/${toRelativeMediaPath(filePath)}`,
      publicId,
      assetFolder,
      url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${publicId}`,
      bytes: size,
      skipped: true,
    };
  }

  await ensureFolder(assetFolder);

  const fileStats = await stat(filePath);
  const useLargeUpload =
    resourceType === "video" || fileStats.size > 20 * 1024 * 1024;
  const uploadOptions = {
    resource_type: resourceType,
    public_id: publicId,
    asset_folder: assetFolder,
    display_name: displayName,
    overwrite: true,
    invalidate: true,
  };

  const result = useLargeUpload
    ? await cloudinary.uploader.upload_large(filePath, {
        ...uploadOptions,
        chunk_size: 6_000_000,
      })
    : await cloudinary.uploader.upload(filePath, uploadOptions);

  return {
    local: `/${toRelativeMediaPath(filePath)}`,
    publicId,
    assetFolder,
    url: result.secure_url,
    bytes: result.bytes,
  };
}

async function main() {
  const files = (
    await Promise.all(
      UPLOAD_DIRS.map(async (dir) => {
        try {
          return await walk(dir);
        } catch {
          console.warn(`Skipping missing directory: ${dir}`);
          return [];
        }
      }),
    )
  ).flat();

  if (files.length === 0) {
    console.error(
      "No media files found under public/assets, public/content, or public/clients.",
    );
    process.exit(1);
  }

  console.log(`Uploading ${files.length} files to Cloudinary (${FOLDER_PREFIX}/)...`);

  await ensureFoldersForFiles(files);

  const manifest = [];
  let uploaded = 0;

  const failures = [];

  for (const filePath of files) {
    try {
      const entry = await uploadFile(filePath);
      manifest.push(entry);
      uploaded += 1;
      const label = entry.skipped ? "skip" : "upload";
      console.log(`[${uploaded}/${files.length}] (${label}) ${entry.local}`);
    } catch (error) {
      uploaded += 1;
      const local = `/${path.relative(publicRoot, filePath).replace(/\\/g, "/")}`;
      failures.push({ local, error: error.message ?? String(error) });
      console.error(`[${uploaded}/${files.length}] (failed) ${local}`);
      console.error(error.message ?? error);
    }
  }

  const manifestPath = path.join(projectRoot, "cloudinary-manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  const totalMb =
    manifest.reduce((sum, item) => sum + (item.bytes ?? 0), 0) / (1024 * 1024);
  console.log(`\nDone. ${manifest.length} files uploaded (${totalMb.toFixed(1)} MB).`);
  if (failures.length > 0) {
    console.error(`\n${failures.length} file(s) failed:`);
    failures.forEach(({ local, error }) => console.error(`  ${local}: ${error}`));
    process.exit(1);
  }
  console.log(`Manifest written to ${manifestPath}`);
  console.log(
    `\nSet VITE_CLOUDINARY_CLOUD_NAME=${process.env.CLOUDINARY_CLOUD_NAME} in .env for the app.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
