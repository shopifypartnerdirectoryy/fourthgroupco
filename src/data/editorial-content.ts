export const EVENT_PROGRAMMES = [
  { name: "The Open Reading Room", audience: "All readers", detail: "A hosted online evening where Fourth Group authors share new work and join a thoughtful audience conversation.", access: "Community access" },
  { name: "The Working Draft", audience: "Writers", detail: "A practical craft session built around one question of structure, voice, revision or publishing preparation.", access: "Member priority" },
  { name: "Books in Conversation", audience: "Authors and readers", detail: "A close conversation with an author about the choices, research and lived experience behind a book.", access: "Community access" },
] as const;

export const UPCOMING_EVENTS = [
  { type: "Reading", title: "New Voices Across Borders", format: "Online", note: "An evening of short readings from fiction, poetry and memoir writers in the Fourth Group community." },
  { type: "Workshop", title: "The Architecture of an Opening Page", format: "Online workshop", note: "A focused session on narrative promise, clarity and momentum in the first page of a manuscript." },
  { type: "Author conversation", title: "Writing Public History Through Private Lives", format: "Online conversation", note: "Novelists discuss the research and ethical choices involved in turning historical records into intimate stories." },
  { type: "Screen stories", title: "From Book Premise to Adaptation Pitch", format: "Online panel", note: "A practical discussion of loglines, visual stakes, rights information and the screen reader’s first questions." },
  { type: "Community forum", title: "The Independent Author’s Working Table", format: "Online roundtable", note: "A candid exchange about publishing routes, building readership and sustaining a long writing life." },
] as const;

export const NEWS_ARTICLES = [
  { category: "Fourth Group Dispatch", title: "Why a Literary Community Still Matters", excerpt: "Publishing can be solitary, but progress rarely is. We consider how careful readers, useful information and generous introductions change a writer’s path.", read: "7 min read", featured: true },
  { category: "Publishing desk", title: "What to Check Before You Send a Manuscript", excerpt: "A clear final review of fit, format, rights, fees and response expectations before a submission leaves your desk.", read: "5 min read" },
  { category: "Author conversation", title: "Jack Ryan on History, Memory and Public Life", excerpt: "A conversation about writing towards contested moments without losing sight of the private person inside the public event.", read: "6 min read" },
  { category: "Opportunity notes", title: "Reading Periods Worth Preparing For", excerpt: "How to build a calm submission calendar around seasonal magazines, contests and fellowship windows.", read: "4 min read" },
  { category: "Rights desk", title: "The Rights an Author Should Understand", excerpt: "Translation, audio, film and territory rights can travel separately. Here is the vocabulary to know before a conversation begins.", read: "8 min read" },
  { category: "Community", title: "Introducing the Fourth Group Author Directory", excerpt: "Meet writers across genres and find authors available for readings, interviews, panels and book conversations.", read: "3 min read" },
  { category: "Screen stories", title: "What Makes a Book Adaptable?", excerpt: "A strong adaptation proposition begins with emotional movement, visual possibility and a clear audience—not spectacle alone.", read: "5 min read" },
] as const;

export const CRAFT_ESSAYS = [
  { topic: "Revision", title: "The Second Draft Is a Different Kind of Writing", excerpt: "Revision is not correction. It is the stage where a manuscript discovers what it has been trying to say.", byline: "Fourth Group Editorial Desk", length: "7 min read" },
  { topic: "Voice", title: "Finding the Sentence Only You Would Write", excerpt: "Voice grows from attention, rhythm and choice—not from performing originality on every line.", byline: "Fourth Group Editorial Desk", length: "6 min read" },
  { topic: "Structure", title: "Build Scenes Around a Change", excerpt: "A scene earns its place when something shifts: knowledge, power, desire, danger or the reader’s understanding.", byline: "Fourth Group Editorial Desk", length: "5 min read" },
  { topic: "Character", title: "Let Contradiction Do the Work", excerpt: "Characters become convincing when their actions complicate the story they tell about themselves.", byline: "Fourth Group Editorial Desk", length: "5 min read" },
  { topic: "Practice", title: "A Writing Routine That Survives Real Life", excerpt: "Build a practice around repeatable conditions and modest promises rather than waiting for ideal days.", byline: "Fourth Group Editorial Desk", length: "4 min read" },
  { topic: "Feedback", title: "How to Read Notes Without Losing the Book", excerpt: "Separate the reader’s experience from the reader’s proposed solution, then return to the intention of the work.", byline: "Fourth Group Editorial Desk", length: "6 min read" },
] as const;

export const AUTHOR_SERVICES = [
  { name: "Manuscript assessment", stage: "Develop", detail: "A clear editorial letter on structure, voice, pacing, character and the next priorities for revision.", includes: ["Whole-manuscript reading", "Editorial letter", "Follow-up conversation"] },
  { name: "Copyediting and proofreading", stage: "Refine", detail: "Careful language work that protects the author’s voice while improving consistency, clarity and correctness.", includes: ["Tracked editorial changes", "Style and consistency notes", "Final proof review options"] },
  { name: "Book positioning", stage: "Present", detail: "Reader-focused language for explaining what the book is, who it serves and why it matters now.", includes: ["Book description", "Author biography", "Audience and comparison notes"] },
  { name: "Cover and interior direction", stage: "Design", detail: "Creative direction for a professional reading experience across cover, typography and interior pages.", includes: ["Visual brief", "Cover feedback", "Interior review"] },
  { name: "Publication planning", stage: "Publish", detail: "A practical route from finished manuscript to release, shaped around the author’s goals and resources.", includes: ["Publishing pathway review", "Milestone plan", "Distribution questions"] },
  { name: "Publicity and launch support", stage: "Reach", detail: "A focused story and outreach plan for introducing the author and book to relevant readers and partners.", includes: ["Press materials", "Launch plan", "Interview preparation"] },
  { name: "Rights and adaptation preparation", stage: "Extend", detail: "Plain-language support for presenting translation, audio and screen possibilities without giving up control.", includes: ["Rights information review", "Adaptation summary", "Pitch preparation"] },
  { name: "Author platform review", stage: "Sustain", detail: "A practical review of the places readers meet the author, from website language to ongoing communication.", includes: ["Website and profile review", "Content direction", "Reader journey notes"] },
] as const;
