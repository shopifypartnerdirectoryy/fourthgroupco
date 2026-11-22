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
export type Pillar = { id: string; letter: string; title: string; short?: string; services: Service[] };

export const PILLARS: Pillar[] = [
  {
    id: "outreach", letter: "A", short: "Outreach", title: "Reader Outreach & Publicity",
    services: [
      {
        id: "email", number: "01", title: "Targeted Reader Email Campaigns", emailSelector: true,
        description: "Professional email marketing services designed to introduce books to relevant, permission-based audiences through structured promotional campaigns.",
        prices: [{ label: "Per contact", price: "$0.50" }, { label: "Starting at 1,000 contacts", price: "$500" }],
        note: "Sent only to lawful, opt-in reader lists with a working unsubscribe link in every message. We never sell access to private databases or promise buyers.",
        cta: "Enquire About Email Marketing",
      },
      {
        id: "email-funnels", number: "01b", title: "Reader Acquisition & Email Automation",
        description: "Lead magnets, free sample chapter campaigns and automated welcome and nurturing sequences that turn curious browsers into loyal subscribers.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Lead magnet & sample chapter setup", "Automated welcome sequence", "Reader nurturing emails", "Re-engagement campaigns", "Genre & interest segmentation", "Performance tracking"],
        cta: "Plan an Email Funnel",
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
    id: "social", letter: "B", short: "Social", title: "Social Growth & Brand Management",
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
      {
        id: "spotlights", number: "06b", title: "Author & Book Spotlight Campaigns",
        description: "Announcement, excerpt and quote-led content that builds author visibility around new releases and milestones.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Book announcement posts", "Excerpt & quote graphics", "Author spotlight features", "New release countdowns", "Short-form promo videos"],
        cta: "Plan a Spotlight Campaign",
      },
    ],
  },
  {
    id: "visual", letter: "C", short: "Visual & Audio", title: "Visual Production & Audio",
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
        prices: [{ label: "Suite", price: "Starting from $20" }],
        cta: "Order a Book Mockup",
      },
      {
        id: "audiobook", number: "09", title: "Audiobook Production Services",
        description: "Audiobook development for authors bringing their written work into audio: manuscript preparation, narration casting, recording, editing and mastering to retailer specifications.",
        prices: [
          { label: "Essential Production", price: "Quote", detail: "Narrator casting · recording coordination · editing · QA · delivery" },
          { label: "Professional Production", price: "Quote", detail: "Adds narration planning · retail mastering · platform submission · launch support" },
          { label: "Premium Series & Catalogue", price: "Quote", detail: "Multi-title & series production · backlist conversion · audio launch campaign" },
        ],
        includes: ["Narration planning & casting", "Recording coordination", "Editing & mastering", "Quality assurance", "Distribution preparation", "Audiobook launch & email promotion"],
        cta: "Request an Audiobook Quote",
      },
    ],
  },
  {
    id: "digital", letter: "D", short: "Websites", title: "Author Digital Presence",
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
  {
    id: "amazon-seo", letter: "E", title: "Amazon SEO & KDP Book Optimization", short: "Amazon",
    services: [
      {
        id: "amazon-keywords", number: "12", title: "KDP Keyword & Category Strategy",
        description: "Research-led backend keywords and browse categories that place your book in front of readers searching Amazon.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Amazon & KDP keyword research", "7 backend keyword slots", "Browse category selection", "BSR visibility strategy", "Competitor keyword analysis", "International marketplaces"],
        cta: "Optimize My Amazon Keywords",
      },
      {
        id: "amazon-listing", number: "13", title: "Amazon Listing & Description Optimization",
        description: "A polished product page: title, subtitle, HTML-formatted description and metadata written to turn visits into sales.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Title & subtitle optimization", "HTML description formatting", "Metadata audit", "Paperback, Kindle, hardcover & audiobook listings", "Series page optimization", "Conversion review"],
        cta: "Polish My Amazon Listing",
      },
      {
        id: "author-central", number: "14", title: "Author Central & A+ Content",
        description: "A professional Amazon author profile and premium A+ Content modules that present your book like a flagship title.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Author Central profile & bio", "Catalogue & series linking", "A+ brand banners", "Comparison charts", "Editorial callout graphics", "Compliant review visibility strategy"],
        cta: "Request A+ Content",
      },
      {
        id: "kdp-audit", number: "15", title: "Amazon KDP Listing Audit",
        description: "A detailed audit of your listings, keywords, categories and metadata with a prioritised list of fixes.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Full listing audit", "Keyword & category gaps", "Competitor listing analysis", "Cover presentation review", "Ongoing performance monitoring"],
        cta: "Book a KDP Audit",
      },
    ],
  },
  {
    id: "amazon-ads", letter: "F", title: "Amazon Advertising & PPC Management", short: "Amazon Ads",
    services: [
      {
        id: "amazon-ads-setup", number: "16", title: "Amazon Ads Campaign Setup",
        description: "Structured Sponsored Products, Sponsored Brands and Sponsored Display campaigns (where eligible), built around researched keywords.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Sponsored Products", "Sponsored Brands (where eligible)", "Sponsored Display (where eligible)", "Automatic & manual campaigns", "Competitor ASIN & product targeting", "Ads keyword research"],
        cta: "Set Up Amazon Ads",
      },
      {
        id: "amazon-ads-management", number: "17", title: "Ongoing PPC Management",
        description: "Continuous bid, budget and keyword management so ad spend works harder for your book.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Negative keyword optimization", "Bid optimization", "Budget management", "Conversion optimization", "A/B testing (where available)", "Monthly performance reports"],
        cta: "Manage My Amazon Ads",
      },
      {
        id: "amazon-ads-audit", number: "18", title: "Amazon Advertising Audit",
        description: "A review of existing campaigns that identifies wasted spend, missed keywords and structural improvements.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Campaign structure review", "Search term analysis", "Wasted spend report", "Targeting recommendations"],
        cta: "Request an Ads Audit",
      },
    ],
  },
  {
    id: "seo", letter: "G", title: "Search Engine Optimization for Authors & Books", short: "Author SEO",
    services: [
      {
        id: "seo-audit", number: "19", title: "Author & Book Website SEO",
        description: "On-page, off-page and technical SEO that helps readers find your name and titles on Google.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["SEO audit", "On-page & technical SEO", "Meta titles, descriptions & headers", "URL, speed & mobile optimization", "XML sitemap & robots.txt", "Broken link & 404 fixes"],
        cta: "Request an SEO Audit",
      },
      {
        id: "seo-keywords", number: "20", title: "Keyword Research & Content Strategy",
        description: "Author name, book title, genre and long-tail keyword targeting with SEO-led book descriptions, bios and blog content.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Author name & title keywords", "Genre & long-tail targeting", "Search intent mapping", "Book description & bio SEO", "Blog & review content SEO", "Internal linking"],
        cta: "Plan My SEO Content",
      },
      {
        id: "seo-authority", number: "21", title: "Schema, Analytics & Authority Building",
        description: "Structured data, Search Console and Analytics setup plus ethical link building to grow organic authority.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Schema markup & structured data", "Google Search Console setup", "Google Analytics integration", "Backlink acquisition strategy", "Competitor SEO analysis", "International & local SEO"],
        cta: "Build My Search Authority",
      },
    ],
  },
  {
    id: "geo", letter: "H", title: "AI Search Visibility & Generative Engine Optimization", short: "AI Search",
    services: [
      {
        id: "geo-optimization", number: "22", title: "Generative Engine Optimization (GEO)",
        description: "Structure your author profile and book information so AI tools such as ChatGPT Search, Perplexity and Google AI Overviews can understand and cite it.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["AI Overview visibility", "ChatGPT Search discoverability", "Structured content for AI search", "Conversational search optimization", "AI search content strategy"],
        cta: "Improve My AI Visibility",
      },
      {
        id: "geo-entity", number: "23", title: "Entity & Author Authority Optimization",
        description: "Semantic and schema-based entity work that establishes you and your books as clearly defined literary entities.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Entity & author authority", "Schema-based entity optimization", "Semantic keyword optimization", "AI search visibility audit"],
        cta: "Request an AI Search Audit",
      },
    ],
  },
  {
    id: "catalogue", letter: "I", title: "Backlist, Series & Reader Outreach", short: "Backlist & PR",
    services: [
      {
        id: "backlist", number: "24", title: "Backlist & Catalogue Marketing",
        description: "Campaigns that revive earlier titles and connect your whole catalogue so every new reader finds the next book.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Backlist revival campaigns", "Cross-book discovery", "New release & backlist integration", "Multi-title promotion", "Long-term visibility plans"],
        cta: "Revive My Backlist",
      },
      {
        id: "series", number: "25", title: "Book Series Marketing",
        description: "Reader acquisition built to move readers from book one through the whole series.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["Series reader acquisition", "Series email campaigns", "Series promo videos", "Series page optimization"],
        cta: "Market My Series",
      },
      {
        id: "outreach", number: "26", title: "Reviews, ARC & Media Outreach",
        description: "Advance reader copy campaigns and outreach to book bloggers, book clubs and podcasts.",
        prices: [{ label: "Tailored proposal", price: "Quote", detail: "Scoped to your book, formats and goals" }],
        includes: ["ARC campaigns", "Book blogger outreach", "Book club outreach", "Podcast guest placement", "Virtual launch events & interviews", "Giveaway campaigns"],
        cta: "Plan Outreach",
      },
    ],
  },
];

