import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Masonry from "../components/Masonry";
import MediaVideo from "../components/MediaVideo";
import MediaPreviewModal from "../components/MediaPreviewModal";
import { useColor } from "../context/ColorContext";
import { getPortfolioCategory, portfolioCategories } from "../data/portfolio";
import "../styles/CategoryPortfolioPage.scss";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const STANDARD_COLUMNS = {
  columnQueries: ["(min-width:900px)", "(min-width:600px)"],
  columnValues: [3, 2],
  columnDefault: 1,
};

const COMPACT_COLUMNS = {
  columnQueries: [
    "(min-width:1100px)",
    "(min-width:900px)",
    "(min-width:600px)",
  ],
  columnValues: [4, 3, 2],
  columnDefault: 1,
};

const measureImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () =>
      resolve({
        width: img.naturalWidth || 600,
        height: img.naturalHeight || 800,
      });
    img.onerror = () => resolve({ width: 600, height: 800 });
    img.src = src;
  });

const ProjectMasonry = ({ project, isCompact, onPreview }) => {
  const [items, setItems] = useState([]);

  const columnConfig = isCompact ? COMPACT_COLUMNS : STANDARD_COLUMNS;

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      project.images.map(async (src, index) => {
        const { width, height } = await measureImage(src);
        return {
          id: `${project.id}-${index}`,
          img: src,
          naturalWidth: width,
          naturalHeight: height,
        };
      }),
    ).then((nextItems) => {
      if (!cancelled) setItems(nextItems);
    });

    return () => {
      cancelled = true;
    };
  }, [project.id, project.images]);

  const masonryItems = useMemo(() => items, [items]);

  if (!masonryItems.length) {
    return (
      <div className="category-project__masonry category-project__masonry--loading" />
    );
  }

  return (
    <div className="category-project__masonry">
      <Masonry
        items={masonryItems}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.98}
        blurToFocus
        colorShiftOnHover={false}
        imageFit="contain"
        onItemClick={(item) =>
          onPreview?.({
            type: "image",
            src: item.img,
            title: project.client,
          })
        }
        {...columnConfig}
      />
    </div>
  );
};

const CategoryPortfolioPage = ({ categoryId }) => {
  const { theme } = useColor();
  const category = getPortfolioCategory(categoryId);
  const [preview, setPreview] = useState(null);

  const openPreview = useCallback((item) => setPreview(item), []);
  const closePreview = useCallback(() => setPreview(null), []);

  if (!category) return null;

  const pageTheme = {
    "--page-bg": theme.secondaryColor,
    "--page-text": theme.primaryColor,
    "--page-accent": theme.backgroundColor,
  };

  return (
    <div className="category-page" style={pageTheme}>
      <header className="category-page__hero category-page__inset">
        <motion.div
          className="category-page__hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p className="category-page__eyebrow" variants={fadeUp}>
            {category.intro.eyebrow}
          </motion.p>
          <motion.h1 className="category-page__title" variants={fadeUp}>
            {category.intro.title}
          </motion.h1>
          <motion.p className="category-page__description" variants={fadeUp}>
            {category.intro.description}
          </motion.p>
          <motion.p className="category-page__tagline" variants={fadeUp}>
            {category.tagline}
          </motion.p>
        </motion.div>

        <nav className="category-nav" aria-label="Portfolio categories">
          {portfolioCategories.map((item) => {
            const isActive = item.id === category.id;
            return (
              <Link
                key={item.id}
                to={item.slug}
                className={`category-nav__link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="category-nav__label">{item.label}</span>
                <span className="category-nav__hint">{item.tagline}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="category-page__main">
        {category.projects.length > 0 && (
          <div className="category-projects">
            {category.projects.map((project, index) => {
              const isCompact = project.images.length > 6;

              return (
                <motion.section
                  key={project.id}
                  id={project.id}
                  className="category-project"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.08 }}
                  variants={fadeUp}
                >
                  <header className="category-project__intro">
                    <span className="category-project__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="category-project__intro-copy">
                      <h2>{project.client}</h2>
                      <p className="category-project__services">
                        {project.services}
                      </p>
                      <p className="category-project__description">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className="category-project__count"
                      aria-hidden="true"
                    >
                      {project.images.length} works
                    </span>
                  </header>

                  <ProjectMasonry
                    project={project}
                    isCompact={isCompact}
                    onPreview={openPreview}
                  />
                </motion.section>
              );
            })}
          </div>
        )}

        {category.videos.length > 0 && (
          <section className="category-reel">
            <header className="category-reel__header">
              <p className="category-page__eyebrow">In motion</p>
              <h2 className="category-reel__title">
                Reels &amp; production cuts
              </h2>
            </header>

            <div className="category-reel__grid">
              {category.videos.map((video) => (
                <article key={video.id} className="category-reel__card">
                  <button
                    type="button"
                    className="category-reel__media"
                    aria-label={`Preview ${video.title}`}
                    onClick={() =>
                      openPreview({
                        type: "video",
                        src: video.src,
                        title: video.title,
                        description: video.description,
                      })
                    }
                  >
                    <MediaVideo
                      playOnHover
                      loop
                      muted
                      playsInline
                      wrapperClassName="media-shell--fill"
                      src={video.src}
                    />
                  </button>
                  <div className="category-reel__meta">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="category-page__footer category-page__inset">
        <Link to="/#portfolio" className="category-page__back">
          ← Back to all categories
        </Link>
        <Link to="/clients" className="category-page__back">
          View clients →
        </Link>
      </footer>

      <MediaPreviewModal preview={preview} onClose={closePreview} />
    </div>
  );
};

export default CategoryPortfolioPage;
