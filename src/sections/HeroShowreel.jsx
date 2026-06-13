import { videos } from "../config/publicAssets";
import MediaVideo from "../components/MediaVideo";
import "../styles/heroVideo.scss";

const HeroShowreel = () => (
  <div className="hero-video">
    <MediaVideo
      autoPlay
      muted
      playsInline
      wrapperClassName="media-shell--fill"
      className="video-bg-screen"
      src={videos.small}
    />
  </div>
);

export default HeroShowreel;
