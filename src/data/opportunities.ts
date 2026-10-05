export type OpportunityStatus = "Open" | "Seasonal" | "Rolling" | "Check dates";

export type GrantOpportunity = {
  name: string;
  summary: string;
  amount: string;
  deadline: string;
  status: OpportunityStatus;
  genres: string[];
  eligibility: string;
  website: string;
};

export type ContestOpportunity = {
  name: string;
  summary: string;
  prize: string;
  fee: string;
  deadline: string;
  status: OpportunityStatus;
  genres: string[];
  website: string;
};

export type ResidencyOpportunity = {
  name: string;
  summary: string;
  location: string;
  duration: string;
  funding: string;
  status: OpportunityStatus;
  genres: string[];
  website: string;
};

export const GRANTS: GrantOpportunity[] = [
  { name: "National Endowment for the Arts Literature Fellowships", summary: "Fellowships supporting published creative writers as they develop new work.", amount: "$25,000", deadline: "Annual cycle", status: "Seasonal", genres: ["Poetry", "Prose"], eligibility: "United States writers", website: "https://www.arts.gov/grants/creative-writing-fellowships" },
  { name: "Whiting Awards", summary: "Unrestricted awards recognising exceptional promise in emerging writers.", amount: "$50,000", deadline: "By nomination", status: "Check dates", genres: ["Fiction", "Nonfiction", "Poetry", "Drama"], eligibility: "Emerging writers", website: "https://www.whiting.org/writers/awards/about" },
  { name: "Rona Jaffe Foundation Writers’ Awards", summary: "Awards supporting women writers at an early stage of their careers.", amount: "$30,000", deadline: "By nomination", status: "Check dates", genres: ["Fiction", "Nonfiction", "Poetry"], eligibility: "Women writers in the United States", website: "https://www.ronajaffefoundation.org/" },
  { name: "PEN/Robert J. Dau Short Story Prize", summary: "Recognises emerging writers for a debut short story published by a literary magazine.", amount: "$2,000", deadline: "Annual cycle", status: "Seasonal", genres: ["Short stories"], eligibility: "Eligible publications nominate", website: "https://pen.org/literary-awards/" },
  { name: "Sustainable Arts Foundation Awards", summary: "Unrestricted support for writers and artists who are raising children.", amount: "$5,000", deadline: "Annual cycle", status: "Seasonal", genres: ["Fiction", "Nonfiction", "Poetry"], eligibility: "Writers with children", website: "https://www.sustainableartsfoundation.org/awards" },
  { name: "Elizabeth George Foundation Grants", summary: "Project support for emerging writers of fiction, poetry and drama.", amount: "Varies", deadline: "Annual cycle", status: "Seasonal", genres: ["Fiction", "Poetry", "Drama"], eligibility: "Emerging writers", website: "https://www.elizabethgeorgefoundation.org/" },
  { name: "Awesome Foundation Arts Grants", summary: "Small, locally awarded grants that can support public literary projects.", amount: "$1,000", deadline: "Monthly", status: "Rolling", genres: ["All genres"], eligibility: "Varies by chapter", website: "https://www.awesomefoundation.org/" },
  { name: "Speculative Literature Foundation Grants", summary: "Targeted grants for writers working across speculative traditions.", amount: "Varies", deadline: "Multiple cycles", status: "Seasonal", genres: ["Speculative fiction"], eligibility: "Requirements vary by grant", website: "https://speculativeliterature.org/grants/" },
  { name: "Authors’ Foundation Grants", summary: "Support for writers working on a book project who need time or research funding.", amount: "Varies", deadline: "Twice yearly", status: "Seasonal", genres: ["Fiction", "Nonfiction"], eligibility: "United Kingdom and Commonwealth writers", website: "https://societyofauthors.org/grants/" },
  { name: "Royal Literary Fund Grants", summary: "Confidential financial support for established professional writers in difficulty.", amount: "Needs-based", deadline: "Rolling enquiries", status: "Rolling", genres: ["All genres"], eligibility: "Professional writers in the United Kingdom", website: "https://www.rlf.org.uk/our-work/grants/" },
  { name: "Canada Council for the Arts — Explore and Create", summary: "Project funding for research, creation and professional development.", amount: "Varies", deadline: "Programme cycles", status: "Check dates", genres: ["Literary arts"], eligibility: "Canadian artists and groups", website: "https://canadacouncil.ca/funding/grants/explore-and-create" },
  { name: "Australia Council Literature Projects", summary: "Funding for the creation and development of new literary work.", amount: "Varies", deadline: "Programme rounds", status: "Check dates", genres: ["Literary arts"], eligibility: "Australian applicants", website: "https://creative.gov.au/investment-and-development/arts-projects-for-individuals-and-groups/" },
];

