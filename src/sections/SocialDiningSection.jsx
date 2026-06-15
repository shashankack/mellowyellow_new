import { memo } from "react";
import { useColor } from "../context/ColorContext";
import { images, videos } from "../config/publicAssets";
import MediaImage from "../components/MediaImage";
import MediaVideo from "../components/MediaVideo";
import "../styles/ScreenSixScrollPower.scss";
import ClientsShowcaseSection from "./ClientsShowcaseSection";
import { newAllClients } from "../data/clients";
const SocialDiningSection = () => {
  const { theme } = useColor();

  return (
    <div className="sticky-scroll-stack">
      <section className="scrollpower">
        <div className="sp-main">
          <div className="sp-left">
            <MediaImage src={images.ui.sdAsset1} alt="Social Dining" />
          </div>
          <div className="sp-right">
            <div className="sp-right-1">
              <MediaVideo
                autoPlay
                loop
                muted
                playsInline
                wrapperClassName="sp-right-vid"
                src={videos.socialDining}
              />
              <p className="social-dining-text">
                Social Dining
                <br />
                bring
                <br />
                strangers <br />
                together
                <br />
                for fun
                <br />
                activities
                <br />
                great conversations <br />
                delicious food
                <br />
                an unforgettable <br />
                experience of
                <br />
                connection
                <br />
                laughter and <br />
                joy!!
                <br />
                we ensure <br />
                your time <br />
                deliver <br />
                memories
                <br />
                you never <br />
                forget.
                <br />
              </p>
              <p className="label-text label-social">[ S O C I A L ]</p>
              <p className="label-text label-dining">[ D I N I N G ]</p>
            </div>
            <div className="sp-right-2">
              <MediaImage src={images.ui.sdAsset2} alt="Social Dining" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="new"
        style={{ backgroundColor: theme.backgroundColor }}
      >
        <MediaImage
          src={images.ui.craft}
          alt="Craft"
          wrapperClassName="craft-image"
        />
        <MediaVideo
          autoPlay
          loop
          muted
          playsInline
          wrapperClassName="cube-vid"
          src={videos.small}
        />
      </section>
      <ClientsShowcaseSection clients={newAllClients} />
    </div>
  );
};

export default memo(SocialDiningSection);
