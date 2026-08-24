export type ProjectCategory = "architecture" | "interior" | "urban" | "concept";

export interface Project {
  slug: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  description: string[];
  galleryCount: number;
  hero?: boolean;
  /** Path under /public to a real photo (e.g. "/projects/afsona-villa.jpg").
   *  Falls back to the abstract PlaceholderImage gradient when unset. */
  image?: string;
  /** Additional real photos beyond `image`, shown in the gallery/slider.
   *  Falls back to placeholder gradients (per galleryCount) when unset. */
  gallery?: string[];
  /** Alternate photo shown on the Home featured grid, when it should differ
   *  from `image` (the one used on the Work page and the project's own
   *  hero). Falls back to `image` when unset. */
  coverImage?: string;
}

/**
 * Placeholder project set — titles/copy/locations are illustrative only,
 * standing in until real project photography and write-ups are supplied.
 * Rendered with PlaceholderImage rather than real photos for now.
 */
export const projects: Project[] = [
  {
    slug: "exclusive-signature-restaurant",
    title: "Exclusive Signature Restaurant",
    location: "Namangan, Uzbekistan",
    year: "2026",
    category: "architecture",
    hero: true,
    image: "/projects/qodirxon-pavilion.jpg",
    summary: "An exclusive restaurant design made only for this place — three gold-crowned circular halls gathered around a shared threshold beside the water.",
    description: [
      "Commissioned as a one-of-a-kind restaurant, the pavilion was never meant to be repeatable: its plan of three circular dining halls, fanned around a central entrance, exists for this lakeside site in Namangan alone.",
      "Each hall is capped by a luminous gold disc that reads from the water as a lit lantern at dusk, while floor-to-ceiling glazing keeps every table facing the reflecting pool and the trees beyond it.",
      "Inside, a freeform bronze canopy gathers over the main dining room, breaking the ceiling's geometric grid the way a tree breaks a clearing.",
    ],
    galleryCount: 5,
    gallery: [
      "/projects/qodirxon-pavilion-interior.jpg",
      "/projects/qodirxon-pavilion-entrance-1.jpg",
      "/projects/qodirxon-pavilion-entrance-2.jpg",
      "/projects/qodirxon-pavilion-entrance-3.jpg",
    ],
  },
  {
    slug: "riverside-cultural-pavilion",
    title: "Riverside Cultural Pavilion",
    location: "Tashkent, Uzbekistan",
    year: "2024",
    category: "architecture",
    summary: "A low, terraced pavilion that steps down toward the riverbank, folding gallery and event space into a single continuous roofline.",
    description: [
      "The pavilion sits at the point where the embankment park meets the old city grid, and its plan responds to both: a straight civic edge on one side, a soft terraced descent toward the water on the other.",
      "Inside, a single roof plane rises and falls over a sequence of gallery, workshop, and event spaces, held apart by full-height glazing so the river is always in view.",
    ],
    galleryCount: 5,
  },
  {
    slug: "chorsu-housing-block",
    title: "Chorsu Housing Block",
    location: "Tashkent, Uzbekistan",
    year: "2023",
    category: "architecture",
    summary: "A mid-rise residential block organized around a shaded internal courtyard, reintroducing the mahalla courtyard at apartment-building scale.",
    description: [
      "Sixty units wrap a planted internal courtyard shielded from the street by a perforated brick screen, borrowing directly from the region's mahalla courtyard tradition.",
      "Deep loggias on every unit cut solar gain while giving residents usable outdoor space year-round.",
    ],
    galleryCount: 4,
  },
  {
    slug: "samarkand-hotel-room",
    title: "Hotel Room",
    location: "Samarkand, Uzbekistan",
    year: "2024",
    category: "interior",
    hero: true,
    image: "/projects/hotel-room.jpg",
    summary: "A guest suite interior for a hotel project in Samarkand.",
    description: ["Full project write-up coming soon."],
    galleryCount: 1,
  },
  {
    slug: "amir-timur-plaza-masterplan",
    title: "Amir Timur Plaza Masterplan",
    location: "Tashkent, Uzbekistan",
    year: "2022",
    category: "urban",
    summary: "A masterplan reconnecting three disconnected civic plazas into a single pedestrian spine through the city center.",
    description: [
      "Three plazas, previously separated by traffic lanes, are joined by a raised pedestrian spine with intermittent civic pavilions, market stalls, and shaded seating.",
      "Vehicle traffic is pushed to a single below-grade service lane, freeing the entire surface for pedestrians and cyclists.",
    ],
    galleryCount: 4,
  },
  {
    slug: "afsona-villa",
    title: "Afsona Villa",
    location: "Namangan, Uzbekistan",
    year: "2024",
    category: "architecture",
    hero: true,
    image: "/projects/afsona-villa.jpg",
    summary: "A private villa in Namangan, set beside a reflecting pool.",
    description: ["Full project write-up coming soon."],
    galleryCount: 1,
  },
  {
    slug: "tashkent-penthouse",
    title: "Penthouse",
    location: "Tashkent, Uzbekistan",
    year: "2024",
    category: "interior",
    hero: true,
    image: "/projects/penthouse.jpg",
    summary: "An outdoor terrace and lounge for a penthouse residence in Tashkent.",
    description: ["Full project write-up coming soon."],
    galleryCount: 1,
  },
  {
    slug: "terraced-market-concept",
    title: "Terraced Market Concept",
    location: "Bukhara, Uzbekistan",
    year: "2025",
    category: "concept",
    summary: "An unbuilt proposal for a stepped market hall referencing the region's historic covered bazaars.",
    description: [
      "The proposal reinterprets the domed bazaar as a series of stepped terraces, each stall opening onto the next level down, with a shared roof of perforated concrete shells.",
      "Submitted as an open ideas competition entry; not currently under construction.",
    ],
    galleryCount: 3,
  },
  {
    slug: "green-belt-transit-hub",
    title: "Green Belt Transit Hub",
    location: "Tashkent, Uzbekistan",
    year: "2022",
    category: "urban",
    summary: "A transit interchange wrapped in a planted canopy, treating the roof as public park as much as shelter.",
    description: [
      "The hub stitches together a metro entrance, bus interchange, and cycle hub under one canopy, planted so the roof reads as an extension of the adjacent park.",
      "Platforms are naturally ventilated through the canopy's open lattice structure rather than mechanically cooled.",
    ],
    galleryCount: 4,
  },
  {
    slug: "civic-library-atrium",
    title: "Civic Library Atrium",
    location: "Bukhara, Uzbekistan",
    year: "2023",
    category: "architecture",
    summary: "A public library wrapped around a top-lit reading atrium, built from load-bearing brick vaults.",
    description: [
      "The library replaces a demolished Soviet-era reading hall with a sequence of brick vaults, each rising to a small oculus that washes the stacks below in daylight.",
      "Reading rooms step down half-levels around the central atrium, keeping every seat within sight of the courtyard beyond.",
    ],
    galleryCount: 4,
  },
  {
    slug: "hillside-viewing-pavilion",
    title: "Hillside Viewing Pavilion",
    location: "Chimgan, Uzbekistan",
    year: "2025",
    category: "concept",
    summary: "An unbuilt proposal for a cantilevered viewing platform folded into a mountainside trail.",
    description: [
      "The pavilion cantilevers off a ridge along the Chimgan trail network, its folded steel deck framing the valley without a single tree removed on approach.",
      "Concept proposal submitted to the regional tourism board; not yet funded for construction.",
    ],
    galleryCount: 3,
  },
  {
    slug: "urban-waterfront-promenade",
    title: "Urban Waterfront Promenade",
    location: "Tashkent, Uzbekistan",
    year: "2024",
    category: "urban",
    summary: "A two-kilometer canal-side promenade replacing a service road with terraced public space.",
    description: [
      "The promenade reclaims a former service road running along the Anhor canal, replacing it with terraced seating, cycle paths, and small pavilions at every bridge crossing.",
      "Planting follows the existing canal ecology rather than introducing an ornamental landscape, keeping maintenance low.",
    ],
    galleryCount: 5,
  },
  {
    slug: "yorokobi-wok-and-noodles",
    title: "Yorokobi Wok & Noodles",
    location: "Bukhara, Uzbekistan",
    year: "2025",
    category: "interior",
    image: "/projects/yorokobi-hero.png",
    coverImage: "/projects/yorokobi-cover.jpg",
    summary: "A fast-casual wok and noodle house in Bukhara, built around a bright red-and-mustard palette and a ceiling of trailing greenery.",
    description: [
      "Yorokobi packs a full-service noodle bar into a compact footprint, using colour rather than square footage to do the work: lacquer-red booths, mustard-yellow pendant lamps, and a hand-painted logo wall anchor the room the moment you walk in.",
      "A canopy of trailing plants runs the length of the ceiling, softening the exposed services below it, while a quieter back-of-house — manager's office, security room, staff lounge — carries the same red-and-charcoal palette through to the spaces guests never see.",
    ],
    galleryCount: 19,
    gallery: [
      "/projects/yorokobi-01.jpg",
      "/projects/yorokobi-02.jpg",
      "/projects/yorokobi-03.jpg",
      "/projects/yorokobi-04.jpg",
      "/projects/yorokobi-05.png",
      "/projects/yorokobi-06.png",
      "/projects/yorokobi-07.png",
      "/projects/yorokobi-08.png",
      "/projects/yorokobi-09.png",
      "/projects/yorokobi-10.png",
      "/projects/yorokobi-11.png",
      "/projects/yorokobi-12.jpg",
      "/projects/yorokobi-13.jpg",
      "/projects/yorokobi-14.jpg",
      "/projects/yorokobi-15.png",
      "/projects/yorokobi-16.jpg",
      "/projects/yorokobi-17.jpg",
      "/projects/yorokobi-18.jpg",
    ],
  },
  {
    slug: "turakorgan-residence",
    title: "Turakorgan Residence",
    location: "Turakorgan, Uzbekistan",
    year: "2025",
    category: "interior",
    image: "/projects/torakorgan-hero.jpg",
    coverImage: "/projects/torakorgan-cover.jpg",
    summary: "A family residence where traditional and modern design integration carries through every room — a grand dastarkhan dining hall beside unmistakably contemporary interiors.",
    description: [
      "The house is built on a single idea: tradition and modernity sharing the same room rather than competing for it. A grand dining hall built for large family gatherings — a long communal table, patterned wood panelling, an sculptural chandelier — sits at the heart of a home that carries traditional Uzbek hospitality through a thoroughly contemporary shell.",
      "Elsewhere the material language turns quieter and more current: walnut-toned wood, boucle upholstery, and abstract art carry the same restraint through the living rooms, bedrooms, and kitchen, so the traditional heart of the home never feels like a period piece bolted onto a modern shell.",
    ],
    galleryCount: 35,
    gallery: Array.from({ length: 34 }, (_, i) => `/projects/torakorgan-${String(i + 1).padStart(2, "0")}.jpg`),
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const categories: ProjectCategory[] = ["architecture", "interior", "urban", "concept"];

export const heroProjects = projects.filter((p) => p.hero);
