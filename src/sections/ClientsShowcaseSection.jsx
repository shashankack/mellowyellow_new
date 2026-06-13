import { useEffect, useState, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { useColor } from "../context/ColorContext";
import { allClients } from "../data/portfolio";
import MediaImage from "../components/MediaImage";
import "../styles/ClientsShowcaseSection.scss";

const CLIENT_COUNT = allClients.length;
const THUMB_SIZE = 80;
const THUMB_GAP = 40;
const ITEM_HEIGHT = THUMB_SIZE + THUMB_GAP;
const LOOP_POINT = CLIENT_COUNT * ITEM_HEIGHT;
const AUTO_MS = 3000;

const stripClients = [...allClients, ...allClients];

const EASE = [0.22, 1, 0.36, 1];
const FAST = { duration: 0.25, ease: EASE };
const SMOOTH = { duration: 0.5, ease: EASE };
const STRIP_SPRING = { type: "spring", stiffness: 110, damping: 22, mass: 0.85 };
const THUMB_SPRING = { type: "spring", stiffness: 260, damping: 22 };
const PROGRESS_SPRING = { type: "spring", stiffness: 140, damping: 24, mass: 0.6 };

const imageCache = new Map();

const preloadImage = (src) => {
  if (!src) return Promise.resolve();
  if (imageCache.has(src)) return imageCache.get(src);

  const promise = new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });

  imageCache.set(src, promise);
  return promise;
};

const preloadAround = (index) => {
  [
    index,
    (index + 1) % CLIENT_COUNT,
    (index - 1 + CLIENT_COUNT) % CLIENT_COUNT,
  ].forEach((i) => {
    preloadImage(allClients[i]?.content);
  });
};

const resolveStripPosition = (currentPosition, normalizedIndex) => {
  const firstCopyPos = normalizedIndex * ITEM_HEIGHT;
  const secondCopyPos = firstCopyPos + LOOP_POINT;

  if (secondCopyPos >= LOOP_POINT) return firstCopyPos;

  const distFirst = Math.abs(currentPosition - firstCopyPos);
  const distSecond = Math.abs(currentPosition - secondCopyPos);

  if (distSecond < distFirst) return secondCopyPos;
  if (distFirst < distSecond) return firstCopyPos;

  return currentPosition >= LOOP_POINT / 2 ? secondCopyPos : firstCopyPos;
};

