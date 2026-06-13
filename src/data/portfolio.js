import { media } from "../config/cloudinary";

const legacyBrandingImages = Array.from({ length: 26 }, (_, index) =>
  media(`/assets/images/branding-legacy/br${index + 1}.png`),
);

const featuredToProject = (work) => ({
  id: work.id,
  client: work.title,
  services: work.category,
  description: work.description,
  images: work.images,
});

export const featuredWorks = [
  {
    id: "yawn-studio",
    title: "YAWN Studio",
    category: "Branding · Production",
    description:
      "Full visual identity and lifestyle production for a contemporary studio space from brand mockups to editorial photography.",
    thumbnail: media("/content/works/yawn/yawn-01.jpg"),
    fullImage: media("/content/works/yawn/yawn-02.jpg"),
    images: [
      media("/content/works/yawn/yawn-01.jpg"),
      media("/content/works/yawn/yawn-02.jpg"),
      media("/content/works/yawn/yawn-03.jpg"),
      media("/content/works/yawn/yawn-04.jpg"),
    ],
  },
  {
    id: "bcc",
    title: "BCC",
    category: "Event Production",
    description:
      "High-energy event coverage capturing candid moments, atmosphere, and detail built for social amplification and brand recall.",
    thumbnail: media("/content/works/bcc/bcc-01.jpg"),
    fullImage: media("/content/works/bcc/bcc-02.jpg"),
    images: [
      media("/content/works/bcc/bcc-01.jpg"),
      media("/content/works/bcc/bcc-02.jpg"),
      media("/content/works/bcc/bcc-03.jpg"),
      media("/content/works/bcc/bcc-04.jpg"),
    ],
  },
  {
    id: "toqn",
    title: "Toqn",
    category: "Lifestyle · Branding",
    description:
      "Product-forward lifestyle imagery and feed-ready compositions for a modern consumer brand.",
    thumbnail: media("/content/works/toqn/toqn-01.jpg"),
    fullImage: media("/content/works/toqn/toqn-02.jpg"),
    images: [
      media("/content/works/toqn/toqn-01.jpg"),
      media("/content/works/toqn/toqn-02.jpg"),
      media("/content/works/toqn/toqn-03.jpg"),
      media("/content/works/toqn/toqn-04.jpg"),
    ],
  },
  {
    id: "juhi-kejriwal",
    title: "Juhi Kejriwal",
    category: "Editorial · Campaign",
    description:
      "Editorial portraits and campaign visuals blending personal brand storytelling with polished art direction.",
    thumbnail: media("/content/works/juhi/juhi-01.jpg"),
    fullImage: media("/content/works/juhi/juhi-02.jpg"),
    images: [
      media("/content/works/juhi/juhi-01.jpg"),
      media("/content/works/juhi/juhi-02.jpg"),
      media("/content/works/juhi/juhi-03.png"),
      media("/content/works/juhi/juhi-04.png"),
    ],
  },
];

