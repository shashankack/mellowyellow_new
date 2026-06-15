import { useEffect, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useColor } from "../context/ColorContext";

import { videos } from "../config/publicAssets";

import ThemeSwitcher from "../components/ThemeSwitcher";

import MediaVideo from "../components/MediaVideo";

import WaveBackground from "./WaveBackground";

import "../styles/hero.scss";

const scrollToSection = (id) => (event) => {
  event.preventDefault();

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",

    block: "start",
  });
};

const TAGLINES = [
  "BRANDING",

  "INNOVATE",

  "CUSTOMIZE",

  "CREATE",

  "DEPLOY",

  "MAGIC!",
];

const ServiceTaglineRotator = () => {
  const reduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const activeTagline = TAGLINES[index];

  return (
    <div className="hero__tagline-rotator" aria-live="polite">
      <div className="hero__tagline-viewport">
        <AnimatePresence initial={false}>
          <motion.p
            key={activeTagline}
            className="hero__tagline-word"
            initial={
              reduceMotion
                ? false
                : { y: "110%", opacity: 1, filter: "blur(6px)" }
            }
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 1 }
                : { y: "-110%", opacity: 1, filter: "blur(6px)" }
            }
            transition={{
              y: { type: "spring", stiffness: 130, damping: 22, mass: 0.75 },

              opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              filter: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {activeTagline}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

const HeroIntroPanel = () => (
  <div className="hero__intro-panel">
    <header className="hero__intro-header">
      <p>01/ &nbsp; &nbsp; BRAND STRATEGY</p>

      <p>02/ &nbsp; &nbsp; TAILORED COLLABORATIONS</p>

      <p>03/ &nbsp; &nbsp; DATA-DRIVEN RESULTS</p>
    </header>

    <div className="hero__themes">
      <ThemeSwitcher />
    </div>

    <div className="hero__copy">
      <h3>Your Story, Perfectly Told</h3>

      <p>
        At Mellow Yellow, we create content that does more than just catch the
        eye—it captures hearts and drives action. From striking visuals to
        powerful words, our content creation services are tailored to elevate
        your brand and engage your audience.
      </p>
    </div>
  </div>
);

const HeroSection = () => {
  const { theme } = useColor();

  return (
    <section
      className="hero"
      style={{
        "--hero-bg": theme.backgroundColor,

        "--hero-panel-bg": theme.secondaryColor,

        "--hero-text": theme.primaryColor,
      }}
    >
      <div className="hero__top-bar">
        <div className="hero__brand">
          <img
            src="/assets/images/logo_black.PNG"
            alt="Mellow Yellow"
            className="hero__logo"
            width={220}
            height={44}
            decoding="async"
          />
        </div>

        <nav className="hero__nav" aria-label="Hero links">
          <ul className="hero__nav-list">
            <li>
              <a className="hero__nav-link" href="/clients">
                ◉ CLIENTS
              </a>
            </li>

            <li>
              <a
                className="hero__nav-link"
                href="#portfolio"
                onClick={scrollToSection("portfolio")}
              >
                ◉ PORTFOLIO
              </a>
            </li>

            <li>
              <a
                className="hero__nav-link"
                href="mailto:mellowyellowstudios09@gmail.com"
              >
                ◉ ENQUIRY
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="hero__body">
        <div className="hero__intro">
          <div className="hero__intro-inner">
            <HeroIntroPanel />
          </div>
        </div>

        <div className="hero__showcase">
          <div className="hero__tagline">
            <ServiceTaglineRotator />
          </div>

          <div className="hero__video">
            <MediaVideo
              autoPlay
              loop
              muted
              playsInline
              wrapperClassName="media-shell--fill"
              className="video-bg-screen"
              src={videos.landingMain}
            />
          </div>
        </div>
      </div>

      <div className="hero__waves">
        <WaveBackground />
      </div>
    </section>
  );
};

export default HeroSection;