export const CONTESTS: ContestOpportunity[] = [
  { name: "Bridport Prize", summary: "International awards for poetry, short stories, flash fiction and novels.", prize: "Varies by category", fee: "Entry fee", deadline: "Annual cycle", status: "Seasonal", genres: ["Poetry", "Short stories", "Novel"], website: "https://bridportprize.org.uk/" },
  { name: "Bath Short Story Award", summary: "International competition for unpublished short fiction.", prize: "£1,200 first prize", fee: "Entry fee", deadline: "Annual cycle", status: "Seasonal", genres: ["Short stories"], website: "https://www.bathshortstoryaward.org/" },
  { name: "Commonwealth Short Story Prize", summary: "An annual award for unpublished short fiction from the Commonwealth.", prize: "Regional and overall prizes", fee: "Free", deadline: "Annual cycle", status: "Seasonal", genres: ["Short stories"], website: "https://commonwealthfoundation.com/short-story-prize/" },
  { name: "Fish Publishing Short Story Prize", summary: "A long-running international competition with anthology publication.", prize: "€3,000 first prize", fee: "Entry fee", deadline: "Annual cycle", status: "Seasonal", genres: ["Short stories"], website: "https://www.fishpublishing.com/competition/short-story-contest/" },
  { name: "Manchester Writing Competition", summary: "Major international prizes for poetry and fiction manuscripts.", prize: "£10,000 per category", fee: "Entry fee", deadline: "Annual cycle", status: "Seasonal", genres: ["Poetry", "Fiction"], website: "https://www.mmu.ac.uk/writingcompetition" },
  { name: "Mslexia Women’s Fiction Competition", summary: "Awards and publication opportunities for women writing fiction.", prize: "Varies by category", fee: "Entry fee", deadline: "Multiple cycles", status: "Seasonal", genres: ["Novel", "Short stories", "Flash fiction"], website: "https://mslexia.co.uk/competitions/" },
  { name: "New Voices Award", summary: "Lee & Low Books award for an unpublished children’s picture book manuscript.", prize: "$2,000 plus contract", fee: "Free", deadline: "Annual cycle", status: "Seasonal", genres: ["Children’s"], website: "https://www.leeandlow.com/writers-illustrators/new-voices-award" },
  { name: "Oxford Poetry Prize", summary: "International competition for a single unpublished poem.", prize: "£1,000 first prize", fee: "Entry fee", deadline: "Annual cycle", status: "Seasonal", genres: ["Poetry"], website: "https://www.oxfordpoetry.com/prize" },
  { name: "Ploughshares Emerging Writer’s Contest", summary: "Publication and awards for writers who have not yet published a book.", prize: "$2,000 per genre", fee: "Entry fee", deadline: "Annual cycle", status: "Seasonal", genres: ["Fiction", "Nonfiction", "Poetry"], website: "https://pshares.org/submit/emerging-writers-contest/" },
  { name: "The Moth Poetry Prize", summary: "An international prize for an unpublished poem, judged by a leading poet.", prize: "€6,000 first prize", fee: "Entry fee", deadline: "Annual cycle", status: "Seasonal", genres: ["Poetry"], website: "https://www.themothmagazine.com/a1-page.asp?ID=7679&page=2" },
  { name: "Tom Howard/John H. Reid Fiction & Essay Contest", summary: "Open international competition for short fiction and essays.", prize: "$3,500 top prizes", fee: "Entry fee", deadline: "Annual cycle", status: "Seasonal", genres: ["Fiction", "Essay"], website: "https://winningwriters.com/our-contests/tom-howard-john-h-reid-fiction-essay-contest" },
  { name: "Writers of the Future Contest", summary: "Quarterly competition for emerging speculative fiction writers.", prize: "Quarterly and annual prizes", fee: "Free", deadline: "Quarterly", status: "Open", genres: ["Science fiction", "Fantasy"], website: "https://www.writersofthefuture.com/contest-rules-writers/" },
];

