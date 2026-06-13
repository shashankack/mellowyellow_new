import { forwardRef, useEffect, useRef, useState } from "react";
import { isRemoteMedia } from "../config/cloudinary";
import "./MediaShell.scss";

const MediaImage = forwardRef(function MediaImage(
  {
    src,
    alt = "",
    className,
    wrapperClassName,
    style,
    wrapperStyle,
    objectFit,
    fadeIn = true,
    loading,
    decoding,
    draggable,
    onLoad,
    onError,
    ...props
  },
  forwardedRef,
) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(() => !isRemoteMedia(src));
  const showSkeleton = isRemoteMedia(src) && !loaded;
  const loadedClass = fadeIn ? "is-loaded" : "is-loaded-no-fade";

  const setRefs = (node) => {
    imgRef.current = node;
    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  useEffect(() => {
    const remote = isRemoteMedia(src);
    setLoaded(!remote);

    const img = imgRef.current;
    if (remote && img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const handleLoad = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event) => {
    setLoaded(true);
    onError?.(event);
  };

  const imgStyle = {
    ...style,
    ...(objectFit ? { objectFit } : null),
  };

  const img = (
    <img
      ref={setRefs}
      src={src}
      alt={alt}
      className={`media-shell__media ${className ?? ""} ${loaded ? loadedClass : ""}`.trim()}
      style={imgStyle}
      loading={loading}
      decoding={decoding}
      draggable={draggable}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );

  if (!isRemoteMedia(src)) {
    return img;
  }

  return (
    <span
      className={`media-shell ${wrapperClassName ?? ""}`.trim()}
      style={wrapperStyle}
      data-loading={showSkeleton ? "true" : "false"}
    >
      {showSkeleton && <span className="media-skeleton" aria-hidden="true" />}
      {img}
    </span>
  );
});

export default MediaImage;
