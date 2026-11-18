/** Agency offer: launch packages, à la carte services, leadership and form options. Edit prices here only. */

export const AGENCY = {
  subtitle: "Book Publicity & Literary Marketing",
  tagline: "Your Story. Our Strategy. Greater Reach.",
  supporting: "Strategic Promotion. Creative Marketing. Greater Literary Visibility.",
  description:
    "Fourth Group & Co is a premium book promotion, publicity and literary marketing agency partnering with authors, independent publishers and storytellers to strengthen book visibility, develop author brands and introduce literary works to wider audiences.",
};

export type Package = { id: string; number: string; name: string; price: number; badge?: string; audience: string; includes: string[]; cta: string };

export const PACKAGES: Package[] = [
  {
    id: "debut", number: "01", name: "The Debut Visibility Suite", price: 395,
    audience: "Ideal for emerging authors seeking polished multi-platform visibility.",
    includes: ["3D Book Mockup Suite", "15-Second Cinematic Book Trailer", "Dedicated TikTok Book Feature", "Dedicated Instagram Book Feature", "Two Goodreads Listopia Placements"],
    cta: "Select Debut Suite",
  },
  {
    id: "momentum", number: "02", name: "The Bestseller Momentum Campaign", price: 1150, badge: "Most popular",
    audience: "A comprehensive multi-channel promotional campaign designed to support sustained reader discovery.",
    includes: ["30-Second Cinematic Book Trailer", "30-Day Full Social Media Management", "30 Total Social Media Content Pieces", "1,000-Contact Email Marketing Campaign", "Five Goodreads Listopia Placements", "Standard Interactive Book Challenge"],
    cta: "Start Momentum Campaign",
  },
  {
    id: "complete", number: "03", name: "The Complete Author Brand & Launch", price: 2450,
    audience: "A comprehensive author branding and promotional solution for flagship releases.",
    includes: ["Bespoke Custom Author Website Design", "60-Second Cinematic Book Trailer", "30-Day Social Media Management", "2,500-Contact Email Marketing Campaign", "Premium Interactive Book Challenge"],
    cta: "Apply for Full Campaign",
  },
];

export type PriceRow = { label: string; price: string; detail?: string };
export type Service = { id: string; number: string; title: string; description: string; prices: PriceRow[]; includes?: string[]; note?: string; cta: string; emailSelector?: boolean };
export type Pillar = { id: string; letter: string; title: string; services: Service[] };

export const PILLARS: Pillar[] = [
  {
    id: "outreach", letter: "A", title: "Reader Outreach & Publicity",
    services: [
      {
        id: "email", number: "01", title: "Targeted Reader Email Campaigns", emailSelector: true,
        description: "Professional email marketing services designed to introduce books to relevant, permission-based audiences through structured promotional campaigns.",
        prices: [{ label: "Per contact", price: "$0.50" }, { label: "Starting at 1,000 contacts", price: "$500" }],
        note: "Sent only to lawful, opt-in reader lists with a working unsubscribe link in every message. We never sell access to private databases or promise buyers.",
        cta: "Enquire About Email Marketing",
      },
      {
        id: "goodreads", number: "02", title: "Goodreads Discovery & Listopia Placement",
        description: "Strategic identification and submission of books to relevant Goodreads Listopia opportunities based on genre, subject matter and reader interests.",
        prices: [{ label: "Two lists", price: "$95" }, { label: "Five lists", price: "$145" }, { label: "Ten lists", price: "$357" }],
        cta: "Explore Goodreads Promotion",
      },
      {
        id: "challenges", number: "03", title: "Interactive Reader Book Challenges",
        description: "Creative book-focused promotional challenges designed to encourage reader awareness, discussion and engagement.",
        prices: [{ label: "Basic", price: "$150" }, { label: "Standard", price: "$275" }, { label: "Premium", price: "$395" }],
        cta: "Explore Book Challenges",
      },
      {
        id: "tiktok", number: "04", title: "Curated TikTok Book Feature",
        description: "A polished editorial presentation introducing your book through a dedicated TikTok feature.",
        prices: [{ label: "Per book", price: "$25" }],
        includes: ["Book cover, title and author presentation", "Two to three story highlights", "Engaging book presentation", "Direct book link", "Proposed wording sent for your approval", "Clean closing screen"],
        cta: "Book a TikTok Feature",
      },
      {
        id: "instagram", number: "05", title: "Curated Instagram Book Feature",
        description: "A polished editorial presentation introducing your book through a dedicated Instagram feature.",
        prices: [{ label: "Per book", price: "$35" }],
        includes: ["Book cover, title and author presentation", "Two to three story highlights", "Engaging book presentation", "Direct book link", "Proposed wording sent for your approval", "Clean closing screen"],
        cta: "Book an Instagram Feature",
      },
    ],
  },
  {
    id: "social", letter: "B", title: "Social Growth & Brand Management",
    services: [
      {
        id: "social-management", number: "06", title: "Full-Service Social Media Management",
        description: "Structured social media content management designed to help authors maintain a consistent and professional online presence. Includes content creation, captions, scheduling and publishing on agreed platforms, with one round of revisions on each content batch.",
        prices: [
          { label: "7-Day Sprint", price: "$45", detail: "6 static posts · 4 reels · 10 pieces" },
          { label: "14-Day Growth", price: "$85", detail: "12 static posts · 8 reels · 20 pieces" },
          { label: "30-Day Authority", price: "$155", detail: "21 static posts · 9 reels · 30 pieces" },
        ],
        cta: "Explore Social Media Packages",
      },
    ],
  },
  {
    id: "visual", letter: "C", title: "Visual Production & Audio",
    services: [
      {
        id: "trailer", number: "07", title: "Cinematic Book Trailer Creation",
        description: "Creative promotional trailers designed to communicate a book's atmosphere, storyline and distinctive appeal through visual storytelling.",
        prices: [{ label: "15 seconds", price: "$65" }, { label: "30 seconds", price: "$125" }, { label: "60 seconds", price: "$265" }],
        cta: "Request a Book Trailer",
      },
      {
        id: "mockup", number: "08", title: "Editorial 3D Book Mockup Suite",
        description: "Professional three-dimensional book cover presentations designed for author websites, press kits, social media and promotional campaigns.",
        prices: [{ label: "Suite", price: "$75" }],
        cta: "Order a Book Mockup",
      },
      {
        id: "audiobook", number: "09", title: "Audiobook Production Services",
        description: "Audiobook development for authors bringing their written work into audio: manuscript preparation, narration casting, recording, editing and mastering to retailer specifications.",
        prices: [{ label: "Custom quotation", price: "Quote", detail: "Based on page count and production needs" }],
        cta: "Request an Audiobook Quote",
      },
    ],
  },
  {
    id: "digital", letter: "D", title: "Author Digital Presence",
    services: [
      {
        id: "website", number: "10", title: "Bespoke Author Website Design",
        description: "Custom responsive website development designed to showcase an author's books, biography, press kit, writing projects and professional identity.",
        prices: [{ label: "Full build", price: "$845" }],
        cta: "Request Website Design",
      },
      {
        id: "redesign", number: "11", title: "Author Website Overhaul & Redesign",
        description: "Professional website redesign focused on improving visual presentation, structure, navigation and author branding.",
        prices: [{ label: "Redesign", price: "$455" }],
        cta: "Request Website Redesign",
      },
    ],
  },
];

