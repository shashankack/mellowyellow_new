import { resolveMediaDeep } from "../config/cloudinary";

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
export const clientShowcase = resolveMediaDeep([
  defineClient({
    id: 101,
    slug: "ashv",
    group: "featured",
    thumbnail: "/content/branding/yawn/yawn-05.jpg",
    title: "ASHV",
    description: "BRANDING & IDENTITY · PRODUCTION",
    // content: "/content/branding/yawn/yawn-06.jpg",
    content: "/clients/ashv/content.jpeg",
    images: [
      "/content/branding/yawn/yawn-05.jpg",
      "/content/branding/yawn/yawn-06.jpg",
      "/content/works/yawn/yawn-03.jpg",
      "/content/works/yawn/yawn-04.jpg",
    ],
    summary:
      "Full visual identity and lifestyle production — brand mockups, spatial styling, and editorial photography for a contemporary studio.",
  }),
  defineClient({
    id: 102,
    slug: "instagram-grids",
    group: "featured",
    thumbnail: "/content/marketing/grids/grid-01.jpg",
    title: "INSTAGRAM GRIDS",
    description: "GRAPHIC DESIGN · FEED STRATEGY",
    content: "/content/marketing/grids/grid-04.jpg",
    images: [
      "/content/marketing/grids/grid-01.jpg",
      "/content/marketing/grids/grid-04.jpg",
      "/content/marketing/grids/grid-05.png",
      "/content/marketing/grids/grid-06.jpeg",
    ],
    summary:
      "Cohesive Instagram grid systems with strong visual rhythm and on-brand storytelling.",
  }),
  defineClient({
    id: 103,
    slug: "juhi-kejriwal",
    group: "featured",
    thumbnail: "/content/works/juhi/juhi-01.jpg",
    title: "JUHI KEJRIWAL",
    description: "GRAPHIC DESIGN · CAMPAIGN",
    content: "/content/marketing/posters/juhi-04.jpg",
    images: [
      "/content/works/juhi/juhi-01.jpg",
      "/content/works/juhi/juhi-02.jpg",
      "/content/works/juhi/juhi-03.png",
      "/content/marketing/posters/juhi-04.jpg",
    ],
    summary:
      "Campaign visuals and graphic design spanning editorial layouts, social assets, and brand-forward storytelling.",
  }),
  defineClient({
    id: 104,
    slug: "toqn",
    group: "featured",
    thumbnail: "/content/works/toqn/toqn-01.jpg",
    title: "TOQN",
    description: "PRODUCTION · LIFESTYLE",
    content: "/content/works/toqn/toqn-02.jpg",
  }),
  defineClient({
    id: 105,
    slug: "bcc",
    group: "featured",
    thumbnail: "/content/works/bcc/bcc-04.jpg",
    title: "BCC",
    description: "EVENT LAUNCHES · COVERAGE",
    content: "/content/works/bcc/bcc-04.jpg",
  }),
  defineClient({
    id: 106,
    slug: "logo-systems",
    group: "featured",
    thumbnail: "/content/branding/logoss/logo-01.png",
    title: "LOGO SYSTEMS",
    description: "BRANDING & IDENTITY · ROLLOUT",
    content: "/content/branding/logos/logo-04.png",
  }),
  defineClient({
    id: 108,
    slug: "social-management",
    group: "featured",
    thumbnail: "/content/marketing/smm/smm-01.jpeg",
    title: "SOCIAL MANAGEMENT",
    description: "GRAPHIC DESIGN · COMMUNITY",
    content: "/content/marketing/smm/smm-04.jpeg",
  }),
  defineClient({
    id: 109,
    slug: "sekai-dessert-land",
    group: "featured",
    thumbnail: "/content/branding/sekai/sekai-01.PNG",
    title: "SEKAI DESSERT LAND",
    description: "BRANDING & IDENTITY · PACKAGING",
    content: "/content/branding/sekai/sekai-03.jpeg",
    images: [
      "/content/branding/sekai/sekai-01.PNG",
      "/content/branding/sekai/sekai-02.PNG",
      "/content/branding/sekai/sekai-03.jpeg",
    ],
    summary:
      "Identity, packaging, and rollout for a dessert concept — playful brand language carried through every touchpoint.",
  }),
  defineClient({
    id: 110,
    slug: "fizzies-goli-soda",
    group: "featured",
    thumbnail: "/content/marketing/posters/fizzies-01.jpeg",
    title: "FIZZIES GOLI SODA",
    description: "PRODUCT VISUALS · CAMPAIGN PRODUCTION",
    content: "/content/marketing/posters/fizzies-02.jpg",
  }),
]);

