import { lazy, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { useColor } from "../context/ColorContext";
import { portfolioLinks } from "../data/portfolio";
import "../styles/PortfolioLinksSection.scss";

const Particles = lazy(() => import("../components/Particles"));

const ease = [0.22, 1, 0.36, 1];

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const PortfolioLinksSection = () => {
  const { theme } = useColor();
  const particleColors = useMemo(
    () => [theme.backgroundColor, theme.primaryColor],
    [theme.backgroundColor, theme.primaryColor],
  );

  return (
    <section
      className="portfolio-links"
      id="portfolio"
      style={{ backgroundColor: theme.secondaryColor }}
    >
      <div className="portfolio-links__bg-wrap">
        <Suspense fallback={null}>
          <Particles
            className="portfolio-links__particles"
            particleColors={particleColors}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
          />
        </Suspense>
        <div className="portfolio-links__overlay" />
      </div>

      <div className="portfolio-links__content">
        <motion.header
          className="portfolio-links__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
          style={{ color: theme.primaryColor }}
        >
          <p className="portfolio-links__eyebrow">Explore the work</p>
          <h2 className="portfolio-links__title">Four ways we build brands</h2>
        </motion.header>

        <motion.div
          className="portfolio-links__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {portfolioLinks.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="portfolio-links__card"
              variants={cardVariants}
              style={{ color: theme.primaryColor }}
              whileHover={{
                y: -4,
                transition: { duration: 0.25, ease },
              }}
            >
              <span className="portfolio-links__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="portfolio-links__label">{item.label}</span>
              <span className="portfolio-links__tagline">{item.tagline}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioLinksSection;
