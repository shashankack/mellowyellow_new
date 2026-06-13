import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MediaImage from "./MediaImage";

const ImageCarousel = ({
  images,
  direction = "random",
  minDelay = 2000,
  maxDelay = 4000,
}) => {
  const currentIndexRef = useRef(0);
  const imageRefs = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!images?.length) return;

    const availableDirections =
      direction === "vertical"
        ? ["top", "bottom"]
        : direction === "horizontal"
          ? ["left", "right"]
          : ["top", "bottom", "left", "right"];

    const animateSlide = () => {
      const currentIndex = currentIndexRef.current;
      const nextIndex = (currentIndex + 1) % images.length;
      currentIndexRef.current = nextIndex;

      const selectedDirection =
        availableDirections[Math.floor(Math.random() * availableDirections.length)];

      let fromProps = {};
      const toProps = {
        opacity: 1,
        x: "0%",
        y: "0%",
        duration: 1,
        ease: "power2.inOut",
      };

      if (selectedDirection === "top") {
        fromProps = { y: "-100%", opacity: 1 };
        gsap.to(imageRefs.current[currentIndex], { y: "100%", opacity: 1, duration: 1, ease: "power2.inOut" });
      } else if (selectedDirection === "bottom") {
        fromProps = { y: "100%", opacity: 1 };
        gsap.to(imageRefs.current[currentIndex], { y: "-100%", opacity: 1, duration: 1, ease: "power2.inOut" });
      } else if (selectedDirection === "left") {
        fromProps = { x: "-100%", opacity: 1 };
        gsap.to(imageRefs.current[currentIndex], { x: "100%", opacity: 1, duration: 1, ease: "power2.inOut" });
      } else {
        fromProps = { x: "100%", opacity: 1 };
        gsap.to(imageRefs.current[currentIndex], { x: "-100%", opacity: 1, duration: 1, ease: "power2.inOut" });
      }

      gsap.fromTo(imageRefs.current[nextIndex], fromProps, toProps);

      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(animateSlide, randomDelay);
    };

    animateSlide();
    return () => clearTimeout(timeoutRef.current);
  }, [images, direction, minDelay, maxDelay]);

  return (
    <div className="slider-section" style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className="slider-container" style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
        {images.map((img, index) => (
          <MediaImage
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            src={img}
            alt={`Slide ${index + 1}`}
            className="slide-image"
            wrapperClassName="media-shell--fill"
            fadeIn={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