/** @type {ClientRecord[]} */
export const legacyClients = resolveMediaDeep([
  defineClient({
    id: 1,
    slug: "umimatcha",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb1.png",
    title: "UMIMATCHA",
    description: "BRANDING & IDENTITY",
    content: "/assets/images/clients/umithumb.jpg",
  }),
  defineClient({
    id: 2,
    slug: "desidharti",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb2.png",
    title: "DESIDHARTI",
    description: "BRANDING & IDENTITY",
    content: "/assets/images/clients/thumbdesi.jpg",
  }),
  defineClient({
    id: 3,
    slug: "peekaboo",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb3.png",
    title: "PEEKABOO",
    description: "BRANDING & IDENTITY",
    content: "/assets/images/clients/pekathumb.jpg",
  }),
  defineClient({
    id: 4,
    slug: "holykicks",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb4.png",
    title: "HOLYKICKS",
    description: "BRANDING & IDENTITY",
    content: "/assets/images/clients/holykicksthumb.jpg",
  }),
  defineClient({
    id: 5,
    slug: "ibh",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb5.png",
    title: "IBH",
    description: "GRAPHIC DESIGN",
    content: "/assets/images/clients/ibhthumb.jpg",
  }),
  defineClient({
    id: 6,
    slug: "bhrama",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb6.png",
    title: "BHRAMA",
    description: "PRODUCTION & EXECUTION",
    content: "/assets/images/clients/bhramathumb.jpg",
  }),
  defineClient({
    id: 7,
    slug: "palms",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb7.png",
    title: "PALMS",
    description: "PRODUCTION & EXECUTION",
    content: "/assets/images/clients/palmsthumb.jpg",
  }),
  defineClient({
    id: 8,
    slug: "itc",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb8.png",
    title: "ITC",
    description: "PRODUCTION & EXECUTION",
    content: "/assets/images/clients/itcthumb.jpg",
  }),
  defineClient({
    id: 9,
    slug: "gamediaz",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb9.png",
    title: "GAMEDIAZ",
    description: "GRAPHIC DESIGN",
    content: "/assets/images/clients/gamethumb.jpg",
  }),
  defineClient({
    id: 10,
    slug: "astro",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb10.png",
    title: "ASTRO",
    description: "GRAPHIC DESIGN",
    content: "/assets/images/clients/astro_image.png",
  }),
  defineClient({
    id: 12,
    slug: "unnecessary",
    group: "archive",
    thumbnail: "/assets/images/clients/thumb12.png",
    title: "UNNECESSARY",
    description: "BRANDING & IDENTITY",
    content: "/assets/images/clients/unnssrythumb.jpg",
  }),
]);

export const allClients = [...clientShowcase, ...legacyClients];

export const newAllClients = resolveMediaDeep([
  defineClient({
    id: 111,
    slug: "ashv",
    group: "featured",
    thumbnail: "/content/branding/logos/logo-05.png",
    title: "ASHV",
    description: "BRANDING & IDENTITY · LOGO DESIGN",
    content: "/clients/ashv/content.jpeg",
  }),
  defineClient({
    id: 112,
    slug: "umimatcha",
    group: "featured",
    thumbnail: "/content/branding/logos/logo-08.png",
    title: "UMIMATCHA",
    description: "BRANDING & IDENTITY · PACKAGING",
    content: "/clients/umimatcha/content.jpeg",
  }),
  defineClient({
    id: 113,
    slug: "inheal",
    group: "featured",
    thumbnail: "/content/branding/logos/logo-03.png",
    title: "INHEAL",
    description: "BRANDING & IDENTITY · PACKAGING",
    content: "/clients/inheal/content.jpeg",
  }),
  defineClient({
    id: 114,
    slug: "desi-dharti",
    group: "featured",
    thumbnail: "/content/branding/logos/logo-07.png",
    title: "DESI DHARTI",
    description: "BRANDING & IDENTITY · PACKAGING",
    content: "/clients/desi-dharti/content.PNG",
  }),
]);

const clientsBySlug = new Map(
  allClients.map((client) => [client.slug, client]),
);

export const getClientPath = (slug) => `${CLIENTS_INDEX_PATH}/${slug}`;

export const getClientBySlug = (slug) => {
  const client = clientsBySlug.get(slug);
  return client ? resolveMediaDeep(client) : null;
};

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
