import { motion } from "framer-motion";
import { images as assetImages } from "../config/publicAssets";
import { useColor } from "../context/ColorContext";
import ImageCarousel from "../components/ImageCarousel";
import TiltedMarquee from "../components/TiltedMarquee";
import "../styles/newvision.scss";

const MARQUEE_TEXT = "Mellow Yellow · Mellow Yellow";
const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const fadeFromLeft = {
  hidden: { opacity: 0, y: 32, x: -20 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.85, ease },
  },
};

const fadeFromRight = {
  hidden: { opacity: 0, y: 32, x: 20 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.85, ease },
  },
};

const copyStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
};

const blockStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const NewVisionSection = () => {
  const { theme } = useColor();
  const galleryImages = Object.values(assetImages.gallery);

  const text = {
    vision: {
      title: "VISION",
      description:
        "To become a leading creative agency that transforms businesses into brands people love.",
    },
    mission: {
      title: "MISSION",
      description:
        "To help brands reach the right audience, prioritizing meaningful engagement and conversions over vanity metrics and reach alone.",
    },
  };

  return (
    <div className="newvision_container">
      <div className="left">
        <div className="image_carousel_container">
          <ImageCarousel
            images={galleryImages}
            minDelay={3000}
            maxDelay={5000}
          />
        </div>
      </div>

      <div className="right">
        <motion.div
          className="newvision__copy"
          style={{ color: theme.primaryColor }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
          variants={copyStagger}
        >
          <motion.div className="newvision__copy-block" variants={blockStagger}>
            <motion.h2
              style={{ color: theme.backgroundColor }}
              variants={fadeFromLeft}
            >
              {text.vision.title}
            </motion.h2>
            <motion.p variants={fadeUp}>{text.vision.description}</motion.p>
          </motion.div>
          <motion.div className="newvision__copy-block" variants={blockStagger}>
            <motion.h2
              style={{ color: theme.backgroundColor }}
              variants={fadeFromRight}
            >
              {text.mission.title}
            </motion.h2>
            <motion.p variants={fadeUp}>{text.mission.description}</motion.p>
          </motion.div>
        </motion.div>

        <div className="newvision__marquee-stack">
          <div className="newvision__marquee-slot newvision__marquee-slot--upper">
            <TiltedMarquee
              text={MARQUEE_TEXT}
              color={theme.backgroundColor}
              tilt={-9}
              direction="left"
              duration={100}
            />
          </div>
          <div className="newvision__marquee-slot newvision__marquee-slot--lower">
            <TiltedMarquee
              text={MARQUEE_TEXT}
              color={theme.backgroundColor}
              tilt={7}
              direction="right"
              duration={115}
              fontSize="clamp(2.1rem, 4.8vw, 4.75rem)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVisionSection;
