import { MAGAZINES, PRESSES, AGENTS } from "@/data/publishing-directories";
import { GRANTS, CONTESTS, RESIDENCIES, AUTHORS } from "@/data/opportunities";
import { FEATURED_AUTHORS } from "@/data/featured-authors";

/** Real record counts derived from the directory data — never hand-typed estimates. */
const authorNames = new Set([...FEATURED_AUTHORS.map((a) => a.name), ...AUTHORS.filter((a) => a.name === "Jack Ryan").map((a) => a.name)]);

export const COUNTS = {
  magazines: MAGAZINES.length,
  presses: new Set(PRESSES.map((p) => p.name)).size,
  agents: AGENTS.length,
  grants: GRANTS.length,
  contests: CONTESTS.length,
  residencies: RESIDENCIES.length,
  authors: authorNames.size,
};

export const TOTAL_OPPORTUNITIES =
  COUNTS.magazines + COUNTS.presses + COUNTS.agents + COUNTS.grants + COUNTS.contests + COUNTS.residencies;
