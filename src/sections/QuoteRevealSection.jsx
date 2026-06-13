import { useRef } from "react";

import { motion, useInView } from "framer-motion";

import { useColor } from "../context/ColorContext";

import { videos } from "../config/publicAssets";

import MediaVideo from "../components/MediaVideo";

import "../styles/revealonscroll.scss";

const QuoteRevealSection = ({
  quote = "DESIGN WITHOUT MEANING IS JUST ANOTHER IMAGE WITH NOISE!",
  threshold = 0.3,
}) => {
  const { theme } = useColor();

  const ref = useRef(null);

  const isInView = useInView(ref, { amount: threshold, once: true });

  const variants = {
    hidden: { opacity: 0, y: 50 },

    visible: {
      opacity: 1,

      y: 0,

      transition: {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1],
        delayChildren: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const bulletPoints = [
    "Content Planning & Scheduling: A well-curated, consistent feed that reflects your brand identity.",
    "Engagement & Community Building: Meaningful interactions that build trust and loyalty.",
    "Performance Analytics: Insights to optimize your strategy and drive measurable results.",
  ];

  return (
    <section className="reveal-wrapper" ref={ref}>
      <motion.div
        className="reveal-content"
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="inner-div-ros">
          <h1 style={{ color: theme.backgroundColor }}>
            {quote}

            <MediaVideo
              autoPlay
              loop
              muted
              playsInline
              wrapperClassName="media-shell--inline video-small-screen"
              src={videos.hero}
            />
          </h1>
        </div>
      </motion.div>

      <motion.div
        className="video-container-screen"
        style={{ display: "flex", marginTop: "4rem" }}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <MediaVideo
          autoPlay
          loop
          muted
          playsInline
          wrapperClassName="video-tv-screen"
          src={videos.tvCropped}
        />

        <motion.div
          className="ros"
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p>
            We transform your social media presence into a powerful platform for
            connection and growth. Our approach is to combine creativity,
            strategy, and analytics to ensure your brand stands out in the
            digital crowd.
          </p>

          <motion.ul
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "1rem",
            }}
            variants={{
              hidden: { opacity: 0, y: 50 },

              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.6,
                  ease: [0.22, 1, 0.36, 1],
                  delayChildren: 1.5,
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {bulletPoints.map((item, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default QuoteRevealSection;
