import { useEffect, useState, useRef, memo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useColor } from "../context/ColorContext";
import MediaImage from "../components/MediaImage";
import "../styles/ClientsShowcaseSection.scss";

const AUTO_MS = 3000;
const EASE = [0.22, 1, 0.36, 1];
const FAST = { duration: 0.25, ease: EASE };
const SMOOTH = { duration: 0.5, ease: EASE };

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

  [index, (index + 1) % count, (index - 1 + count) % count].forEach((i) => {
    preloadImage(clients[i]?.content);
  });
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={client.id}
          className="clients-showcase__hero-frame"
          initial={reduceMotion ? false : { opacity: 0, x: -18 }}
          animate={{ opacity: isReady ? 1 : 0, x: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 18 }}
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
      </AnimatePresence>
    </div>
  );
});

const ClientsShowcaseSection = ({ clients }) => {
  const { theme } = useColor();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  const clientCount = clients.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  const selectClient = useCallback((index) => {
    setActiveIndex(index);
    setIsPaused(true);
  }, []);

  const resumeAuto = useCallback(() => {
    setIsPaused(false);
  }, []);

  const advanceClient = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % clientCount);
  }, [clientCount]);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (!isInView || isPaused || reduceMotion || !clientCount) return undefined;

    timerRef.current = window.setInterval(advanceClient, AUTO_MS);

    return () => clearInterval(timerRef.current);
  }, [isInView, isPaused, reduceMotion, advanceClient, clientCount]);

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
          <div className="clients-showcase__header-copy">
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
              Identity, packaging, and rollout for brands we partner with from
              first sketch to launch.
            </p>
          </div>

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
        </motion.header>

        <motion.div
          className="clients-showcase__layout"
          {...revealProps(reduceMotion)}
        >
          <div className="clients-showcase__stage">
            <HeroFrame
              clients={clients}
              activeIndex={activeIndex}
              reduceMotion={reduceMotion}
            />
          </div>

          <aside
            className="clients-showcase__list"
            role="tablist"
            aria-label="Select client"
          >
            {clients.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${item.id}-${item.slug}-${index}`}
                  type="button"
                  role="tab"
                  className={`clients-showcase__list-item ${
                    isActive ? "is-active" : ""
                  }`}
                  aria-selected={isActive}
                  aria-label={`View ${item.title}`}
                  onClick={() => selectClient(index)}
                  style={
                    isActive
                      ? {
                          borderColor: theme.backgroundColor,
                          backgroundColor: `color-mix(in srgb, ${theme.backgroundColor} 12%, transparent)`,
                        }
                      : undefined
                  }
                >
                  <span
                    className="clients-showcase__list-num"
                    style={{ color: theme.backgroundColor }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="clients-showcase__list-thumb">
                    <MediaImage
                      src={item.thumbnail}
                      alt=""
                      loading={index < 4 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      wrapperClassName="clients-showcase__list-thumb-shell media-shell--fill"
                    />
                  </span>
                  <span className="clients-showcase__list-copy">
                    <span
                      className="clients-showcase__list-title"
                      style={{ color: theme.backgroundColor }}
                    >
                      {item.title}
                    </span>
                    <span
                      className="clients-showcase__list-tags"
                      style={{ color: theme.backgroundColor }}
                    >
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </aside>
        </motion.div>

        <motion.footer
          className="clients-showcase__footer"
          {...revealProps(reduceMotion)}
        >
          <div className="clients-showcase__footer-copy">
            <p
              className="clients-showcase__pitch"
              style={{ color: theme.primaryColor }}
            >
              From brand identity to social campaigns and production, we partner
              with founders and teams who want work that looks sharp and
              performs.
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
          </div>

          <div
            className="clients-showcase__progress"
            role="presentation"
            aria-hidden="true"
          >
            <div className="clients-showcase__progress-track">
              <motion.div
                className="clients-showcase__progress-fill"
                style={{ backgroundColor: theme.backgroundColor }}
                animate={{ scaleX: progress }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 140, damping: 24, mass: 0.6 }
                }
              />
            </div>
            <div className="clients-showcase__progress-dots">
              {clients.map((item, index) => (
                <button
                  key={`dot-${item.id}-${item.slug}-${index}`}
                  type="button"
                  className={`clients-showcase__progress-dot ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                  style={
                    index === activeIndex
                      ? { backgroundColor: theme.backgroundColor }
                      : undefined
                  }
                  aria-label={`View ${item.title}`}
                  onClick={() => selectClient(index)}
                />
              ))}
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default memo(ClientsShowcaseSection);
