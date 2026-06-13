import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MediaImage from "../components/MediaImage";
import { useColor } from "../context/ColorContext";
import {
  contactLinks,
  processSteps,
  servicesIntro,
  studioServices,
} from "../data/services";
import "../styles/Services.scss";

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

const ServicesPage = () => {
  const { theme } = useColor();

  const pageTheme = {
    "--page-bg": theme.secondaryColor,
    "--page-text": theme.primaryColor,
    "--page-accent": theme.backgroundColor,
  };

  return (
    <div className="services-page" style={pageTheme}>
      <header className="services-page__hero services-page__inset">
        <motion.div
          className="services-page__hero-copy"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p className="services-page__eyebrow" variants={fadeUp}>
            {servicesIntro.eyebrow}
          </motion.p>
          <motion.h1 className="services-page__title" variants={fadeUp}>
            {servicesIntro.title}
          </motion.h1>
          <motion.p className="services-page__manifesto" variants={fadeUp}>
            {servicesIntro.manifesto}
          </motion.p>
          <motion.p className="services-page__description" variants={fadeUp}>
            {servicesIntro.description}
          </motion.p>
        </motion.div>
      </header>

      <main className="services-page__main">
        <section className="services-page__section services-page__inset">
          <header className="services-page__section-header">
            <p className="services-page__eyebrow">Core offerings</p>
            <h2>What we do</h2>
          </header>

          <motion.div
            className="services-page__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
          >
            {studioServices.map((service) => (
              <motion.article
                key={service.id}
                className="services-page__card"
                variants={fadeUp}
              >
                <Link to={service.slug} className="services-page__card-media">
                  <MediaImage
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    wrapperClassName="media-shell--fill services-page__card-shell"
                    className="services-page__card-img"
                  />
                  <span className="services-page__card-index">{service.index}</span>
                </Link>

                <div className="services-page__card-body">
                  <p className="services-page__card-tagline">{service.tagline}</p>
                  <h3>
                    <Link to={service.slug}>{service.title}</Link>
                  </h3>
                  <p className="services-page__card-description">
                    {service.description}
                  </p>
                  <ul className="services-page__card-tags">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link to={service.slug} className="services-page__card-link">
                    View work →
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="services-page__process services-page__inset">
          <header className="services-page__section-header">
            <p className="services-page__eyebrow">Approach</p>
            <h2>How we work</h2>
          </header>

          <motion.ol
            className="services-page__steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={stagger}
          >
            {processSteps.map((step) => (
              <motion.li key={step.id} className="services-page__step" variants={fadeUp}>
                <span className="services-page__step-index">{step.index}</span>
                <div className="services-page__step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </section>

        <section className="services-page__cta services-page__inset">
          <motion.div
            className="services-page__cta-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <p className="services-page__eyebrow">Start a project</p>
            <h2>Let&apos;s build something that means something.</h2>
            <p className="services-page__cta-note">
              Tell us about your brand, timeline, and goals — we&apos;ll shape a
              collaboration that fits.
            </p>
            <div className="services-page__cta-actions">
              <a
                href={contactLinks.whatsapp}
                className="services-page__cta-btn services-page__cta-btn--primary"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us
              </a>
              <a href={contactLinks.email} className="services-page__cta-btn">
                Email studio
              </a>
              <a
                href={contactLinks.instagram}
                className="services-page__cta-btn"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="services-page__footer services-page__inset">
        <Link to="/" className="services-page__back">
          ← Back to home
        </Link>
        <Link to="/clients" className="services-page__back">
          View clients →
        </Link>
      </footer>
    </div>
  );
};

export default ServicesPage;
