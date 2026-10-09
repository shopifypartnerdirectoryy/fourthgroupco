export const COMMUNITY_CATEGORIES = [
  { key: "announcements", label: "Announcements", note: "Updates from the Fourth Group & Co team." },
  { key: "discussions", label: "Author Discussions", note: "Craft, structure, voice and the long middle." },
  { key: "success", label: "Success Stories", note: "Deals, publications and milestones worth celebrating." },
  { key: "reviews", label: "Book Reviews", note: "What members are reading and recommending." },
  { key: "publishing", label: "Publishing", note: "Presses, journals, query letters and submissions." },
  { key: "marketing", label: "Marketing & Promotion", note: "Launches, readings and reaching readers." },
  { key: "agents", label: "Literary Agents", note: "Querying, offers and working with representation." },
  { key: "film", label: "Film & Media", note: "Pitches, treatments, adaptation and rights." },
  { key: "resources", label: "Author Resources", note: "Tools, templates and verified links worth saving." },
  { key: "book-updates", label: "Book Updates", note: "Progress reports on works in progress and releases." },
  { key: "questions", label: "Questions", note: "Ask the community and share what you know." },
  { key: "pro", label: "Pro Lounge", note: "A quieter room for Pro Members." },
] as const;
export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number]["key"];
export const categoryLabel = (k: string) => COMMUNITY_CATEGORIES.find((c) => c.key === k)?.label ?? k;
