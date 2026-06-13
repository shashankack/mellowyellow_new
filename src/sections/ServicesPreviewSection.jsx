import { videos } from "../config/publicAssets";
import MediaVideo from "../components/MediaVideo";
import "../styles/serviceshowcase.scss";

const ServicesPreviewSection = () => (
  <div className="ss-main0">
    <div className="ss-main1">
      <MediaVideo
        autoPlay
        loop
        muted
        playsInline
        wrapperClassName="media-shell--fill"
        className="ss-video"
        src={videos.main}
      />
    </div>
  </div>
);

export default ServicesPreviewSection;
