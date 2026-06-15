import { useEffect, useState, useRef, memo, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { useColor } from "../context/ColorContext";
import MediaImage from "../components/MediaImage";
import "../styles/ClientsShowcaseSection.scss";

const THUMB_SIZE = 80;
const THUMB_GAP = 40;
const ITEM_HEIGHT = THUMB_SIZE + THUMB_GAP;
const AUTO_MS = 3000;

const EASE = [0.22, 1, 0.36, 1];
const FAST = { duration: 0.25, ease: EASE };
const SMOOTH = { duration: 0.5, ease: EASE };
const STRIP_SPRING = { type: "spring", stiffness: 110, damping: 22, mass: 0.85 };
const THUMB_SPRING = { type: "spring", stiffness: 260, damping: 22 };
const PROGRESS_SPRING = { type: "spring", stiffness: 140, damping: 24, mass: 0.6 };

const revealProps = (reduceMotion) =>
  reduceMotion
    ? {}
    : {
        initial: { y: 12 },
        whileInView: { y: 0 },
        viewport: { once: true, amount: 0.08 },
        transition: { duration: 0.45, ease: EASE },
      };

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

const preloadAround = (clients, index) => {
  const count = clients.length;
  if (!count) return;

  [
    index,
    (index + 1) % count,
    (index - 1 + count) % count,
  ].forEach((i) => {
    preloadImage(clients[i]?.content);
  });
};

const resolveStripPosition = (currentPosition, normalizedIndex, loopPoint) => {
  const firstCopyPos = normalizedIndex * ITEM_HEIGHT;
  const secondCopyPos = firstCopyPos + loopPoint;

  if (secondCopyPos >= loopPoint) return firstCopyPos;

  const distFirst = Math.abs(currentPosition - firstCopyPos);
  const distSecond = Math.abs(currentPosition - secondCopyPos);

  if (distSecond < distFirst) return secondCopyPos;
  if (distFirst < distSecond) return firstCopyPos;

  return currentPosition >= loopPoint / 2 ? secondCopyPos : firstCopyPos;
};

const HeroFrame = memo(({ clients, activeIndex, reduceMotion }) => {
  const client = clients[activeIndex];
  const [shownSrc, setShownSrc] = useState(client.content);
  const [isReady, setIsReady] = useState(true);
  const shownRef = useRef(client.content);
  const transition = reduceMotion ? { duration: 0 } : SMOOTH;

  useEffect(() => {
    const nextSrc = client.content;
    if (nextSrc === shownRef.current) return undefined;

    let cancelled = false;
    setIsReady(false);

    preloadImage(nextSrc).then(() => {
      if (cancelled) return;
      shownRef.current = nextSrc;
      setShownSrc(nextSrc);
      setIsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [activeIndex, client.content]);

  return (
    <div className="clients-showcase__hero">
      <motion.div
        className="clients-showcase__hero-frame"
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={transition}
      >
        <MediaImage
          src={shownSrc}
          alt={client.title}
          className="clients-showcase__hero-img"
          decoding="async"
          draggable={false}
        />
      </motion.div>
    </div>
  );
});

const VerticalThumbStrip = memo(
  ({
    clients,
    clientCount,
    stripClients,
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
                  onClick={() => onSelect(index % clientCount)}
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
                    loading={index < clientCount + 3 ? "eager" : "lazy"}
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

const ClientsShowcaseSection = ({ clients }) => {
  const { theme } = useColor();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const stripYRef = useRef(0);
  const timerRef = useRef(null);
  const resetFrameRef = useRef(null);

  const clientCount = clients.length;
  const loopPoint = clientCount * ITEM_HEIGHT;
  const stripClients = useMemo(
    () => [...clients, ...clients],
    [clients],
  );

  const [stripY, setStripY] = useState(0);
  const [stripInstant, setStripInstant] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  stripYRef.current = stripY;

  const activeIndex =
    clientCount > 0 ? Math.floor(stripY / ITEM_HEIGHT) % clientCount : 0;
  const stripActiveIndex = Math.floor(stripY / ITEM_HEIGHT);
  const client = clients[activeIndex];
  const progress = clientCount > 0 ? (activeIndex + 1) / clientCount : 0;

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.08,
    margin: "0px 0px -10% 0px",
  });

  useEffect(() => {
    if (!clientCount) return;
    preloadAround(clients, 0);
    clients.slice(0, 4).forEach((item) => preloadImage(item.content));
  }, [clients, clientCount]);

  useEffect(() => {
    if (!clientCount) return;
    preloadAround(clients, activeIndex);
  }, [activeIndex, clients, clientCount]);

  const goToIndex = useCallback(
    (normalizedIndex) => {
      const target = resolveStripPosition(
        stripYRef.current,
        normalizedIndex,
        loopPoint,
      );
      if (target !== stripYRef.current) setStripY(target);
    },
    [loopPoint],
  );

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
      return next >= loopPoint ? loopPoint : next;
    });
  }, [loopPoint]);

  const handleStripSettled = useCallback(() => {
    if (stripYRef.current !== loopPoint) return;

    setStripInstant(true);
    setStripY(0);

    if (resetFrameRef.current) cancelAnimationFrame(resetFrameRef.current);
    resetFrameRef.current = requestAnimationFrame(() => {
      setStripInstant(false);
      resetFrameRef.current = null;
    });
  }, [loopPoint]);

  useEffect(
    () => () => {
      if (resetFrameRef.current) cancelAnimationFrame(resetFrameRef.current);
    },
    [],
  );

  useEffect(() => {
    clearInterval(timerRef.current);
    if (!isInView || isPaused || reduceMotion || !clientCount) return undefined;

    timerRef.current = window.setInterval(advanceStrip, AUTO_MS);

    return () => clearInterval(timerRef.current);
  }, [isInView, isPaused, reduceMotion, advanceStrip, clientCount]);

  if (!clientCount || !client) return null;

  return (
    <section
      ref={sectionRef}
      className="clients-showcase"
      onMouseLeave={resumeAuto}
      aria-label="Client showcase"
    >
      <div className="clients-showcase__inner">
        <motion.header
          className="clients-showcase__header"
          {...revealProps(reduceMotion)}
        >
          <p
            className="clients-showcase__eyebrow"
            style={{ color: theme.backgroundColor }}
          >
            Our Clients
          </p>
          <p
            className="clients-showcase__lede"
            style={{ color: theme.primaryColor }}
          >
            Identity, packaging, and rollout for brands we partner with from first
            sketch to launch.
          </p>
        </motion.header>

        <motion.div
          className="clients-showcase__layout"
          {...revealProps(reduceMotion)}
        >
          <VerticalThumbStrip
            clients={clients}
            clientCount={clientCount}
            stripClients={stripClients}
            stripY={stripY}
            stripInstant={stripInstant}
            stripActiveIndex={stripActiveIndex}
            reduceMotion={reduceMotion}
            onSelect={selectClient}
            onStripSettled={handleStripSettled}
            theme={theme}
            progress={progress}
          />

          <div className="clients-showcase__content">
            <div className="clients-showcase__stage">
              <HeroFrame
                clients={clients}
                activeIndex={activeIndex}
                reduceMotion={reduceMotion}
              />
            </div>

            <aside className="clients-showcase__info">
              <div className="clients-showcase__info-top">
                <p
                  className="clients-showcase__index"
                  style={{ color: theme.backgroundColor }}
                >
                  <span className="clients-showcase__index-current">
                    <AnimatePresence mode="sync" initial={false}>
                      <motion.span
                        key={activeIndex}
                        className="clients-showcase__index-current-value"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={reduceMotion ? { duration: 0 } : FAST}
                      >
                        {String(activeIndex + 1).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="clients-showcase__index-total">
                    / {String(clientCount).padStart(2, "0")}
                  </span>
                </p>

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
              </div>

              <div className="clients-showcase__info-bottom">
                <p
                  className="clients-showcase__pitch"
                  style={{ color: theme.primaryColor }}
                >
                  From brand identity to social campaigns and production, we
                  partner with founders and teams who want work that looks sharp
                  and performs.
                </p>
                <a
                  className="clients-showcase__contact"
                  style={{ color: theme.primaryColor }}
                  href="mailto:mellowyellowstudios09@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  mellowyellowstudios09@gmail.com
                </a>

                <div
                  className="clients-showcase__progress"
                  role="tablist"
                  aria-label="Select client"
                >
                  {clients.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      className={`clients-showcase__progress-dot ${
                        index === activeIndex ? "is-active" : ""
                      }`}
                      style={
                        index === activeIndex
                          ? { backgroundColor: theme.backgroundColor }
                          : undefined
                      }
                      aria-label={`View ${item.title}`}
                      aria-selected={index === activeIndex}
                      onClick={() => selectClient(index)}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ClientsShowcaseSection);
