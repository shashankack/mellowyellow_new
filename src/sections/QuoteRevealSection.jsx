import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useColor } from "../context/ColorContext";
import { videos } from "../config/publicAssets";
import MediaVideo from "../components/MediaVideo";
import "../styles/quoteReveal.scss";

const ease = [0.22, 1, 0.36, 1];

const QuoteRevealSection = ({
  quote = "DESIGN WITHOUT MEANING IS JUST ANOTHER IMAGE WITH NOISE!",
  threshold = 0.3,
}) => {
  const { theme } = useColor();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: true });

  const [leadWord, ...restWords] = quote.split(" ");
  const restOfQuote = restWords.join(" ");

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.6,
        ease,
        delayChildren: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="quote-reveal" ref={ref}>
      <motion.div
        className="quote-reveal__intro"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h1
          className="quote-reveal__title"
          style={{ color: theme.backgroundColor }}
        >
          {leadWord}{" "}
          <MediaVideo
            autoPlay
            loop
            muted
            playsInline
            wrapperClassName="media-shell--inline quote-reveal__inline-video"
            src={videos.hero}
          />{" "}
          {restOfQuote}
        </h1>
      </motion.div>

      <motion.div
        className="quote-reveal__body"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="quote-reveal__media">
          <MediaVideo
            autoPlay
            loop
            muted
            playsInline
            wrapperClassName="quote-reveal__tv"
            src={videos.tvCropped}
          />
        </div>

        <div className="quote-reveal__copy">
          <p style={{ color: theme.primaryColor }}>
            We transform your social media presence into a powerful platform for
            connection and growth. Our approach is to combine creativity,
            strategy to ensure your brand stands out in the digital crowd.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default QuoteRevealSection;
