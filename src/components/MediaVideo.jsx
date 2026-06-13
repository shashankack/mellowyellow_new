import { forwardRef, useEffect, useRef, useState } from "react";
import { isRemoteMedia } from "../config/cloudinary";
import "./MediaShell.scss";

const MediaVideo = forwardRef(function MediaVideo(
  {
    src,
    className,
    wrapperClassName = "",
    style,
    wrapperStyle,
    type = "video/mp4",
    fadeIn = true,
    playOnHover = false,
    onLoadedData,
    onCanPlay,
    onError,
    children,
    autoPlay,
    ...props
  },
  forwardedRef,
) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(() => !isRemoteMedia(src));
  const showSkeleton = isRemoteMedia(src) && !loaded;
  const loadedClass = fadeIn ? "is-loaded" : "is-loaded-no-fade";

  const setRefs = (node) => {
    videoRef.current = node;
    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  useEffect(() => {
    const remote = isRemoteMedia(src);
    setLoaded(!remote);

    const video = videoRef.current;
    if (remote && video && video.readyState >= 2) {
      setLoaded(true);
    }
  }, [src]);

  const markLoaded = (event) => {
    setLoaded(true);
    return event;
  };

  const handleLoadedData = (event) => {
    markLoaded(event);
    onLoadedData?.(event);
  };

  const handleCanPlay = (event) => {
    markLoaded(event);
    onCanPlay?.(event);
  };

  const handleError = (event) => {
    setLoaded(true);
    onError?.(event);
  };

  const handleMouseEnter = () => {
    if (!playOnHover) return;
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (!playOnHover) return;
    videoRef.current?.pause();
  };

  const hoverHandlers = playOnHover
    ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
    : {};

  const video = (
    <video
      ref={setRefs}
      className={`media-shell__media ${className ?? ""} ${loaded ? loadedClass : ""}`.trim()}
      style={style}
      autoPlay={playOnHover ? false : autoPlay}
      preload={playOnHover ? "metadata" : undefined}
      onLoadedData={handleLoadedData}
      onCanPlay={handleCanPlay}
      onError={handleError}
      {...props}
    >
      {children ?? (src ? <source src={src} type={type} /> : null)}
    </video>
  );

  if (!isRemoteMedia(src)) {
    if (playOnHover) {
      return (
        <span className="media-shell media-shell--fill" {...hoverHandlers}>
          {video}
        </span>
      );
    }
    return video;
  }

  return (
    <span
      className={`media-shell ${wrapperClassName}`.trim()}
      style={wrapperStyle}
      data-loading={showSkeleton ? "true" : "false"}
      {...hoverHandlers}
    >
      {showSkeleton && <span className="media-skeleton" aria-hidden="true" />}
      {video}
    </span>
  );
});

export default MediaVideo;
