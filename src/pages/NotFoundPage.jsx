import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useColor } from "../context/ColorContext";
import { portfolioCategories } from "../data/portfolio";
import "../styles/NotFoundPage.scss";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const NotFoundPage = () => {
  const { theme } = useColor();

  const pageTheme = {
    "--page-bg": theme.secondaryColor,
    "--page-text": theme.primaryColor,
    "--page-accent": theme.backgroundColor,
  };

  return (
    <div className="not-found" style={pageTheme}>
      <div className="not-found__inset">
        <motion.div
          className="not-found__hero"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p className="not-found__eyebrow" variants={fadeUp}>
            Lost in the noise
          </motion.p>

          <motion.div className="not-found__code-wrap" variants={fadeUp}>
            <span className="not-found__code" aria-hidden="true">
              404
            </span>
            <h1 className="not-found__title">This page doesn&apos;t exist</h1>
          </motion.div>

          <motion.p className="not-found__description" variants={fadeUp}>
            The link may be outdated, or the page was moved. Head back home or
            explore the studio&apos;s work below.
          </motion.p>

          <motion.div className="not-found__actions" variants={fadeUp}>
            <Link to="/" className="not-found__btn not-found__btn--primary">
              Back to home
            </Link>
            <Link to="/services" className="not-found__btn">
              View services
            </Link>
          </motion.div>
        </motion.div>

        <motion.section
          className="not-found__links"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.header className="not-found__links-header" variants={fadeUp}>
            <p className="not-found__eyebrow">Portfolio</p>
            <h2>Find your way</h2>
          </motion.header>

          <motion.div className="not-found__grid" variants={stagger}>
            {portfolioCategories.map((category) => (
              <motion.div key={category.id} variants={fadeUp}>
                <Link to={category.slug} className="not-found__card">
                  <span className="not-found__card-label">{category.label}</span>
                  <span className="not-found__card-hint">{category.tagline}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default NotFoundPage;
