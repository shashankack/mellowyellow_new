import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { isRemoteMedia } from "../config/cloudinary";
import "./MediaShell.scss";

let activeHoverVideo = null;

const pauseHoverVideo = (video) => {
  if (!video) return;
  video.pause();
  video.currentTime = 0;
};

export const pauseActiveHoverVideo = () => {
  if (activeHoverVideo) {
    pauseHoverVideo(activeHoverVideo);
    activeHoverVideo = null;
  }
};

const waitForCanPlay = (video, signal) =>
  new Promise((resolve) => {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      resolve();
      return;
    }

    const finish = () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onReady);
      resolve();
    };
    const onReady = () => finish();

    video.addEventListener("canplay", onReady, { once: true });
    video.addEventListener("error", onReady, { once: true });

    if (signal.aborted) {
      finish();
      return;
    }

    signal.addEventListener("abort", finish, { once: true });
  });

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
  const playTokenRef = useRef(0);
  const abortRef = useRef(null);
  const [loaded, setLoaded] = useState(() => !isRemoteMedia(src));
  const remote = isRemoteMedia(src);
  const showSkeleton = remote && !loaded;
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
    setLoaded(!remote);

    const video = videoRef.current;
    if (remote && video && video.readyState >= 2) {
      setLoaded(true);
    }
  }, [remote, src]);

  useEffect(() => {
    if (playOnHover || !autoPlay) return undefined;

    const video = videoRef.current;
    if (!video) return undefined;

    const startPlayback = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startPlayback();
      return undefined;
    }

    video.addEventListener("canplay", startPlayback, { once: true });
    return () => video.removeEventListener("canplay", startPlayback);
  }, [playOnHover, autoPlay, src]);

  useEffect(() => {
    if (!playOnHover) return undefined;

    return () => {
      abortRef.current?.abort();
      const video = videoRef.current;
      if (activeHoverVideo === video) {
        activeHoverVideo = null;
      }
      pauseHoverVideo(video);
    };
  }, [playOnHover]);

  const markLoaded = (event) => {
    setLoaded(true);
    return event;
  };

  const handleLoadedData = (event) => {
    markLoaded(event);
    if (playOnHover) {
      const video = videoRef.current;
      if (video && activeHoverVideo !== video) {
        video.pause();
        video.currentTime = 0;
      }
    }
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

  const handlePointerEnter = useCallback(() => {
    if (!playOnHover) return;

    const video = videoRef.current;
    if (!video) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const token = (playTokenRef.current += 1);

    if (activeHoverVideo && activeHoverVideo !== video) {
      pauseHoverVideo(activeHoverVideo);
    }
    activeHoverVideo = video;

    const attemptPlay = async () => {
      await waitForCanPlay(video, controller.signal);
      if (controller.signal.aborted || playTokenRef.current !== token) return;

      try {
        await video.play();
      } catch {
        // Hover preview was interrupted or blocked.
      }
    };

    attemptPlay();
  }, [playOnHover]);

  const handlePointerLeave = useCallback(() => {
    if (!playOnHover) return;

    playTokenRef.current += 1;
    abortRef.current?.abort();
    abortRef.current = null;

    const video = videoRef.current;
    if (!video) return;

    pauseHoverVideo(video);
    if (activeHoverVideo === video) {
      activeHoverVideo = null;
    }
  }, [playOnHover]);

  const hoverHandlers = playOnHover
    ? { onPointerEnter: handlePointerEnter, onPointerLeave: handlePointerLeave }
    : {};

  const videoElement = (
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

  const shellClassName = `media-shell ${wrapperClassName}`.trim();

  if (!remote && !playOnHover) {
    if (wrapperClassName || wrapperStyle) {
      return (
        <span className={shellClassName} style={wrapperStyle}>
          {videoElement}
        </span>
      );
    }
    return videoElement;
  }

  if (!remote && playOnHover) {
    return (
      <span
        className={shellClassName || "media-shell media-shell--fill"}
        {...hoverHandlers}
      >
        {videoElement}
      </span>
    );
  }

  return (
    <span
      className={shellClassName}
      style={wrapperStyle}
      data-loading={showSkeleton ? "true" : "false"}
      {...hoverHandlers}
    >
      {showSkeleton && <span className="media-skeleton" aria-hidden="true" />}
      {videoElement}
    </span>
  );
});

export default MediaVideo;
