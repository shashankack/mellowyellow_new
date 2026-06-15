import { memo, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useColor } from "../context/ColorContext";
import { images as assetImages } from "../config/publicAssets";
import ImageCarousel from "../components/ImageCarousel";
import MediaImage from "../components/MediaImage";
import "../styles/dual.scss";
import "../styles/fancy.scss";

const galleryImages = Object.values(assetImages.gallery).slice(0, 6);

const randomBetween = (min, max) => min + Math.random() * (max - min);

const LEFT_PHRASE = "MELLOW*MELLOW*MELLOW*";
const RIGHT_PHRASE = "*YELLOW*YELLOW*YELLOW*";
const MARQUEE_REPEAT = 14;

const ScrollingMarquee = memo(
  ({ direction, color, baseOffset, scrollEnd, verticalOffset }) => {
    const { scrollY } = useScroll();
    const slide = useTransform(scrollY, [0, 500, 4500], [0, 0, scrollEnd]);
    const phrase = direction === "left" ? LEFT_PHRASE : RIGHT_PHRASE;
    const repeatedText = phrase.repeat(MARQUEE_REPEAT);

    return (
      <motion.div
        className={`box-fancy box-${direction}-fancy`}
        style={{ x: slide, translateX: direction === "left" ? "-20%" : "0%" }}
      >
        <h1 style={{ color }}>
          {direction === "left"
            ? "MELLOW*MELLOW*MELLOW"
            : "*YELLOW*YELLOW*YELLOW*"}
        </h1>
      </motion.div>
    );
  },
);
const VisionSection = () => {
  const { theme } = useColor();
  const marqueeRows = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => {
        const direction = index < 3 ? "left" : "right";
        return {
          id: index,
          direction,
          baseOffset: `${randomBetween(-12, 4).toFixed(1)}%`,
          scrollEnd:
            direction === "left"
              ? randomBetween(60, 160)
              : randomBetween(-260, -120),
          verticalOffset: `${randomBetween(-18, 18).toFixed(1)}px`,
        };
      }),
    [],
  );

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="dual-main">
      <motion.div
        className="dual-left"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
      >
        <MediaImage src={assetImages.ui.candle} alt="Studio still life" />
      </motion.div>

      <motion.div
        className="dual-right"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
      >
        <div className="container-fancy">
          <motion.h1
            className="title-fancy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            VISION
          </motion.h1>
          <motion.h3
            className="description-fancy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            To become a leading creative agency that transforms businesses into
            brands people love.
          </motion.h3>
          <motion.h1
            className="title-fancy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            MISSION
          </motion.h1>
          <motion.h3
            className="description-fancy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: "2rem" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            To help brands reach the right audience, prioritizing meaningful
            engagement and conversions over vanity metrics and reach alone.
            MISSION
          </motion.h3>
          <div className="content-wrapper-fancy">
            <div className="scrolling-text-container">
              {marqueeRows.map((row) => (
                <ScrollingMarquee
                  key={row.id}
                  direction={row.direction}
                  color={theme.backgroundColor}
                  baseOffset={row.baseOffset}
                  scrollEnd={row.scrollEnd}
                  verticalOffset={row.verticalOffset}
                />
              ))}
            </div>
            <div className="overlay-image">
              <AnimatePresence mode="wait">
                <ImageCarousel
                  images={galleryImages}
                  minDelay={3000}
                  maxDelay={5000}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(VisionSection);