const brandingProjects = [
  {
    id: "sekai-dessert-land",
    client: "Sekai Dessert Land",
    services: "Brand Identity · Mascot Design · Packaging System",
    description:
      "A playful Japanese dessert identity shaped around a lucky-cat mascot, bold red palette, dessert packaging, brand elements, and social-ready visual assets for a dessert concept inspired by taiyaki, mochi, matcha, and Japanese street-sweet culture.",
    images: [
      media("/content/branding/sekai/sekai-01.png"),
      media("/content/branding/sekai/sekai-02.png"),
      media("/content/branding/sekai/sekai-03.jpeg"),
    ],
  },
  {
    id: "yawn-identity",
    client: "YAWN Studio",
    services: "Identity · Mockups · Brand Collateral",
    description:
      "A warm, tactile brand system with mockups and collateral that translate effortlessly across physical and digital spaces.",
    images: [
      media("/content/branding/yawn/yawn-01.jpg"),
      media("/content/branding/yawn/yawn-02.jpg"),
      media("/content/branding/yawn/yawn-03.jpg"),
      media("/content/branding/yawn/yawn-04.png"),
    ],
  },
  {
    id: "logo-portfolio",
    client: "Logo Portfolio",
    services: "Logo Design · Visual Marks",
    description:
      "Distinctive marks built for recall refined typography, balanced geometry, and flexible systems for multi-channel use.",
    images: [
      media("/content/branding/logos/logo-01.png"),
      media("/content/branding/logos/logo-02.png"),
      media("/content/branding/logos/logo-03.png"),
      media("/content/branding/logos/logo-04.png"),
    ],
  },
  {
    id: "brand-mockups",
    client: "Brand Applications",
    services: "Packaging · Mockups · Rollouts",
    description:
      "Real-world brand applications showing how identity systems come alive across packaging, print, and campaign touchpoints.",
    images: [
      media("/content/branding/mockups/brand-01.jpeg"),
      media("/content/branding/mockups/brand-02.jpeg"),
      media("/content/branding/mockups/brand-03.jpeg"),
      media("/content/branding/mockups/brand-04.jpg"),
      media("/content/branding/yawn/yawn-05.jpg"),
      media("/content/branding/yawn/yawn-06.jpg"),
    ],
  },
  {
    id: "legacy-identity",
    client: "Legacy Identity Work",
    services: "Logo · Packaging · Rollout",
    description:
      "An archive of identity systems, packaging explorations, and brand marks crafted for lifestyle and hospitality clients.",
    images: legacyBrandingImages,
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
      media("/content/marketing/grids/grid-01.jpg"),
      media("/content/marketing/grids/grid-02.jpg"),
      media("/content/marketing/grids/grid-03.jpg"),
      media("/content/marketing/grids/grid-04.jpg"),
    ],
  },
  {
    id: "fizzies-goli-soda",
    client: "Fizzies Goli Soda",
    services: "Product Campaign · Packaging Visuals · Social Creative",
    description:
      "A playful product campaign for Fizzies Goli Soda, built around India’s nostalgic marble-bottle soda culture, bold flavour-led visuals, summer refreshment, retro typography, and social-first campaign layouts.",
    images: [
      media("/content/marketing/fizzies/fizzies-01.jpeg"),
      media("/content/marketing/fizzies/fizzies-02.jpg"),
      media("/content/marketing/fizzies/fizzies-03.jpg"),
    ],
  },
  {
    id: "juhi-campaign",
    client: "Juhi Kejriwal",
    services: "Campaign · Social Creative",
    description:
      "Personal brand campaign assets designed for high engagement across Instagram and paid social placements.",
    images: [
      media("/content/marketing/juhi/juhi-01.png"),
      media("/content/marketing/juhi/juhi-02.png"),
      media("/content/marketing/juhi/juhi-03.jpg"),
      media("/content/marketing/juhi/juhi-04.jpg"),
    ],
  },
  {
    id: "kyza",
    client: "Kyza",
    services: "Social Content · Visual Direction",
    description:
      "Bold, product-led social creatives with a consistent visual language built for discovery and conversion.",
    images: [
      media("/content/marketing/kyza/kyza-01.jpg"),
      media("/content/marketing/kyza/kyza-02.jpg"),
      media("/content/marketing/kyza/kyza-03.jpg"),
      media("/content/marketing/kyza/kyza-04.jpg"),
    ],
  },
  {
    id: "smm-management",
    client: "Social Media Management",
    services: "Content Planning · Community Growth",
    description:
      "Always-on content pipelines and platform-native posts that keep brands active, relevant, and visually sharp.",
    images: [
      media("/content/marketing/smm/smm-01.jpeg"),
      media("/content/marketing/smm/smm-02.jpeg"),
      media("/content/marketing/smm/smm-03.jpeg"),
      media("/content/marketing/smm/smm-04.jpeg"),
      media("/content/marketing/grids/grid-05.jpg"),
      media("/content/marketing/grids/grid-06.jpg"),
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
    projects: [
      ...brandingProjects,
      featuredToProject(
        featuredWorks.find((work) => work.id === "yawn-studio"),
      ),
    ],
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
    projects: [
      featuredToProject(featuredWorks.find((work) => work.id === "toqn")),
    ],
    videos: [
      {
        id: "metrics",
        title: "Metrics",
        description: "Data-driven brand storytelling in motion.",
        src: media("/content/videos/metrics.mp4"),
      },
      {
        id: "content",
        title: "Content",
        description: "Campaign content cut for social-first distribution.",
        src: media("/content/videos/content.mp4"),
      },
      {
        id: "ui-ux",
        title: "UI / UX",
        description: "Digital brand experience and interface motion.",
        src: media("/content/videos/ui-ux.mp4"),
      },
      {
        id: "prod1",
        title: "Production Reel I",
        description: "Studio and lifestyle production highlights.",
        src: media("/assets/videos/production/prod1.mp4"),
      },
      {
        id: "hotmoms",
        title: "Hot Moms",
        description: "Campaign production with bold art direction.",
        src: media("/assets/videos/production/hotmoms.mp4"),
      },
      {
        id: "prod2",
        title: "Production Reel II",
        description: "Behind-the-scenes and finished cuts.",
        src: media("/assets/videos/production/prod2.mp4"),
      },
      {
        id: "fizzies-factory-process",
        title: "Fizzies Factory Process",
        description:
          "Process reel showing how Fizzies Goli Soda is made inside the factory, from production flow to bottle-led details, capturing the craft behind the brand’s classic marble-bottle soda experience.",
        src: media("/content/videos/fizzies/fizzies-01.mp4"),
      },
      {
        id: "fizzies-introduction-reel",
        title: "Introducing Fizzies",
        description:
          "A brand introduction reel for Fizzies Goli Soda, presenting the product as a modern take on India’s nostalgic goli soda culture with natural ingredients, bold flavours, and playful refreshment-led storytelling.",
        src: media("/content/videos/fizzies/fizzies-02.mp4"),
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
    projects: [
      ...marketingProjects,
      featuredToProject(
        featuredWorks.find((work) => work.id === "juhi-kejriwal"),
      ),
    ],
    videos: [],
  },
  {
    id: "events",
    slug: "/events",
    label: "Event Launches",
    tagline: "Coverage, reels, and PR activations",
    intro: {
      eyebrow: "Launch Moments",
      title: "Event Launches",
      description:
        "High-energy event coverage, influencer reels, and PR activations built for social amplification and brand recall.",
    },
    gridVariant: "branding",
    projects: [
      featuredToProject(featuredWorks.find((work) => work.id === "bcc")),
    ],
    videos: [
      {
        id: "jalpaan-sunday-brunch",
        title: "Jalpaan Sunday Brunch",
        description:
          "A calm Sunday brunch reel for Jalpaan’s redesigned space and new menu, capturing warm vegetarian dining, plated dishes, guest moments, and the easy rhythm of good food and meaningful conversations.",
        src: media("/content/videos/jalpaan/jalpaan-01.mp4"),
      },
      {
        id: "tamanna-joi",
        title: "Tamanna JOI",
        description: "Influencer-led reel production for launch momentum.",
        src: media("/content/videos/tamanna-joi.mp4"),
      },
      {
        id: "joi-day3",
        title: "JOI Day 3",
        description: "Event recap reel built for reach and retention.",
        src: media("/content/videos/joi-day3.mp4"),
      },
      {
        id: "pr2",
        title: "PR Activation",
        description: "Launch-day content cut for immediate distribution.",
        src: media("/assets/videos/web/pr2.mp4"),
      },
      {
        id: "basitan",
        title: "Basitan",
        description: "Event-led brand storytelling in motion.",
        src: media("/assets/videos/web/basitan.mp4"),
      },
      {
        id: "rro",
        title: "RRO",
        description: "On-ground activation coverage and recap.",
        src: media("/assets/videos/web/rro.mp4"),
      },
    ],
  },
];

export const getPortfolioCategory = (id) =>
  portfolioCategories.find((category) => category.id === id);

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
  CLIENTS_INDEX_PATH,
  getClientBySlug,
  getClientPath,
  getClientsByGroup,
  getClientNeighbors,
  getClientServices,
  getRelatedClients,
} from "./clients";
