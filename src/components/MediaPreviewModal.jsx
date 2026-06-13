import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import MediaImage from "./MediaImage";
import { isVideoMedia } from "../config/cloudinary";
import "../styles/MediaPreviewModal.scss";

const isPreviewVideo = (preview) =>
  preview?.type === "video" || isVideoMedia(preview?.src);

const MediaPreviewModal = ({ preview, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!preview) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [preview, onClose]);

  useEffect(() => {
    if (!preview || !isPreviewVideo(preview)) return;
    videoRef.current?.play().catch(() => {});
  }, [preview]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {preview && (
        <motion.div
          className="media-preview"
          role="dialog"
          aria-modal="true"
          aria-label={preview.title ?? "Media preview"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="media-preview__backdrop"
            aria-label="Close preview"
            onClick={onClose}
          />

          <motion.div
            className="media-preview__panel"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="media-preview__close"
              aria-label="Close preview"
              onClick={onClose}
            >
              ×
            </button>

            <div className="media-preview__stage">
              {isPreviewVideo(preview) ? (
                <video
                  key={preview.src}
                  ref={videoRef}
                  className="media-preview__video"
                  src={preview.src}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                />
              ) : (
                <MediaImage
                  src={preview.src}
                  alt={preview.title ?? "Preview"}
                  className="media-preview__image"
                  wrapperClassName="media-preview__image-shell"
                />
              )}
            </div>

            {(preview.title || preview.description) && (
              <div className="media-preview__meta">
                {preview.title && <h3>{preview.title}</h3>}
                {preview.description && <p>{preview.description}</p>}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default MediaPreviewModal;
