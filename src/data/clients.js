import { media } from "../config/cloudinary";

export const CLIENTS_INDEX_PATH = "/clients";

/** @typedef {'featured' | 'archive'} ClientGroup */

/**
 * @typedef {Object} ClientRecord
 * @property {number} id
 * @property {string} slug — URL segment for `/clients/:slug`
 * @property {ClientGroup} group
 * @property {string} thumbnail
 * @property {string} title
 * @property {string} description
 * @property {string} content — Primary hero / cover asset
 * @property {string[]=} images — Optional gallery; defaults to `[content]`
 * @property {string=} summary — Optional long-form copy for detail pages
 */

/** @param {Omit<ClientRecord, 'images'> & { images?: string[] }} client */
const defineClient = (client) => ({
  ...client,
  images: client.images ?? (client.content ? [client.content] : []),
});

/** @type {ClientRecord[]} */
export const clientShowcase = [
  defineClient({
    id: 101,
    slug: "yawn-studio",
    group: "featured",
    thumbnail: media("/content/works/yawn/yawn-01.jpg"),
    title: "YAWN STUDIO",
    description: "BRANDING & IDENTITY · PRODUCTION",
    content: media("/content/branding/yawn/yawn-02.jpg"),
    images: [
      media("/content/branding/yawn/yawn-02.jpg"),
      media("/content/works/yawn/yawn-01.jpg"),
      media("/content/works/yawn/yawn-03.jpg"),
      media("/content/works/yawn/yawn-04.jpg"),
    ],
    summary:
      "Full visual identity and lifestyle production — brand mockups, spatial styling, and editorial photography for a contemporary studio.",
  }),
  defineClient({
    id: 102,
    slug: "kyza",
    group: "featured",
    thumbnail: media("/content/marketing/kyza/kyza-01.jpg"),
    title: "KYZA",
    description: "GRAPHIC DESIGN · VISUAL DIRECTION",
    content: media("/content/marketing/kyza/kyza-03.jpg"),
    images: [
      media("/content/marketing/kyza/kyza-01.jpg"),
      media("/content/marketing/kyza/kyza-02.jpg"),
      media("/content/marketing/kyza/kyza-03.jpg"),
      media("/content/marketing/kyza/kyza-04.jpg"),
    ],
    summary:
      "Visual direction and graphic design for a contemporary lifestyle brand — from feed systems to campaign-ready assets.",
  }),
  defineClient({
    id: 103,
    slug: "juhi-kejriwal",
    group: "featured",
    thumbnail: media("/content/works/juhi/juhi-01.jpg"),
    title: "JUHI KEJRIWAL",
    description: "GRAPHIC DESIGN · CAMPAIGN",
    content: media("/content/marketing/juhi/juhi-03.jpg"),
    images: [
      media("/content/works/juhi/juhi-01.jpg"),
      media("/content/works/juhi/juhi-02.jpg"),
      media("/content/marketing/juhi/juhi-03.jpg"),
      media("/content/marketing/juhi/juhi-04.jpg"),
    ],
    summary:
      "Campaign visuals and graphic design spanning editorial layouts, social assets, and brand-forward storytelling.",
  }),
  defineClient({
    id: 104,
    slug: "toqn",
    group: "featured",
    thumbnail: media("/content/works/toqn/toqn-01.jpg"),
    title: "TOQN",
    description: "PRODUCTION · LIFESTYLE",
    content: media("/content/works/toqn/toqn-03.jpg"),
  }),
  defineClient({
    id: 105,
    slug: "bcc",
    group: "featured",
    thumbnail: media("/content/works/bcc/bcc-04.jpg"),
    title: "BCC",
    description: "EVENT LAUNCHES · COVERAGE",
    content: media("/content/works/bcc/bcc-04.jpg"),
  }),
  defineClient({
    id: 106,
    slug: "logo-systems",
    group: "featured",
    thumbnail: media("/content/branding/logos/logo-01.png"),
    title: "LOGO SYSTEMS",
    description: "BRANDING & IDENTITY · ROLLOUT",
    content: media("/content/branding/logos/logo-03.png"),
  }),
  defineClient({
    id: 107,
    slug: "instagram-grids",
    group: "featured",
    thumbnail: media("/content/marketing/grids/grid-04.jpg"),
    title: "INSTAGRAM GRIDS",
    description: "GRAPHIC DESIGN · FEED STRATEGY",
    content: media("/content/marketing/grids/grid-04.jpg"),
  }),
  defineClient({
    id: 108,
    slug: "social-management",
    group: "featured",
    thumbnail: media("/content/marketing/smm/smm-01.jpeg"),
    title: "SOCIAL MANAGEMENT",
    description: "GRAPHIC DESIGN · COMMUNITY",
    content: media("/content/marketing/smm/smm-03.jpeg"),
  }),
  defineClient({
    id: 109,
    slug: "sekai-dessert-land",
    group: "featured",
    thumbnail: media("/content/branding/sekai/sekai-01.png"),
    title: "SEKAI DESSERT LAND",
    description: "BRANDING & IDENTITY · PACKAGING",
    content: media("/content/branding/sekai/sekai-03.jpg"),
    images: [
      media("/content/branding/sekai/sekai-01.png"),
      media("/content/branding/sekai/sekai-02.png"),
      media("/content/branding/sekai/sekai-03.jpg"),
    ],
    summary:
      "Identity, packaging, and rollout for a dessert concept — playful brand language carried through every touchpoint.",
  }),
  defineClient({
    id: 110,
    slug: "fizzies-goli-soda",
    group: "featured",
    thumbnail: media("/content/marketing/fizzies/fizzies-01.jpg"),
    title: "FIZZIES GOLI SODA",
    description: "PRODUCT VISUALS · CAMPAIGN PRODUCTION",
    content: media("/content/marketing/fizzies/fizzies-02.jpg"),
  }),
];