export const GENRES = ["Fiction", "Literary Fiction", "Romance", "Mystery & Thriller", "Fantasy & Science Fiction", "Children's Literature", "Young Adult", "Poetry", "Memoir & Biography", "Non-Fiction", "Business & Self-Development", "Screenwriting", "Other"];
export const GOALS = ["Book Launch Publicity", "Email & Reader Outreach", "Social Media & Video Trailer", "Complete Author Website & Brand", "Book-to-Screen Packaging", "Audiobook Production & Launch", "Amazon SEO & KDP Optimization", "Amazon Advertising & PPC", "Author Website SEO", "AI Search Visibility (GEO)", "Backlist & Series Marketing", "Reviews, ARC & Media Outreach"];
export const BUDGETS = ["Under $500", "$500 – $1,500", "$1,500 – $3,000", "$3,000+"];

/** Proposed leadership — positions and biographies await company confirmation. Add a photo path to show a portrait. */
export const LEADERSHIP: { name: string; role: string; photo?: string }[] = [
  { name: "Matthew Collins", role: "Founder & Chief Executive Officer (CEO)" },
  { name: "Malik Bok", role: "Director of Marketing & Campaign Strategy" },
  { name: "Bawa Fawaz", role: "Director of Creative & Digital Operations" },
  { name: "Mou Barrac", role: "Managing Director" },
  { name: "Aliyu Adam", role: "Editorial Director" },
  { name: "James Kamy", role: "Head of Film Adaptation & Partnerships" },
  { name: "Emily Grace", role: "Community & Author Relations Manager" },
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
  ["Multiple digital channels", "Email, Goodreads, social, Amazon, Google and AI search working together."],
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
