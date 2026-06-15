import { asset } from "./cloudinary";

export const images = {
  logoBlack: asset("images/logo_black.PNG"),
  ui: {
    candle: asset("images/gallery/candle.jpg"),
    craft: asset("images/gallery/craft.png"),
    sdAsset1: asset("images/gallery/sdasset1.png"),
    sdAsset2: asset("images/gallery/sdasset2.png"),
  },
  gallery: {
    image1: asset("images/gallery/image_1.jpg"),
    image2: asset("images/gallery/image_2.jpg"),
    image3: asset("images/gallery/image_3.jpg"),
    image4: asset("images/gallery/image_4.jpg"),
    image5: asset("images/gallery/image_5.jpg"),
  },
};

export const videos = {
  hero: asset("videos/hero/hero.mp4"),
  main: asset("videos/hero/video_1.mp4"),
  landingMain: asset("videos/hero/hero-new.mp4"),
  small: asset("videos/hero/small.mp4"),
  tvCropped: asset("videos/hero/tvCropped.mp4"),
  socialDining: asset("videos/social-dining/sdn.mp4"),
};
export default asset;
