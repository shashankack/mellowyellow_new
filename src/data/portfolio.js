import { resolveMediaDeep } from "../config/cloudinary";

const legacyBrandingImages = [
  ...Array.from(
    { length: 13 },
    (_, index) => `/content/branding/legacy/br${index + 1}.png`,
  ),
  "/content/branding/legacy/br14.jpg",
  "/content/branding/legacy/br15.jpg",
];

const brandingProjects = [
  {
    id: "sekai-dessert-land",
    client: "Sekai Dessert Land",
    services: "Brand Identity · Mascot Design · Packaging System",
    description:
      "A playful Japanese dessert identity shaped around a lucky-cat mascot, bold red palette, dessert packaging, brand elements, and social-ready visual assets for a dessert concept inspired by taiyaki, mochi, matcha, and Japanese street-sweet culture.",
    images: [
      "/content/branding/sekai/sekai-01.PNG",
      "/content/branding/sekai/sekai-02.PNG",
      "/content/branding/sekai/sekai-03.jpeg",
    ],
  },
  {
    id: "ashv",
    client: "Ashv",
    services: "Brand Identity · Logo Design · Visual Marks",
    description: "",
    images: [
      "/clients/ashv/branding/ashv-01.png",
      "/clients/ashv/branding/ashv-02.png",
      "/clients/ashv/branding/ashv-03.png",
      "/clients/ashv/branding/ashv-04.png",
      "/clients/ashv/branding/ashv-05.png",
    ],
  },
  {
    id: "logo-portfolio",
    client: "Logo Portfolio",
    services: "Logo Design · Visual Marks",
    description:
      "Distinctive marks built for recall refined typography, balanced geometry, and flexible systems for multi-channel use.",
    fixedItemHeight: 220,
    imageFit: "contain",
    images: [
      "/content/branding/logos/logo-01.png",
      "/content/branding/logos/logo-02.png",
      "/content/branding/logos/logo-03.png",
      "/content/branding/logos/logo-04.png",
      "/content/branding/logos/logo-05.png",
      "/content/branding/logos/logo-06.png",
      "/content/branding/logos/logo-07.png",
      "/content/branding/logos/logo-08.png",
    ],
  },
  {
    id: "brand-mockups",
    client: "Brand Applications",
    services: "Packaging · Mockups · Rollouts",
    description:
      "Real-world brand applications showing how identity systems come alive across packaging, print, and campaign touchpoints.",
    images: [
      "/content/branding/mockups/brand-01.jpeg",
      "/content/branding/mockups/brand-02.jpeg",
      "/content/branding/mockups/brand-03.jpeg",
      "/content/branding/mockups/brand-04.jpg",
      "/content/branding/yawn/yawn-05.jpg",
      "/content/branding/yawn/yawn-06.jpg",
    ],
  },
  {
    id: "legacy-identity",
    client: "Legacy Identity Work",
    services: "Logo · Packaging · Rollout",
    description:
      "An archive of identity systems, packaging explorations, and brand marks crafted for lifestyle and hospitality clients.",
    images: [...legacyBrandingImages],
  },
];

const marketingProjects = [
  {
    id: "instagram-grids",
    client: "Instagram Grids",
    services: "Feed Design · Content Layout",
    description:
      "Cohesive grid systems that make profiles instantly recognizable balanced rhythm, strong hooks, and on-brand storytelling.",
    images: [
      "/content/marketing/grids/grid-01.jpg",
      "/content/marketing/grids/grid-02.png",
      "/content/marketing/grids/grid-03.jpg",
      "/content/marketing/grids/grid-04.jpg",
      "/content/marketing/grids/grid-05.png",
      "/content/marketing/grids/grid-06.jpeg",
    ],
  },
  {
    id: "creative-designs",
    client: "Creative Designs",
    services: "Campaign · Social Creative · Product Visuals",
    description:
      "Bold campaign creatives, product-led layouts, and social-first design across personal brands, beverage launches, and feed-ready promotional work.",
    images: [
      "/content/marketing/posters/fizzies-01.jpeg",
      "/content/marketing/posters/juhi-01.png",
      "/content/marketing/posters/juhi-04.jpg",
      "/content/marketing/posters/sekai-01.png",
      "/content/marketing/posters/sekai-02.jpeg",
      "/content/marketing/posters/matcha-01.png",
    ],
  },
  {
    id: "smm-management",
    client: "Social Media Management",
    services: "Content Planning · Community Growth",
    description:
      "Always-on content pipelines and platform-native posts that keep brands active, relevant, and visually sharp.",
    images: [
      "/content/marketing/smm/smm-01.jpeg",
      "/content/marketing/smm/smm-04.jpeg",
    ],
  },
];

const productionProjects = [
  {
    id: "production-photography",
    client: "Production Photography",
    services: "Photography · Art Direction · Retouching",
    description:
      "Lifestyle, product, studio, and campaign photography — editorial shoots, product stills, and feed-ready compositions built for social, e-commerce, and brand rollouts.",
    images: [
      "/content/works/toqn/toqn-01.jpg",
      "/content/works/toqn/toqn-02.jpg",
      "/content/works/yawn/yawn-03.jpg",
      "/assets/images/gallery/image_1.jpg",
      "/assets/images/gallery/image_2.jpg",
      "/assets/images/gallery/image_3.jpg",
      "/assets/images/gallery/image_4.jpg",
      "/assets/images/gallery/image_5.jpg",
      "/content/works/yawn/yawn-04.jpg",
      "/content/marketing/posters/fizzies-02.jpg",
      "/content/works/juhi/juhi-01.jpg",
      "/content/works/juhi/juhi-03.png",
      "/content/works/juhi/juhi-04.png",
      "/content/works/bungeo/bungeo_01.jpeg",
      "/content/works/bungeo/bungeo_02.jpeg",
      "/content/works/production/bcc-02.jpg",
      "/content/works/production/bcc-03.jpg",
    ],
  },
];

