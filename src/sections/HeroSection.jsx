import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useColor } from "../context/ColorContext";
import { videos } from "../config/publicAssets";
import ThemeSwitcher from "../components/ThemeSwitcher";
import MediaVideo from "../components/MediaVideo";
import WaveBackground from "./WaveBackground";
import "../styles/hero.scss";
import "../styles/test.scss";
import "../styles/ani.scss";
import "../styles/screenVideo.scss";

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
  const { theme } = useColor();
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
    <div
      className="tagline-rotator"
      style={{ color: theme.primaryColor }}
      aria-live="polite"
    >
      <div className="tagline-rotator__viewport">
        <AnimatePresence initial={false}>
          <motion.p
            key={activeTagline}
            className="tagline-rotator__word"
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

const HeroIntroPanel = () => {
  const { theme } = useColor();
  return (
    <div
      className="identifont-container"
      style={{ backgroundColor: theme.secondaryColor }}
    >
      <header className="identifont-header">
        <p>01/ &nbsp; &nbsp; BRAND STRATEGY</p>
        <p>02/ &nbsp; &nbsp; TAILORED COLLABORATIONS</p>
        <p>03/ &nbsp; &nbsp; DATA-DRIVEN RESULTS</p>
      </header>
      <div className="categories">
        <ThemeSwitcher />
      </div>
      <div
        className="content"
        style={{ backgroundColor: theme.secondaryColor }}
      >
        <div
          className="latest-fonts"
          style={{ backgroundColor: theme.secondaryColor }}
        >
          <h3>Your Story, Perfectly Told</h3>
          <p>
            At Mellow Yellow, we create content that does more than just catch
            the eye—it captures hearts and drives action. From striking visuals
            to powerful words, our content creation services are tailored to
            elevate your brand and engage your audience.
          </p>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const { theme } = useColor();

  return (
    <div
      className="hero1-main"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.primaryColor,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <div
        className="hero1-1"
        style={{ backgroundColor: theme.backgroundColor }}
      >
        <div className="hero1-1-1">
          <p style={{ color: "black" }}>MELLOW&nbsp;&nbsp;YELLOW</p>
        </div>
        <div className="hero1-1-2">
          <div className="hero1-1-2-1">
            <ul>
              <li>
                <a href="/clients" style={{ color: "black" }}>
                  ◉ CLIENTS
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  style={{ color: "black" }}
                  onClick={scrollToSection("portfolio")}
                >
                  ◉ PORTFOLIO
                </a>
              </li>
              <li>
                <a
                  href="mailto:mellowyellowstudios09@gmail.com"
                  style={{ color: "black" }}
                >
                  ◉ ENQUIRY
                </a>
              </li>
            </ul>
          </div>
          <div className="hero1-1-2-2" />
        </div>
      </div>

      <div className="hero1-3">
        <div
          className="hero1-3-1"
          style={{ backgroundColor: theme.secondaryColor }}
        >
          <div className="test-container">
            <HeroIntroPanel />
          </div>
        </div>
        <div
          className="hero1-3-2"
          style={{ backgroundColor: theme.secondaryColor }}
        >
          <div className="hero1-3-2-1">
            <ServiceTaglineRotator />
          </div>
          <div className="hero1-3-2-2" style={{ border: "1px solid black" }}>
            <div className="video-container-screen">
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
      </div>

      <div className="hero1-2">
        <WaveBackground />
      </div>
    </div>
  );
};

export default HeroSection;
