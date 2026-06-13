import { media } from "../config/cloudinary";

export const servicesIntro = {
  eyebrow: "Capabilities",
  title: "Services",
  manifesto: "Design without meaning is just another image in the noise.",
  description:
    "From identity systems to event coverage — we partner with lifestyle, hospitality, and consumer brands to create work that looks sharp and performs.",
};

export const studioServices = [
  {
    id: "branding",
    slug: "/branding",
    index: "01",
    title: "Branding & Identity",
    tagline: "Logos, systems, and rollouts",
    description:
      "Logos, visual language, packaging, and mockups built to feel cohesive on every touchpoint — from storefront to social feed.",
    image: media("/content/branding/sekai/sekai-01.png"),
    deliverables: ["Logo systems", "Brand guidelines", "Packaging", "Mockups"],
  },
  {
    id: "production",
    slug: "/production",
    index: "02",
    title: "Production & Execution",
    tagline: "Photo, video, and delivery",
    description:
      "Photography, motion, and end-to-end production — from lifestyle shoots to polished reels built for pitch decks and social.",
    image: media("/content/works/toqn/toqn-01.jpg"),
    deliverables: ["Photography", "Video production", "Reels & cuts", "Art direction"],
  },
  {
    id: "design",
    slug: "/design",
    index: "03",
    title: "Graphic Design & Posters",
    tagline: "Grids, posters, and campaigns",
    description:
      "Scroll-stopping grids, posters, and campaign creatives designed to grow engagement and keep brands consistently on-brand.",
    image: media("/content/marketing/kyza/kyza-01.jpg"),
    deliverables: ["Instagram grids", "Campaign visuals", "Posters", "Feed strategy"],
  },
  {
    id: "events",
    slug: "/events",
    index: "04",
    title: "Event Launches",
    tagline: "Coverage, reels, and activations",
    description:
      "High-energy event coverage, influencer reels, and PR activations built for social amplification and brand recall.",
    image: media("/content/works/bcc/bcc-04.jpg"),
    deliverables: ["Launch coverage", "Influencer reels", "On-ground content", "Recap edits"],
  },
];

export const processSteps = [
  {
    id: "strategy",
    index: "01",
    title: "Brand strategy",
    description:
      "We start with your story — positioning, audience, and the visual language that makes your brand unmistakable.",
  },
  {
    id: "collaboration",
    index: "02",
    title: "Tailored collaborations",
    description:
      "Every engagement is scoped to your goals — identity rollouts, campaign sprints, or ongoing creative support.",
  },
  {
    id: "results",
    index: "03",
    title: "Data-driven results",
    description:
      "Creative backed by performance — content planning, analytics, and iteration to keep your brand growing.",
  },
];

export const contactLinks = {
  email: "mailto:mellowyellowstudios09@gmail.com",
  whatsapp:
    "https://wa.me/+917760618621?text=Hi%2C%20I'm%20interested%20in%20your%20services",
  instagram: "https://www.instagram.com/mellowyellowstudio/",
};
