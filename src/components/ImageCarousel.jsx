import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MediaImage from "./MediaImage";
import "./ImageCarousel.scss";

const ImageCarousel = ({
  images,
  direction = "random",
  minDelay = 2000,
  maxDelay = 4000,
}) => {
  const currentIndexRef = useRef(0);
  const slideRefs = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!images?.length) return undefined;

    const availableDirections =
      direction === "vertical"
        ? ["top", "bottom"]
        : direction === "horizontal"
          ? ["left", "right"]
          : ["top", "bottom", "left", "right"];

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      gsap.set(slide, {
        opacity: index === 0 ? 1 : 0,
        x: "0%",
        y: "0%",
      });
    });
    currentIndexRef.current = 0;

    const animateSlide = () => {
      const currentIndex = currentIndexRef.current;
      const nextIndex = (currentIndex + 1) % images.length;
      const currentSlide = slideRefs.current[currentIndex];
      const nextSlide = slideRefs.current[nextIndex];

      if (!currentSlide || !nextSlide) return;

      const selectedDirection =
        availableDirections[
          Math.floor(Math.random() * availableDirections.length)
        ];

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
        gsap.to(currentSlide, {
          y: "100%",
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        });
      } else if (selectedDirection === "bottom") {
        fromProps = { y: "100%", opacity: 1 };
        gsap.to(currentSlide, {
          y: "-100%",
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        });
      } else if (selectedDirection === "left") {
        fromProps = { x: "-100%", opacity: 1 };
        gsap.to(currentSlide, {
          x: "100%",
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        });
      } else {
        fromProps = { x: "100%", opacity: 1 };
        gsap.to(currentSlide, {
          x: "-100%",
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        });
      }

      gsap.fromTo(nextSlide, fromProps, toProps);
      currentIndexRef.current = nextIndex;

      const randomDelay =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(animateSlide, randomDelay);
    };

    const initialDelay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    timeoutRef.current = setTimeout(animateSlide, initialDelay);

    return () => clearTimeout(timeoutRef.current);
  }, [images, direction, minDelay, maxDelay]);

  if (!images?.length) return null;

  return (
    <div className="image-carousel">
      <div className="image-carousel__viewport">
        {images.map((img, index) => (
          <div
            key={`${img}-${index}`}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="image-carousel__slide"
          >
            <MediaImage
              src={img}
              alt={`Slide ${index + 1}`}
              className="image-carousel__media"
              wrapperClassName="media-shell--fill"
              fadeIn={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
