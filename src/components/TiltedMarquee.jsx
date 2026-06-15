import "./TiltedMarquee.scss";

const TiltedMarquee = ({
  text = "Mellow Yellow · Mellow Yellow",
  color,
  tilt = -4,
  direction = "left",
  duration = 24,
  fontSize,
  repeat = 8,
  separator = " · ",
  className = "",
}) => {
  const phrase = Array.from({ length: repeat }, () => text).join(separator);
  const style = {
    "--marquee-tilt": `${tilt}deg`,
    "--marquee-duration": `${duration}s`,
    ...(color ? { color } : null),
    ...(fontSize ? { fontSize } : null),
  };

  return (
    <div
      className={`tilted-marquee ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      <div className={`tilted-marquee__track tilted-marquee__track--${direction}`}>
        <span className="tilted-marquee__content">{phrase}</span>
        <span className="tilted-marquee__content">{phrase}</span>
      </div>
    </div>
  );
};

export default TiltedMarquee;
