import "../styles/layout.scss";
import HeroSection from "../sections/HeroSection";
import HeroShowreel from "../sections/HeroShowreel";
import QuoteRevealSection from "../sections/QuoteRevealSection";
import ServicesPreviewSection from "../sections/ServicesPreviewSection";
import PortfolioLinksSection from "../sections/PortfolioLinksSection";
import SocialDiningSection from "../sections/SocialDiningSection";
import NewVisionSection from "../sections/NewVisionSection.jsx";


const HomePage = () => (
  <div className="layout-main">
    <HeroSection />
    <HeroShowreel />
    <QuoteRevealSection quote="DESIGN WITHOUT MEANING IS JUST ANOTHER IMAGE WITH NOISE!" />
    <ServicesPreviewSection />
    <NewVisionSection />
    <PortfolioLinksSection />
    <SocialDiningSection />
  </div>
);
export default HomePage;