const HeroFrame = memo(({ activeIndex, reduceMotion }) => {
  const [layers, setLayers] = useState(() => [
    { src: allClients[0].content, visible: true },
    { src: allClients[0].content, visible: false },
  ]);
  const frontRef = useRef(0);
  const indexRef = useRef(0);
  const client = allClients[activeIndex];
  const transition = reduceMotion ? { duration: 0 } : SMOOTH;

  useEffect(() => {
    if (activeIndex === indexRef.current) return;

    const nextClient = allClients[activeIndex];
    let cancelled = false;

    preloadImage(nextClient.content).then(() => {
      if (cancelled) return;

      const front = frontRef.current;
      const back = front === 0 ? 1 : 0;

      setLayers((prev) => {
        const next = [...prev];
        next[back] = { src: nextClient.content, visible: false };
        return next;
      });

      requestAnimationFrame(() => {
        if (cancelled) return;
        setLayers((prev) => {
          const next = [...prev];
          next[front] = { ...next[front], visible: false };
          next[back] = { src: nextClient.content, visible: true };
          return next;
        });
        frontRef.current = back;
        indexRef.current = activeIndex;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [activeIndex]);

  return (
    <div className="clients-showcase__hero">
      <MediaImage
        src={client.thumbnail}
        alt=""
        wrapperClassName="clients-showcase__hero-shell media-shell--fill clients-showcase__hero-placeholder"
        className="clients-showcase__hero-img"
        aria-hidden="true"
        decoding="async"
        draggable={false}
      />

      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="clients-showcase__hero-img-wrap"
          animate={{
            opacity: layer.visible ? 1 : 0,
            scale: layer.visible ? 1 : 1.04,
          }}
          transition={transition}
        >
          <MediaImage
            src={layer.src}
            alt={client.title}
            wrapperClassName="clients-showcase__hero-shell media-shell--fill"
            className="clients-showcase__hero-img"
            decoding="async"
            draggable={false}
          />
        </motion.div>
      ))}

      <div className="clients-showcase__hero-caption">
        <AnimatePresence mode="sync" initial={false}>
          <motion.p
            key={client.id}
            className="clients-showcase__hero-caption-title"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : FAST}
          >
            {client.title}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
});

const VerticalThumbStrip = memo(
  ({
    stripY,
    stripInstant,
    stripActiveIndex,
    reduceMotion,
    onSelect,
    onStripSettled,
    theme,
    progress,
  }) => {
    const stripTransition = reduceMotion
      ? { duration: 0 }
      : STRIP_SPRING;
    const thumbTransition = reduceMotion ? { duration: 0 } : THUMB_SPRING;
    const progressTransition = reduceMotion ? { duration: 0 } : PROGRESS_SPRING;

    return (
      <aside
        className="clients-showcase__rail-wrap"
        aria-label="Client thumbnails"
      >
        <div className="clients-showcase__rail-viewport">
          <motion.div
            className="clients-showcase__rail-track"
            animate={{ y: -stripY }}
            transition={stripInstant ? { duration: 0 } : stripTransition}
            onAnimationComplete={onStripSettled}
          >
            {stripClients.map((item, index) => {
              const isActive = index === stripActiveIndex;
              return (
                <motion.button
                  key={`${item.id}-${index}`}
                  type="button"
                  className={`clients-showcase__thumb ${isActive ? "is-active" : ""}`}
                  onClick={() => onSelect(index % CLIENT_COUNT)}
                  aria-label={`View ${item.title}`}
                  aria-selected={isActive}
                  role="tab"
                  animate={{
                    opacity: isActive ? 1 : 0.38,
                    scale: isActive ? 1.06 : 0.9,
                  }}
                  transition={thumbTransition}
                  style={{ transformOrigin: "center center" }}
                >
                  <MediaImage
                    src={item.thumbnail}
                    alt=""
                    loading={index < CLIENT_COUNT + 3 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    wrapperClassName="clients-showcase__thumb-shell media-shell--fill"
                  />
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <div
          className="clients-showcase__track clients-showcase__track--vertical"
          aria-hidden="true"
        >
          <motion.div
            className="clients-showcase__track-fill"
            style={{ backgroundColor: theme.backgroundColor }}
            animate={{ scaleY: progress }}
            transition={progressTransition}
          />
        </div>
      </aside>
    );
  },
);

const ClientsShowcaseSection = () => {
  const { theme } = useColor();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const stripYRef = useRef(0);
  const timerRef = useRef(null);
  const resetFrameRef = useRef(null);
  const hasEnteredRef = useRef(false);

  const [stripY, setStripY] = useState(0);
  const [stripInstant, setStripInstant] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [entered, setEntered] = useState(false);

  stripYRef.current = stripY;

  const activeIndex = Math.floor(stripY / ITEM_HEIGHT) % CLIENT_COUNT;
  const stripActiveIndex = Math.floor(stripY / ITEM_HEIGHT);
  const client = allClients[activeIndex];
  const progress = (activeIndex + 1) / CLIENT_COUNT;

  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  useEffect(() => {
    preloadAround(0);
    allClients.slice(0, 4).forEach((item) => preloadImage(item.content));
  }, []);

  useEffect(() => {
    if (isInView && !hasEnteredRef.current) {
      hasEnteredRef.current = true;
      setEntered(true);
    }
  }, [isInView]);

  useEffect(() => {
    preloadAround(activeIndex);
  }, [activeIndex]);

  const goToIndex = useCallback((normalizedIndex) => {
    const target = resolveStripPosition(stripYRef.current, normalizedIndex);
    if (target !== stripYRef.current) setStripY(target);
  }, []);

  const selectClient = useCallback(
    (index) => {
      goToIndex(index);
      setIsPaused(true);
    },
    [goToIndex],
  );

  const resumeAuto = useCallback(() => {
    setIsPaused(false);
  }, []);

  const advanceStrip = useCallback(() => {
    setStripY((prev) => {
      const next = prev + ITEM_HEIGHT;
      return next >= LOOP_POINT ? LOOP_POINT : next;
    });
  }, []);

  const handleStripSettled = useCallback(() => {
    if (stripYRef.current !== LOOP_POINT) return;

    setStripInstant(true);
    setStripY(0);

    if (resetFrameRef.current) cancelAnimationFrame(resetFrameRef.current);
    resetFrameRef.current = requestAnimationFrame(() => {
      setStripInstant(false);
      resetFrameRef.current = null;
    });
  }, []);

  useEffect(
    () => () => {
      if (resetFrameRef.current) cancelAnimationFrame(resetFrameRef.current);
    },
    [],
  );

  useEffect(() => {
    clearInterval(timerRef.current);
    if (!entered || isPaused || reduceMotion) return undefined;

    timerRef.current = window.setInterval(advanceStrip, AUTO_MS);

    return () => clearInterval(timerRef.current);
  }, [entered, isPaused, reduceMotion, advanceStrip]);

  return (
    <section
      ref={sectionRef}
      className="clients-showcase"
      onMouseLeave={resumeAuto}
      aria-label="Client showcase"
    >
      <header
        className={`clients-showcase__header ${entered ? "is-visible" : ""}`}
      >
        <p
          className="clients-showcase__eyebrow"
          style={{ color: theme.backgroundColor }}
        >
          Our Clients
        </p>
        <p
          className="clients-showcase__counter"
          style={{ color: theme.backgroundColor }}
        >
          <span className="clients-showcase__counter-slot">
            <AnimatePresence mode="sync" initial={false}>
              <motion.span
                key={activeIndex}
                className="clients-showcase__counter-current"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : FAST}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </span>
          <span style={{ opacity: 0.35 }}>
            {" "}
            / {String(CLIENT_COUNT).padStart(2, "0")}
          </span>
        </p>
      </header>

      <div
        className={`clients-showcase__layout ${entered ? "is-visible" : ""}`}
      >
        <VerticalThumbStrip
          stripY={stripY}
          stripInstant={stripInstant}
          stripActiveIndex={stripActiveIndex}
          reduceMotion={reduceMotion}
          onSelect={selectClient}
          onStripSettled={handleStripSettled}
          theme={theme}
          progress={progress}
        />

        <div className="clients-showcase__main">
          <div className="clients-showcase__body">
            <div className="clients-showcase__info">
              <div className="clients-showcase__meta">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={client.id}
                    className="clients-showcase__meta-panel"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : FAST}
                  >
                    <h2
                      className="clients-showcase__title"
                      style={{ color: theme.backgroundColor }}
                    >
                      {client.title}
                    </h2>
                    <p
                      className="clients-showcase__tags"
                      style={{ color: theme.backgroundColor }}
                    >
                      {client.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div>
                <p
                  className="clients-showcase__pitch"
                  style={{ color: theme.backgroundColor }}
                >
                  From brand identity to social campaigns and production, we
                  partner with founders and teams who want work that looks sharp
                  and performs.
                </p>
                <p
                  className="clients-showcase__contact"
                  style={{ color: theme.backgroundColor }}
                >
                  mellowyellow@gmail.com
                </p>
              </div>
            </div>

            <div className="clients-showcase__stage">
              <HeroFrame
                activeIndex={activeIndex}
                reduceMotion={reduceMotion}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ClientsShowcaseSection);
