export { pillarFrontmatterSchema } from "./schema";
export type { PillarFrontmatter } from "./schema";

export {
  getPillarPage,
  getAllPillarPages,
  getAllPillarSlugs,
  getAlternateLocales,
} from "./loader";
export type { PillarPage } from "./loader";

export { getMdxComponents } from "./mdx-components";