export const portfolioCategories = [
  {
    id: "branding",
    slug: "/branding",
    label: "Branding & Identity",
    tagline: "Logos, systems, and rollouts",
    intro: {
      eyebrow: "Identity Systems",
      title: "Branding & Identity",
      description:
        "Logos, visual language, packaging, and mockups built to feel cohesive on every touchpoint, from storefront to social feed.",
    },
    gridVariant: "branding",
    projects: [...brandingProjects],
    videos: [],
  },
  {
    id: "production",
    slug: "/production",
    label: "Production & Execution",
    tagline: "Photo, video, and delivery",
    intro: {
      eyebrow: "Craft & Delivery",
      title: "Production & Execution",
      description:
        "Photography, motion, and end-to-end production from lifestyle shoots to polished reels built for pitch decks and social.",
    },
    gridVariant: "branding",
    projects: [...productionProjects],
    videos: [
      {
        id: "Jewellery Shoot",
        title: "Jewellery Shoot",
        description: "Jewellery shoot for a client.",
        src: "/content/videos/production/prod2.mp4",
      },
      {
        id: "fizzies-factory-process",
        title: "Fizzies Factory Process",
        description:
          "Process reel showing how Fizzies Goli Soda is made inside the factory, from production flow to bottle-led details, capturing the craft behind the brand’s classic marble-bottle soda experience.",
        src: "/content/videos/production/vid-01.mp4",
      },
      {
        id: "fizzies-introduction-reel",
        title: "Introducing Fizzies",
        description:
          "A brand introduction reel for Fizzies Goli Soda, presenting the product as a modern take on India’s nostalgic goli soda culture with natural ingredients, bold flavours, and playful refreshment-led storytelling.",
        src: "/content/videos/production/vid-02.mp4",
      },
      {
        id: "production-shoot",
        title: "Production Shoot",
        description: "Production Shoot for a client.",
        src: "/content/videos/production/prod_snooker.mp4",
      },
      {
        id: "jewellery-shoot",
        title: "Jewellery Shoot",
        description: "Jewellery shoot for a client.",
        src: "/content/videos/production/jewellery.mp4",
      },
      {
        id: "zawaa-shoot",
        title: "Zawaa Shoot",
        description: "Zawaa shoot for a client.",
        src: "/content/videos/production/zawaa.mp4",
      },
    ],
  },
  {
    id: "design",
    slug: "/design",
    label: "Graphic Design & Posters",
    tagline: "Grids, posters, and campaigns",
    intro: {
      eyebrow: "Visual Campaigns",
      title: "Graphic Design & Posters",
      description:
        "Scroll-stopping grids, posters, and campaign creatives designed to grow engagement and keep brands consistently on-brand.",
    },
    gridVariant: "marketing",
    projects: [...marketingProjects],
    videos: [],
  },
  {
    id: "pr",
    slug: "/pr",
    label: "PR Activities",
    tagline: "Coverage, activations, and reels",
    intro: {
      eyebrow: "Public Relations",
      title: "PR Activities",
      description:
        "Event coverage, influencer reels, and on-ground PR activations — photography and motion built for launch momentum and social amplification.",
    },
    gridVariant: "branding",
    projects: [],
    videos: [
      {
        id: "jalpaan-sunday-brunch",
        title: "Jalpaan Sunday Brunch",
        description:
          "A calm Sunday brunch reel for Jalpaan’s redesigned space and new menu, capturing warm vegetarian dining, plated dishes, guest moments, and the easy rhythm of good food and meaningful conversations.",
        src: "/content/videos/pr-activities/pr-01.MP4",
      },
      {
        id: "moms-day-x-cult",
        title: "Mothers Day x Cult",
        description: "Mothers Day x Cult event coverage and recap.",
        src: "/content/videos/pr-activities/pr-02.MP4",
      },
      {
        id: "joi",
        title: "JOI",
        description: "Event recap reel built for reach and retention.",
        src: "/content/videos/pr-activities/pr-03.mp4",
      },
      {
        id: "pr-package",
        title: "PR Package",
        description: "PR package for a client.",
        src: "/content/videos/pr-activities/pr-04.mp4",
      },
      {
        id: "bastian",
        title: "Bastian",
        description: "Bastian event coverage and recap.",
        src: "/content/videos/pr-activities/pr-05.mp4",
      },
      {
        id: "social-dining-x-phurr",
        title: "Social Dining x Phurr",
        description: "Social Dining x Phurr event coverage and recap.",
        src: "/content/videos/pr-activities/pr-06.mp4",
      },
    ],
  },
];

export const getPortfolioCategory = (id) => {
  const category = portfolioCategories.find((entry) => entry.id === id);
  return category ? resolveMediaDeep(category) : undefined;
};

export const portfolioLinks = portfolioCategories.map(
  ({ label, slug, tagline }) => ({
    label,
    href: slug,
    tagline,
  }),
);

export {
  allClients,
  clientShowcase,
  legacyClients,
  newAllClients,
  CLIENTS_INDEX_PATH,
  getClientBySlug,
  getClientPath,
  getClientsByGroup,
  getClientNeighbors,
  getClientServices,
  getRelatedClients,
} from "./clients";