/** @type {ClientRecord[]} */
export const legacyClients = [
  defineClient({
    id: 1,
    slug: "umimatcha",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb1.png"),
    title: "UMIMATCHA",
    description: "BRANDING & IDENTITY",
    content: media("/assets/images/clients/umithumb.jpg"),
  }),
  defineClient({
    id: 2,
    slug: "desidharti",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb2.png"),
    title: "DESIDHARTI",
    description: "BRANDING & IDENTITY",
    content: media("/assets/images/clients/thumbdesi.jpg"),
  }),
  defineClient({
    id: 3,
    slug: "peekaboo",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb3.png"),
    title: "PEEKABOO",
    description: "BRANDING & IDENTITY",
    content: media("/assets/images/clients/pekathumb.jpg"),
  }),
  defineClient({
    id: 4,
    slug: "holykicks",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb4.png"),
    title: "HOLYKICKS",
    description: "BRANDING & IDENTITY",
    content: media("/assets/images/clients/holykicksthumb.jpg"),
  }),
  defineClient({
    id: 5,
    slug: "ibh",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb5.png"),
    title: "IBH",
    description: "GRAPHIC DESIGN",
    content: media("/assets/images/clients/ibhthumb.jpg"),
  }),
  defineClient({
    id: 6,
    slug: "bhrama",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb6.png"),
    title: "BHRAMA",
    description: "PRODUCTION & EXECUTION",
    content: media("/assets/images/clients/bhramathumb.jpg"),
  }),
  defineClient({
    id: 7,
    slug: "palms",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb7.png"),
    title: "PALMS",
    description: "PRODUCTION & EXECUTION",
    content: media("/assets/images/clients/palmsthumb.jpg"),
  }),
  defineClient({
    id: 8,
    slug: "itc",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb8.png"),
    title: "ITC",
    description: "PRODUCTION & EXECUTION",
    content: media("/assets/images/clients/itcthumb.jpg"),
  }),
  defineClient({
    id: 9,
    slug: "gamediaz",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb9.png"),
    title: "GAMEDIAZ",
    description: "GRAPHIC DESIGN",
    content: media("/assets/images/clients/gamethumb.jpg"),
  }),
  defineClient({
    id: 10,
    slug: "astro",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb10.png"),
    title: "ASTRO",
    description: "GRAPHIC DESIGN",
    content: media("/assets/images/clients/astro_image.png"),
  }),
  defineClient({
    id: 12,
    slug: "unnecessary",
    group: "archive",
    thumbnail: media("/assets/images/clients/thumb12.png"),
    title: "UNNECESSARY",
    description: "BRANDING & IDENTITY",
    content: media("/assets/images/clients/unnssrythumb.jpg"),
  }),
];

export const allClients = [...clientShowcase, ...legacyClients];

const clientsBySlug = new Map(allClients.map((client) => [client.slug, client]));

export const getClientPath = (slug) => `${CLIENTS_INDEX_PATH}/${slug}`;

export const getClientBySlug = (slug) => clientsBySlug.get(slug) ?? null;

export const getClientsByGroup = (group) =>
  allClients.filter((client) => client.group === group);

export const getClientNeighbors = (slug) => {
  const index = allClients.findIndex((client) => client.slug === slug);
  if (index === -1) return { prev: null, next: null, index: -1 };

  return {
    prev: allClients[index - 1] ?? null,
    next: allClients[index + 1] ?? null,
    index,
  };
};

export const getClientServices = (client) =>
  client.description
    .split(/\s*[·&]\s*/)
    .map((service) => service.trim())
    .filter(Boolean);

export const getRelatedClients = (client, limit = 3) =>
  allClients
    .filter((item) => item.group === client.group && item.slug !== client.slug)
    .slice(0, limit);
