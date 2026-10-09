import earlyMornings from "@/assets/early-mornings-with-dick.jpg";
import socratesDog from "@/assets/blame-it-on-socrates-dog.jpg";
import proudAmerican from "@/assets/proud-american.jpg";
import stjarnasStars from "@/assets/stjarnas-stars.jpg";
import shatteredByLove from "@/assets/shattered-by-love.jpg";
import girlBadReputation from "@/assets/girl-bad-reputation.jpg";
import lucrecia from "@/assets/lucrecia.jpg";
import reflections from "@/assets/reflections-21st-century.jpg";
import superpower from "@/assets/superpower.jpg";
import finishTheRace from "@/assets/finish-the-race.jpg";
import gunfighters from "@/assets/gunfighters.jpg";
import boundaries from "@/assets/boundaries.jpg";
import egyptStars from "@/assets/egypt-under-the-stars.jpg";

export const COMMUNITY_CATEGORIES = [
  { key: "announcements", label: "Announcements", note: "Updates from the Fourth Group & Co team." },
  { key: "reader-corner", label: "Reader Corner", note: "For readers: what you're reading, loving and arguing about." },
  { key: "recommendations", label: "Book Recommendations", note: "Ask for a next read or share one you can't stop recommending." },
  { key: "reviews", label: "Book Reviews", note: "Honest, thoughtful reviews from members." },
  { key: "discussions", label: "Author Discussions", note: "Craft, structure, voice and the long middle." },
  { key: "success", label: "Success Stories", note: "Deals, publications and milestones worth celebrating." },
  { key: "publishing", label: "Publishing & Agents", note: "Presses, query letters, agents and submissions." },
  { key: "marketing", label: "Marketing & Promotion", note: "Launches, readings and reaching readers." },
  { key: "film", label: "Film & Media", note: "Pitches, treatments, adaptation and rights." },
  { key: "street-team", label: "Street Team & ARCs", note: "Find early readers and join launch teams." },
  { key: "questions", label: "Questions", note: "Ask the community and share what you know." },
  { key: "pro", label: "Pro Lounge", note: "A quieter room for Pro Members." },
] as const;
export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number]["key"];
const LEGACY: Record<string, string> = { agents: "Publishing & Agents", resources: "Author Resources", "book-updates": "Book Updates", introductions: "Introductions", craft: "Craft", screen: "Film & Media" };
export const categoryLabel = (k: string) => COMMUNITY_CATEGORIES.find((c) => c.key === k)?.label ?? LEGACY[k] ?? k;

export type CommunityBook = { key: string; title: string; author: string; format: string; image: string; url: string };
export const COMMUNITY_BOOKS: CommunityBook[] = [
  { key: "early-mornings", title: "Early Mornings with “Dick”", author: "Jack Ryan", format: "Hardcover", image: earlyMornings, url: "https://www.amazon.com/dp/1808570472" },
  { key: "socrates", title: "Blame It on Socrates", author: "Jack Ryan", format: "Kindle Edition", image: socratesDog, url: "https://www.amazon.com/dp/B0F2SJZY24" },
  { key: "proud-american", title: "Proud American", author: "Sergio A. Tinoco", format: "Kindle Edition", image: proudAmerican, url: "https://www.amazon.com/dp/B0H1348M12" },
  { key: "stjarna", title: "Stjarna's Stars", author: "Patricia Squire", format: "Hardcover", image: stjarnasStars, url: "https://www.amazon.com/dp/1039192289" },
  { key: "shattered", title: "Shattered by Love", author: "Michael Knapp", format: "Kindle Edition", image: shatteredByLove, url: "https://www.amazon.com/dp/B0CNKYDB52" },
  { key: "bad-reputation", title: "A Girl with a Bad Reputation", author: "Dave Gioia", format: "Kindle Edition", image: girlBadReputation, url: "https://www.amazon.com/dp/B0F45YJJHN" },
  { key: "lucrecia", title: "Lucrecia: Memoir of a Manic Woman", author: "Jamie Goudeau", format: "Paperback", image: lucrecia, url: "https://www.amazon.com/dp/B0H639GLNQ" },
  { key: "reflections", title: "Reflections for the Twenty-First Century", author: "Jean Pi Lee", format: "Paperback", image: reflections, url: "https://www.amazon.com/dp/1039151930" },
  { key: "superpower", title: "SuperPower", author: "Roger E. Pedersen", format: "Kindle Edition", image: superpower, url: "https://www.amazon.com/dp/B0DFBXKY2C" },
  { key: "finish-race", title: "Finish the Race", author: "Jon Waller", format: "Hardcover", image: finishTheRace, url: "https://www.amazon.com/dp/B0H1P1D7PM" },
  { key: "gunfighters", title: "Gunfighters, Thieves and Lawmen", author: "D.M. McGowan", format: "Kindle Edition", image: gunfighters, url: "https://www.amazon.com/dp/B08DNHKVVV" },
  { key: "boundaries", title: "Boundaries", author: "D.M. McGowan", format: "Kindle Edition", image: boundaries, url: "https://www.amazon.com/dp/B0CRMWVRLW" },
  { key: "egypt-stars", title: "Egypt Under the Stars", author: "Ev Cochrane", format: "Kindle Edition", image: egyptStars, url: "https://www.amazon.co.uk/dp/B0GH3HPFL8" },
];
export const bookByKey = (k?: string | null) => COMMUNITY_BOOKS.find((b) => b.key === k);
