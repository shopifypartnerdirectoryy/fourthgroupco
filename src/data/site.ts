export const SITE = {
  name: "Fourth Group & Co",
  short: "Fourth Group",
  email: "hello@fourthgroupco.com",
  tagline:
    "A global network for authors, poets and screenwriters — resources, opportunity listings and a community that reads you closely.",
  membership: 25,
  subscribers: "60+",
};

export const NAV = [
  { label: "Directory", to: "/directory" },
  { label: "Contests", to: "/contests" },
  { label: "Grants & Awards", to: "/grants-awards" },
  { label: "Magazines", to: "/literary-magazines" },
  { label: "Presses", to: "/small-presses" },
  { label: "Residencies", to: "/residencies" },
  { label: "Prompts", to: "/writing-prompts" },
  { label: "Resources", to: "/resources" },
  { label: "News", to: "/news" },
] as const;

export const TOOLS = [
  { label: "Literary Magazines", count: "340+", to: "/literary-magazines" },
  { label: "Small Presses", count: "120+", to: "/small-presses" },
  { label: "Grants & Awards", count: "210+", to: "/grants-awards" },
  { label: "Writing Contests", count: "140+", to: "/contests" },
  { label: "Retreats & Residencies", count: "85+", to: "/residencies" },
  { label: "Author Directory", count: "480+", to: "/directory" },
] as const;

export const PROMPT = {
  title: "What the House Remembers",
  body: "Write about a room you have not entered in years. Let the objects speak before the people do, and end on a sound rather than an image.",
};

export const ANNOUNCEMENT = {
  kicker: "Announcement · Press Release",
  title: "Fourth Group & Co Publishes Its Author Commitments",
  body: "We have set out, in plain language, who we are, what every author on the platform receives, and how our listings are researched and verified. Transparency is the only way a writers' network earns trust.",
};

export const BOOKS = [
  {
    slug: "the-long-light",
    title: "The Long Light",
    author: "Adaeze Okonkwo",
    meta: "Literary Fiction · Coastal · Family",
    blurb:
      "A keeper's daughter returns to the headland she swore she had finished with. A quiet novel about inheritance, weather, and the things families agree not to name.",
    tags: ["Fiction", "Literary", "Family"],
    reads: "1,204",
    comments: 18,
  },
  {
    slug: "two-cups-in-the-afternoon",
    title: "Two Cups in the Afternoon",
    author: "Marcus Ilesanmi",
    meta: "Short Stories · Contemporary",
    blurb:
      "Eleven stories set across a single city block, each one turning on a conversation that almost did not happen.",
    tags: ["Short Stories", "Contemporary"],
    reads: "938",
    comments: 11,
  },
  {
    slug: "rain-over-the-common-field",
    title: "Rain Over the Common Field",
    author: "Helen Varga",
    meta: "Poetry · Nature · Elegy",
    blurb:
      "A first collection written across four growing seasons, attentive to soil, labour and loss in equal measure.",
    tags: ["Poetry", "Nature"],
    reads: "742",
    comments: 9,
  },
];

export const PAST_SPOTLIGHTS = [
  { title: "Salt and Signal", author: "Nuru Adeyemi", reads: "1.1K", comments: 21 },
  { title: "The Quiet Cartographer", author: "Iris Lenoir", reads: "864", comments: 14 },
  { title: "Notes From a Borrowed Room", author: "Tomas Reddy", reads: "702", comments: 8 },
  { title: "A Field Guide to Leaving", author: "Priya Raghavan", reads: "1.3K", comments: 27 },
  { title: "Winter Ledger", author: "Ola Sandvik", reads: "588", comments: 12 },
  { title: "The Argument of Birds", author: "Camille Esparza", reads: "915", comments: 19 },
];

export const ARTISTS = [
  {
    name: "Elena Marsh",
    craft: "Gouache & collage",
    note: "Builds covers from torn paper and flat colour, favouring figures caught mid-gesture.",
  },
  {
    name: "Dami Ogunlesi",
    craft: "Ink & risograph",
    note: "Two-colour illustrations with a printmaker's restraint; frequent collaborator with poetry presses.",
  },
  {
    name: "Yuki Harada",
    craft: "Watercolour landscape",
    note: "Weather as character — washes that leave the page breathing underneath.",
  },
];

export const NEWS = [
  {
    id: "independent-booksellers",
    kicker: "Daily News",
    title: "Independent Booksellers Report a Steady Year of Growth",
    body: "Community-run shops continue to gain ground through online ordering, strong romance and genre sales, and partnerships that help readers discover smaller presses.",
  },
  {
    id: "author-commitments",
    kicker: "Announcement",
    title: "Fourth Group & Co Publishes Its Author Commitments",
    body: "Our full statement on services, verification and what each member receives is now available to read.",
  },
  {
    id: "submission-season",
    kicker: "Opportunities",
    title: "Autumn Submission Season Opens Across 40 Journals",
    body: "Reading periods are opening this month. We have verified deadlines, fees and response times for every listing in the database.",
  },
];

export const FEATURES = [
  {
    title: "Verified listings",
    body: "Every magazine, press, grant and contest is checked by hand before it reaches the database, and re-checked each season.",
  },
  {
    title: "A readable directory",
    body: "Authors keep a profile with their books, links and availability for events, panels and interviews.",
  },
  {
    title: "Weekly prompts",
    body: "A new prompt each week, written by working poets and novelists, with an open thread for responses.",
  },
  {
    title: "Submission tracking",
    body: "Keep deadlines, fees and responses in one place instead of a spreadsheet you dread opening.",
  },
];

export const FAQ = [
  {
    q: "What does membership include?",
    a: `Full access to every database — magazines, presses, grants, contests and residencies — plus an author profile, submission tracking and the weekly newsletter. Membership is $${SITE.membership} a year.`,
  },
  {
    q: "Do I have to pay to be listed in the directory?",
    a: "No. Any writer can claim a free directory profile. Membership unlocks the research databases and tracking tools.",
  },
  {
    q: "How are listings verified?",
    a: "We contact each organisation directly and confirm the reading period, fees and contact details before publishing, then review the entry every season.",
  },
  {
    q: "How do I submit a book for a spotlight?",
    a: `Email ${SITE.email} with your title, author name, a short description and a cover image.`,
  },
];
