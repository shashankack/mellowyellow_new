const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "";
const FOLDER_PREFIX = import.meta.env.VITE_CLOUDINARY_FOLDER ?? "mellowyellow";
const MEDIA_SOURCE_SETTING = (
  import.meta.env.VITE_MEDIA_SOURCE ?? ""
).toLowerCase();

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const MEDIA_PATH_RE = /^\/(assets|content|clients)\//;

const shouldUseCloudinary = () => {
  if (MEDIA_SOURCE_SETTING === "local") return false;
  if (MEDIA_SOURCE_SETTING === "cloudinary") return Boolean(CLOUD_NAME);
  return Boolean(CLOUD_NAME);
};

export const getMediaSource = () =>
  shouldUseCloudinary() ? "cloudinary" : "local";

export const isCloudinaryConfigured = () => Boolean(CLOUD_NAME);

const normalizePath = (path) => path.replace(/^\/+/, "").replace(/\\/g, "/");

const getResourceType = (path) => {
  const dot = path.lastIndexOf(".");
  if (dot === -1) return "image";
  return VIDEO_EXTENSIONS.has(path.slice(dot).toLowerCase())
    ? "video"
    : "image";
};

/**
 * Resolve a site media path (`/assets/...`, `/content/...`, or `/clients/...`) using
 * VITE_MEDIA_SOURCE (`cloudinary` | `local`). When unset, uses Cloudinary
 * if VITE_CLOUDINARY_CLOUD_NAME is configured, otherwise local files.
 */
export function media(path, options = {}) {
  const normalized = normalizePath(path);

  if (!shouldUseCloudinary()) {
    return `/${normalized}`;
  }

  const resourceType = options.resourceType ?? getResourceType(normalized);
  const publicId = `${FOLDER_PREFIX}/${normalized.replace(/\.[^/.]+$/, "")}`;
  const defaultTransforms = "q_auto,f_auto";
  const transforms = options.transforms
    ? `${defaultTransforms},${options.transforms}/`
    : `${defaultTransforms}/`;

  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${transforms}${publicId}`;
}

export function resolveMediaDeep(value) {
  if (typeof value === "string") {
    return MEDIA_PATH_RE.test(value) ? media(value) : value;
  }

  if (Array.isArray(value)) {
    return value.map(resolveMediaDeep);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, resolveMediaDeep(entry)]),
    );
  }

  return value;
}

/** True for Cloudinary (and other remote) URLs that benefit from load placeholders. */
export function isRemoteMedia(src) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

/** Detect video URLs, including extensionless Cloudinary `/video/upload/` paths. */
export function isVideoMedia(src) {
  if (typeof src !== "string") return false;
  if (/\/video\/upload\//i.test(src)) return true;

  const dot = src.lastIndexOf(".");
  if (dot === -1) return false;

  const ext = src.slice(dot).toLowerCase().split("?")[0];
  return VIDEO_EXTENSIONS.has(ext);
}

export const asset = (path) => media(`assets/${path}`);

export const content = (path) => media(`content/${path}`);

export default media;
