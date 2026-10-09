export const COMMUNITY_CATEGORIES = [
  { key: "announcements", label: "Announcements", note: "Updates from the Fourth Group & Co team." },
  { key: "introductions", label: "Introductions", note: "Say hello and share what you are working on." },
  { key: "craft", label: "Craft & Revision", note: "Drafts, structure, voice and the long middle." },
  { key: "publishing", label: "Publishing & Submissions", note: "Agents, presses, journals and query letters." },
  { key: "marketing", label: "Marketing & Promotion", note: "Launches, readings and reaching readers." },
  { key: "screen", label: "Screen & Adaptation", note: "Pitches, treatments and rights." },
  { key: "pro", label: "Pro Lounge", note: "A quieter room for Pro Members." },
] as const;
export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number]["key"];
export const categoryLabel = (k: string) => COMMUNITY_CATEGORIES.find((c) => c.key === k)?.label ?? k;