export const RESIDENCIES: ResidencyOpportunity[] = [
  { name: "MacDowell Fellowship", summary: "Dedicated studio time and an interdisciplinary artist community.", location: "New Hampshire, United States", duration: "Up to 8 weeks", funding: "Fellowship funded", status: "Seasonal", genres: ["All genres"], website: "https://www.macdowell.org/apply" },
  { name: "Yaddo Residencies", summary: "Uninterrupted working time for professional artists in a historic creative community.", location: "New York, United States", duration: "2–8 weeks", funding: "Residency funded", status: "Seasonal", genres: ["Fiction", "Nonfiction", "Poetry", "Drama"], website: "https://yaddo.org/apply/" },
  { name: "Ucross Residency Program", summary: "Private studio, accommodation and meals for selected artists.", location: "Wyoming, United States", duration: "2–6 weeks", funding: "Residency funded", status: "Seasonal", genres: ["All genres"], website: "https://www.ucrossfoundation.org/residency-program.html" },
  { name: "Vermont Studio Center", summary: "A residential programme bringing writers and visual artists together.", location: "Vermont, United States", duration: "2–4 weeks", funding: "Fellowships available", status: "Seasonal", genres: ["Fiction", "Nonfiction", "Poetry"], website: "https://vermontstudiocenter.org/" },
  { name: "Hedgebrook Residency", summary: "A retreat supporting women-identified writers in a collaborative setting.", location: "Washington, United States", duration: "2–4 weeks", funding: "Fully funded", status: "Seasonal", genres: ["All genres"], website: "https://www.hedgebrook.org/writers-in-residence" },
  { name: "Banff Centre Literary Arts", summary: "Intensive and self-directed programmes for writers at different career stages.", location: "Alberta, Canada", duration: "Programme dependent", funding: "Scholarships available", status: "Check dates", genres: ["All genres"], website: "https://www.banffcentre.ca/programs/literary-arts" },
  { name: "Art Omi: Writers", summary: "An international residency designed around cultural exchange and independent work.", location: "New York, United States", duration: "One month", funding: "No programme fee", status: "Seasonal", genres: ["All genres", "Translation"], website: "https://artomi.org/residencies/writers/" },
  { name: "Ragdale Residency", summary: "Quiet working time for writers and artists near Chicago.", location: "Illinois, United States", duration: "18 or 25 days", funding: "Fellowships available", status: "Seasonal", genres: ["All genres"], website: "https://www.ragdale.org/residency" },
  { name: "Jentel Artist Residency", summary: "Independent studios, accommodation and shared evening conversations.", location: "Wyoming, United States", duration: "One month", funding: "Stipend included", status: "Seasonal", genres: ["All genres"], website: "https://jentelarts.org/" },
  { name: "Moniack Mhor Residencies", summary: "Supported time to write in the Scottish Highlands.", location: "Scotland, United Kingdom", duration: "Programme dependent", funding: "Bursaries available", status: "Check dates", genres: ["All genres"], website: "https://www.moniackmhor.org.uk/" },
  { name: "Jan Michalski Foundation Residencies", summary: "Residencies for writers and translators from around the world.", location: "Montricher, Switzerland", duration: "2 weeks–3 months", funding: "Travel and living support", status: "Seasonal", genres: ["All genres", "Translation"], website: "https://fondation-janmichalski.com/en/residencies" },
  { name: "Künstlerhaus Schloss Wiepersdorf", summary: "International fellowships for literature and the arts in Brandenburg.", location: "Brandenburg, Germany", duration: "Programme dependent", funding: "Fellowship funded", status: "Seasonal", genres: ["Literature", "Translation"], website: "https://schloss-wiepersdorf.de/en/fellowships.html" },
];

export type AuthorProfile = {
  name: string;
  craft: string;
  location: string;
  books: number;
  available: string[];
  bio: string;
  featured?: boolean;
};

export const AUTHORS: AuthorProfile[] = [
  { name: "Jack Ryan", craft: "Memoir · Humour", location: "United States", books: 3, available: ["Interviews", "Readings"], featured: true, bio: "Writes candid, comic memoirs about work, family and the unexpected turns of an ordinary life." },
  { name: "Adaeze Okonkwo", craft: "Literary fiction", location: "Lagos", books: 2, available: ["Panels", "Interviews"], bio: "A novelist interested in coastal communities, inheritance and the stories families agree not to tell." },
  { name: "Helen Varga", craft: "Poetry", location: "Bristol", books: 1, available: ["Readings", "Workshops"], bio: "Her poems attend to weather, labour and the small rituals through which places become home." },
  { name: "Marcus Ilesanmi", craft: "Short stories", location: "Toronto", books: 3, available: ["Panels", "Mentoring"], bio: "Writes compressed urban stories about missed meetings, second chances and complicated neighbours." },
  { name: "Priya Raghavan", craft: "Memoir", location: "Chennai", books: 1, available: ["Interviews", "Festivals"], bio: "Her essays move between food, migration and the unstable archive of family memory." },
  { name: "Tomas Reddy", craft: "Screenwriting", location: "Dublin", books: 2, available: ["Panels", "Script talks"], bio: "A screenwriter developing character-led dramas for television and independent film." },
  { name: "Camille Esparza", craft: "Poetry · Translation", location: "Mexico City", books: 4, available: ["Readings", "Translation talks"], bio: "A poet and translator working across English and Spanish with a focus on place and ecology." },
  { name: "Ola Sandvik", craft: "Nature writing", location: "Bergen", books: 2, available: ["Festivals", "Interviews"], bio: "Combines field observation with personal essays about land use, seasons and attention." },
  { name: "Iris Lenoir", craft: "Historical fiction", location: "Montreal", books: 3, available: ["Book clubs", "Panels"], bio: "Builds intimate historical novels around overlooked records and contested public memory." },
  { name: "Nuru Adeyemi", craft: "Speculative fiction", location: "Nairobi", books: 1, available: ["Workshops", "Festivals"], bio: "Writes speculative work where technology, folklore and civic life meet." },
  { name: "Lena Ward", craft: "Children’s literature", location: "Manchester", books: 2, available: ["School visits", "Workshops"], bio: "Creates warm, adventurous stories for young readers and the adults reading alongside them." },
  { name: "Samuel Ko", craft: "Essays · Criticism", location: "Seoul", books: 2, available: ["Lectures", "Panels"], bio: "An essayist exploring contemporary culture, visual art and the ethics of looking closely." },
];