export const GENRES = ["Fiction", "Literary Fiction", "Romance", "Mystery & Thriller", "Fantasy & Science Fiction", "Children's Literature", "Young Adult", "Poetry", "Memoir & Biography", "Non-Fiction", "Business & Self-Development", "Screenwriting", "Other"];
export const GOALS = ["Book Launch Publicity", "Email & Reader Outreach", "Social Media & Video Trailer", "Complete Author Website & Brand", "Book-to-Screen Packaging"];
export const BUDGETS = ["Under $500", "$500 – $1,500", "$1,500 – $3,000", "$3,000+"];

/** Proposed leadership — positions and biographies await company confirmation. Add a photo path to show a portrait. */
export const LEADERSHIP: { name: string; role: string; bio: string; photo?: string }[] = [
  { name: "Matthew Collins", role: "Founder & Chief Executive Officer (CEO)", bio: "Matthew Collins founded Fourth Group & Co with a vision to establish a professional literary marketing agency dedicated to helping authors expand their visibility, strengthen their literary brands and connect their work with wider audiences. As Founder and Chief Executive Officer, he provides the company's strategic direction and oversees its overall development, business vision and long-term growth." },
  { name: "Malik Bok", role: "Director of Marketing & Campaign Strategy", bio: "Malik Bok contributes to the strategic development and execution of Fourth Group & Co's marketing initiatives, overseeing promotional campaign planning, marketing coordination and the development of effective author visibility strategies." },
  { name: "Bawa Fawaz", role: "Director of Creative & Digital Operations", bio: "Bawa Fawaz oversees creative and digital operations, supporting the development and execution of promotional content, digital projects and creative marketing solutions across the agency's service divisions." },
];

/** Campaign category shown on each portfolio card, keyed by book title. Confirm with the company. */
export const CAMPAIGN_TAGS: Record<string, string> = {
  'Early Mornings with “Dick”': "Launch Publicity",
  "Nobel Pursuits": "Digital Campaign",
  "Stjarna's Stars": "Creative Promotion",
  "Proud American": "Reader Outreach",
};
export const campaignTag = (title: string) => CAMPAIGN_TAGS[title] ?? "Creative Promotion";

export const WHY = [
  ["Comprehensive book marketing", "Publicity, outreach, video, social and web services under one agency."],
  ["Creative promotional solutions", "Trailers, mockups and features crafted around each book's atmosphere."],
  ["Multiple digital channels", "Email, Goodreads, TikTok, Instagram and author websites working together."],
  ["Flexible service options", "Commission a single service or a complete launch campaign."],
  ["Personalised campaign support", "Every campaign is shaped around your book, readers and goals."],
  ["Transparent pricing & deliverables", "Clear prices and itemised deliverables before any work begins."],
  ["Author-focused strategy", "Your approval on wording and creative before anything goes live."],
  ["International orientation", "Serving authors and independent presses across countries and genres."],
] as const;

export const SERVICE_TERMS = [
  ["Deliverables", "Each package and service lists exactly what is produced. Anything not listed is quoted separately."],
  ["Pricing", "Prices are in US dollars and confirmed in writing in your proposal before work begins."],
  ["Placements & advertising", "Social features run on accounts operated or arranged by Fourth Group & Co; we share the account details and current audience information in your proposal. Placements are promotional, not editorial reviews."],
  ["Audience sources", "Email campaigns use permission-based reader lists only, with an unsubscribe option in every send."],
  ["Timelines", "Typical delivery is 3–14 days for creative pieces and runs to the stated duration for managed campaigns. Your proposal confirms dates."],
  ["Revisions", "Creative deliverables include one round of revisions unless stated otherwise."],
  ["Your responsibilities", "You supply accurate book details, cover files, links and timely approvals, and confirm you hold the rights to materials provided."],
  ["Reporting", "Managed campaigns close with a summary of what was delivered and any platform metrics available to us."],
  ["No guarantees", "We do not guarantee book sales, bestseller rankings, views, reader numbers, reviews, media placements, Goodreads rankings, or film and television deals. Package names are product names, not promises of results."],
] as const;
