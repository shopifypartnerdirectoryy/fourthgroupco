export type DirectoryStatus = "Open" | "Closed" | "Accepting";

export type Magazine = { name: string; status: "Open" | "Closed"; genres: string[]; reading: string; payment: string; response: string; website: string; description: string };
export type Press = { name: string; status: "Accepting" | "Closed"; genres: string[]; location: string; description: string; website: string };
export type Agent = { id: number; name: string; agency: string; location: string; status: "Open" | "Closed"; genres: string[]; website: string };

export const MAGAZINES: Magazine[] = [
  {
    "name": "The Paris Review",
    "status": "Open",
    "genres": [
      "Poetry",
      "Fiction",
      "Nonfiction"
    ],
    "reading": "Year-round",
    "payment": "Yes",
    "response": "3–6 months",
    "website": "https://www.theparisreview.org/",
    "description": "A long-established quarterly publishing interviews, poetry, fiction, and essays."
  },
  {
    "name": "Tin House",
    "status": "Closed",
    "genres": [
      "Fiction",
      "Poetry",
      "Nonfiction"
    ],
    "reading": "Seasonal",
    "payment": "Yes",
    "response": "3–4 months",
    "website": "https://zandoprojects.com/imprints/tin-house",
    "description": "An independent imprint and literary home known for distinctive contemporary writing."
  },
  {
    "name": "Granta",
    "status": "Open",
    "genres": [
      "Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "reading": "Year-round",
    "payment": "Yes",
    "response": "4–6 months",
    "website": "https://granta.com/",
    "description": "International literary magazine publishing ambitious new fiction, memoir, reportage, and ideas."
  },
  {
    "name": "One Story",
    "status": "Open",
    "genres": [
      "Fiction"
    ],
    "reading": "Seasonal",
    "payment": "Yes",
    "response": "3–4 months",
    "website": "https://one-story.com/",
    "description": "A nonprofit magazine devoted to publishing one exceptional short story at a time."
  },
  {
    "name": "The Sun Magazine",
    "status": "Open",
    "genres": [
      "Fiction",
      "Nonfiction",
      "Poetry"
    ],
    "reading": "Year-round",
    "payment": "Yes",
    "response": "3–6 months",
    "website": "https://www.thesunmagazine.org/",
    "description": "Independent, reader-supported writing with a focus on personal essays, interviews, fiction, and poetry."
  },
  {
    "name": "Ploughshares",
    "status": "Open",
    "genres": [
      "Poetry",
      "Fiction",
      "Nonfiction"
    ],
    "reading": "Seasonal",
    "payment": "Yes",
    "response": "3–5 months",
    "website": "https://pshares.org/",
    "description": "A literary journal based at Emerson College, publishing new work across genres."
  },
  {
    "name": "AGNI",
    "status": "Open",
    "genres": [
      "Poetry",
      "Fiction",
      "Nonfiction"
    ],
    "reading": "Seasonal",
    "payment": "Yes",
    "response": "2–4 months",
    "website": "https://agnionline.bu.edu/",
    "description": "An international literary journal presenting poetry, stories, essays, and translations."
  },
  {
    "name": "Conjunctions",
    "status": "Open",
    "genres": [
      "Fiction",
      "Poetry",
      "Nonfiction"
    ],
    "reading": "Year-round",
    "payment": "Yes",
    "response": "3–6 months",
    "website": "https://conjunctions.com",
    "description": "A journal for innovative fiction, poetry, essays, and work that crosses conventional forms."
  },
  {
    "name": "The Kenyon Review",
    "status": "Closed",
    "genres": [
      "Poetry",
      "Fiction",
      "Nonfiction",
      "Drama"
    ],
    "reading": "Seasonal",
    "payment": "Yes",
    "response": "3–5 months",
    "website": "https://kenyonreview.org/",
    "description": "A respected literary review publishing carefully selected writing across genres."
  },
  {
    "name": "Prairie Schooner",
    "status": "Open",
    "genres": [
      "Poetry",
      "Fiction",
      "Nonfiction"
    ],
    "reading": "Seasonal",
    "payment": "Yes",
    "response": "3–5 months",
    "website": "https://prairieschooner.unl.edu/",
    "description": "A University of Nebraska literary journal presenting established and emerging voices."
  },
  {
    "name": "Poetry Magazine",
    "status": "Open",
    "genres": [
      "Poetry"
    ],
    "reading": "Year-round",
    "payment": "Yes",
    "response": "3–6 months",
    "website": "https://poetryfoundation.org",
    "description": "The Poetry Foundation’s magazine, publishing a broad range of contemporary poetry."
  },
  {
    "name": "ZYZZYVA",
    "status": "Closed",
    "genres": [
      "Fiction",
      "Poetry",
      "Nonfiction"
    ],
    "reading": "Seasonal",
    "payment": "Yes",
    "response": "2–5 months",
    "website": "https://zyzzyva.org",
    "description": "A San Francisco literary magazine featuring writers and artists from the West Coast and beyond."
  }
];

export const PRESSES: Press[] = [
  {
    "name": "Graywolf Press",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Poetry",
      "Nonfiction"
    ],
    "location": "Minneapolis, MN",
    "description": "Independent literary publisher of poetry, fiction, essays, and nonfiction.",
    "website": "https://graywolfpress.org/"
  },
  {
    "name": "Coffee House Press",
    "status": "Closed",
    "genres": [
      "Fiction",
      "Poetry"
    ],
    "location": "Minneapolis, MN",
    "description": "Nonprofit press championing inventive and boundary-crossing writing.",
    "website": "https://coffeehousepress.org/"
  },
  {
    "name": "Milkweed Editions",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Poetry",
      "Nonfiction"
    ],
    "location": "Minneapolis, MN",
    "description": "Independent nonprofit publisher with a strong interest in place, nature, and ideas.",
    "website": "https://milkweed.org/"
  },
  {
    "name": "Copper Canyon Press",
    "status": "Accepting",
    "genres": [
      "Poetry"
    ],
    "location": "Port Townsend, WA",
    "description": "Nonprofit publisher devoted exclusively to poetry.",
    "website": "https://www.coppercanyonpress.org/"
  },
  {
    "name": "Tin House Books",
    "status": "Closed",
    "genres": [
      "Fiction",
      "Nonfiction"
    ],
    "location": "Portland, OR",
    "description": "Literary imprint publishing novels, story collections, and narrative nonfiction.",
    "website": "https://zandoprojects.com/imprints/tin-house"
  },
  {
    "name": "Akashic Books",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Poetry",
      "Nonfiction"
    ],
    "location": "Brooklyn, NY",
    "description": "Independent publisher known for urban literary fiction and distinctive new voices.",
    "website": "https://www.akashicbooks.com/"
  },
  {
    "name": "Algonquin Books",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction"
    ],
    "location": "Chapel Hill, NC",
    "description": "Publisher of literary fiction and narrative nonfiction for a broad readership.",
    "website": "https://www.hachettebookgroup.com/imprint/algonquin-books/"
  },
  {
    "name": "Archipelago Books",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Poetry",
      "Translation"
    ],
    "location": "Brooklyn, NY",
    "description": "Nonprofit press dedicated to literature in English translation.",
    "website": "https://archipelagobooks.org/"
  },
  {
    "name": "Bellevue Literary Press",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction"
    ],
    "location": "New York, NY",
    "description": "Nonprofit press publishing work at the intersection of arts and sciences.",
    "website": "https://www.blpress.org/"
  },
  {
    "name": "Black Ocean",
    "status": "Closed",
    "genres": [
      "Poetry"
    ],
    "location": "Boston, MA",
    "description": "Independent poetry press publishing formally adventurous collections.",
    "website": "https://www.blackocean.org/"
  },
  {
    "name": "BOA Editions",
    "status": "Accepting",
    "genres": [
      "Poetry",
      "Fiction"
    ],
    "location": "Rochester, NY",
    "description": "Nonprofit literary publisher supporting contemporary poetry and short fiction.",
    "website": "https://boaeditions.org/"
  },
  {
    "name": "Catapult",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "location": "New York, NY",
    "description": "Independent publisher of contemporary fiction and narrative nonfiction.",
    "website": "https://books.catapult.co/"
  },
  {
    "name": "City Lights Publishers",
    "status": "Closed",
    "genres": [
      "Poetry",
      "Fiction",
      "Nonfiction"
    ],
    "location": "San Francisco, CA",
    "description": "Independent press rooted in literary experiment and cultural inquiry.",
    "website": "https://citylights.com/"
  },
  {
    "name": "Deep Vellum Publishing",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Poetry",
      "Translation"
    ],
    "location": "Dallas, TX",
    "description": "Nonprofit publisher bringing international and translated literature to English readers.",
    "website": "https://www.deepvellum.org/"
  },
  {
    "name": "Europa Editions",
    "status": "Closed",
    "genres": [
      "Fiction",
      "Translation"
    ],
    "location": "New York, NY",
    "description": "Publisher of international fiction and literature in translation.",
    "website": "https://www.europaeditions.com/"
  },
  {
    "name": "Feiwel & Friends",
    "status": "Closed",
    "genres": [
      "Children’s",
      "Young Adult"
    ],
    "location": "New York, NY",
    "description": "Macmillan imprint publishing fiction and nonfiction for young readers.",
    "website": "https://feiwelandfriends.com/"
  },
  {
    "name": "Four Way Books",
    "status": "Accepting",
    "genres": [
      "Poetry",
      "Fiction"
    ],
    "location": "New York, NY",
    "description": "Nonprofit literary press publishing poetry and short fiction.",
    "website": "https://fourwaybooks.com/site/"
  },
  {
    "name": "Haymarket Books",
    "status": "Accepting",
    "genres": [
      "Nonfiction",
      "Poetry"
    ],
    "location": "Chicago, IL",
    "description": "Independent nonprofit publisher focused on social and political writing.",
    "website": "https://www.haymarketbooks.org/"
  },
  {
    "name": "Kaya Press",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Poetry",
      "Nonfiction"
    ],
    "location": "Los Angeles, CA",
    "description": "Independent publisher centering Asian and Pacific Islander diasporic literature.",
    "website": "https://kaya.com/"
  },
  {
    "name": "Lanternfish Press",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction"
    ],
    "location": "Philadelphia, PA",
    "description": "Small press publishing literary work with an experimental or unconventional edge.",
    "website": "https://lanternfishpress.com/"
  },
  {
    "name": "Lee & Low Books",
    "status": "Accepting",
    "genres": [
      "Children’s",
      "Young Adult"
    ],
    "location": "New York, NY",
    "description": "Independent multicultural children’s book publisher.",
    "website": "https://leeandlow.com/"
  },
  {
    "name": "Melville House",
    "status": "Closed",
    "genres": [
      "Fiction",
      "Nonfiction"
    ],
    "location": "Brooklyn, NY",
    "description": "Independent publisher of literary fiction, nonfiction, and international writing.",
    "website": "https://mhpbooks.com/"
  },
  {
    "name": "New Directions",
    "status": "Closed",
    "genres": [
      "Fiction",
      "Poetry",
      "Translation"
    ],
    "location": "New York, NY",
    "description": "Independent publisher of modern and international literature.",
    "website": "https://www.ndbooks.com/"
  },
  {
    "name": "Restless Books",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction",
      "Translation"
    ],
    "location": "Brooklyn, NY",
    "description": "Independent publisher of international stories and writing across borders.",
    "website": "https://restlessbooks.org/"
  },
  {
    "name": "Soho Press",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Mystery/Thriller"
    ],
    "location": "New York, NY",
    "description": "Independent publisher of literary fiction, international crime, and young adult books.",
    "website": "https://sohopress.com/"
  },
  {
    "name": "Third Man Books",
    "status": "Closed",
    "genres": [
      "Poetry",
      "Fiction",
      "Nonfiction"
    ],
    "location": "Nashville, TN",
    "description": "Literary imprint publishing poetry, fiction, and cultural writing.",
    "website": "https://www.thirdmanbooks.com/"
  },
  {
    "name": "Torrey House Press",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction"
    ],
    "location": "Salt Lake City, UT",
    "description": "Nonprofit press publishing literature about place, land, and conservation.",
    "website": "https://www.torreyhouse.org/"
  },
  {
    "name": "Transit Books",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction",
      "Translation"
    ],
    "location": "Oakland, CA",
    "description": "Independent publisher of international and translated literature.",
    "website": "https://www.transitbooks.org/"
  },
  {
    "name": "Two Dollar Radio",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction"
    ],
    "location": "Columbus, OH",
    "description": "Independent press publishing bold literary fiction and narrative nonfiction.",
    "website": "https://twodollarradio.com/"
  },
  {
    "name": "Unnamed Press",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction",
      "Translation"
    ],
    "location": "Los Angeles, CA",
    "description": "Independent publisher of diverse voices and international literature.",
    "website": "https://www.unnamedpress.com/"
  },
  {
    "name": "Wave Books",
    "status": "Closed",
    "genres": [
      "Poetry"
    ],
    "location": "Seattle, WA",
    "description": "Independent poetry press publishing innovative contemporary work.",
    "website": "https://www.wavepoetry.com/"
  },
  {
    "name": "Zibby Books",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction"
    ],
    "location": "New York, NY",
    "description": "Boutique publisher focused on resonant stories and reader connection.",
    "website": "https://zibbymedia.com/"
  },
  {
    "name": "Astra House",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction",
      "Children’s"
    ],
    "location": "New York, NY",
    "description": "Publisher of fiction, nonfiction, and books for young readers.",
    "website": "https://astrahouse.com"
  },
  {
    "name": "Dzanc Books",
    "status": "Accepting",
    "genres": [
      "Fiction",
      "Nonfiction"
    ],
    "location": "Ann Arbor, MI",
    "description": "Nonprofit publisher supporting innovative literary writing.",
    "website": "https://www.dzancbooks.org/"
  }
];

export const AGENTS: Agent[] = [
  {
    "id": 1,
    "name": "Jennifer Jackson",
    "agency": "Donald Maass Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy"
    ],
    "website": "https://maassagency.com"
  },
  {
    "id": 2,
    "name": "Brooks Sherman",
    "agency": "Janklow & Nesbit Associates",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.janklowandnesbit.com"
  },
  {
    "id": 3,
    "name": "Duvall Osteen",
    "agency": "Aragi Inc.",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Memoir"
    ],
    "website": "http://www.aragi.net"
  },
  {
    "id": 4,
    "name": "Eric Smith",
    "agency": "P.S. Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Romance",
      "Science Fiction"
    ],
    "website": "https://www.psliterary.com"
  },
  {
    "id": 5,
    "name": "Quressa Robinson",
    "agency": "Nelson Literary Agency",
    "location": "Denver, CO",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "Science Fiction"
    ],
    "website": "https://nelsonagency.com"
  },
  {
    "id": 6,
    "name": "Jessica Sinsheimer",
    "agency": "Steven Salpeter Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Memoir",
      "Nonfiction"
    ],
    "website": "https://stevensalpeteragency.com"
  },
  {
    "id": 7,
    "name": "Sarah Landis",
    "agency": "Sterling Lord Literistic",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.sll.com"
  },
  {
    "id": 8,
    "name": "Pete Knapp",
    "agency": "Park & Fine Literary and Media",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Thriller"
    ],
    "website": "https://parkfine.com"
  },
  {
    "id": 9,
    "name": "Holly Root",
    "agency": "Root Literary",
    "location": "Los Angeles, CA",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Young Adult"
    ],
    "website": "https://rootliterary.com"
  },
  {
    "id": 10,
    "name": "Suzie Townsend",
    "agency": "New Leaf Literary & Media",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Young Adult",
      "Fantasy",
      "Romance"
    ],
    "website": "https://www.newleafliterary.com"
  },
  {
    "id": 11,
    "name": "Jim McCarthy",
    "agency": "Dystel Goderich & Bourret",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Mystery/Thriller",
      "Romance",
      "Memoir"
    ],
    "website": "https://www.dystel.com"
  },
  {
    "id": 12,
    "name": "Laura Bradford",
    "agency": "Bradford Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Romance",
      "Mystery/Thriller",
      "Women's Fiction"
    ],
    "website": "https://bradfordliteraryagency.com"
  },
  {
    "id": 13,
    "name": "Janet Reid",
    "agency": "New Leaf Literary & Media",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Mystery/Thriller",
      "Literary Fiction"
    ],
    "website": "https://www.newleafliterary.com"
  },
  {
    "id": 14,
    "name": "Sarah Younger",
    "agency": "Nancy Yost Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "Women's Fiction"
    ],
    "website": "https://nyliterary.com"
  },
  {
    "id": 15,
    "name": "Naomi Davis",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Mystery/Thriller"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 16,
    "name": "Lauren Abramo",
    "agency": "Dystel Goderich & Bourret",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.dystel.com"
  },
  {
    "id": 17,
    "name": "Moe Ferrara",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Young Adult"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 18,
    "name": "Kristin Nelson",
    "agency": "Nelson Literary Agency",
    "location": "Denver, CO",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Science Fiction",
      "Romance"
    ],
    "website": "https://nelsonagency.com"
  },
  {
    "id": 19,
    "name": "Hannah Fergesen",
    "agency": "KT Literary",
    "location": "Denver, CO",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Fantasy"
    ],
    "website": "https://ktliterary.com"
  },
  {
    "id": 20,
    "name": "Kate Testerman",
    "agency": "KT Literary",
    "location": "Denver, CO",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Romance"
    ],
    "website": "https://ktliterary.com"
  },
  {
    "id": 21,
    "name": "Jessica Faust",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Mystery/Thriller",
      "Romance",
      "Women's Fiction"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 22,
    "name": "Rachel Brooks",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Romance",
      "Young Adult",
      "Women's Fiction"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 23,
    "name": "Bridget Smith",
    "agency": "JABberwocky Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Horror"
    ],
    "website": "https://awfulagent.com"
  },
  {
    "id": 24,
    "name": "Joshua Bilmes",
    "agency": "JABberwocky Literary Agency",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Thriller"
    ],
    "website": "https://awfulagent.com"
  },
  {
    "id": 25,
    "name": "Amy Elizabeth Bishop",
    "agency": "Dystel Goderich & Bourret",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.dystel.com"
  },
  {
    "id": 26,
    "name": "Beth Phelan",
    "agency": "Gallt & Zacker Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://galltzacker.com"
  },
  {
    "id": 27,
    "name": "Joanna MacKenzie",
    "agency": "Nelson Literary Agency",
    "location": "Denver, CO",
    "status": "Open",
    "genres": [
      "Thriller",
      "Women's Fiction",
      "Upmarket Fiction"
    ],
    "website": "https://nelsonagency.com"
  },
  {
    "id": 28,
    "name": "Connor Goldsmith",
    "agency": "Fuse Literary",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "LGBTQ+ Fiction"
    ],
    "website": "https://fuseliterary.com"
  },
  {
    "id": 29,
    "name": "Tricia Skinner",
    "agency": "Fuse Literary",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Romance",
      "Science Fiction",
      "Fantasy"
    ],
    "website": "https://fuseliterary.com"
  },
  {
    "id": 30,
    "name": "Carlisle Webber",
    "agency": "Fuse Literary",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://fuseliterary.com"
  },
  {
    "id": 31,
    "name": "Maria Vicente",
    "agency": "P.S. Literary Agency",
    "location": "Toronto, ON",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://www.psliterary.com"
  },
  {
    "id": 32,
    "name": "Caitie Flum",
    "agency": "Liza Dawson Associates",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Fantasy"
    ],
    "website": "https://www.lizadawsonassociates.com"
  },
  {
    "id": 33,
    "name": "Liza Dawson",
    "agency": "Liza Dawson Associates",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Thriller",
      "Mystery/Thriller",
      "Historical Fiction"
    ],
    "website": "https://www.lizadawsonassociates.com"
  },
  {
    "id": 34,
    "name": "Caitlin McDonald",
    "agency": "Donald Maass Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Horror"
    ],
    "website": "https://maassagency.com"
  },
  {
    "id": 35,
    "name": "Donald Maass",
    "agency": "Donald Maass Literary Agency",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Science Fiction",
      "Fantasy"
    ],
    "website": "https://maassagency.com"
  },
  {
    "id": 36,
    "name": "Victoria Marini",
    "agency": "Irene Goodman Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Fantasy",
      "Thriller"
    ],
    "website": "https://irenegoodman.com"
  },
  {
    "id": 37,
    "name": "Irene Goodman",
    "agency": "Irene Goodman Literary Agency",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Romance",
      "Historical Fiction",
      "Women's Fiction"
    ],
    "website": "https://irenegoodman.com"
  },
  {
    "id": 38,
    "name": "Andrea Somberg",
    "agency": "Harvey Klinger Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Health"
    ],
    "website": "https://harveyklinger.com"
  },
  {
    "id": 39,
    "name": "Wendy Schmalz",
    "agency": "Wendy Schmalz Agency",
    "location": "Hudson, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade"
    ],
    "website": "https://schmalzagency.com"
  },
  {
    "id": 40,
    "name": "Sarah Davies",
    "agency": "Greenhouse Literary Agency",
    "location": "London / NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.greenhouseliterary.com"
  },
  {
    "id": 41,
    "name": "Rena Rossner",
    "agency": "Deborah Harris Agency",
    "location": "Israel",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Young Adult",
      "Literary Fiction"
    ],
    "website": "https://www.thedeborahharrisagency.com"
  },
  {
    "id": 42,
    "name": "Thao Le",
    "agency": "Sandra Dijkstra Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Fantasy",
      "Science Fiction"
    ],
    "website": "https://dijkstraagency.com"
  },
  {
    "id": 43,
    "name": "Sandra Dijkstra",
    "agency": "Sandra Dijkstra Literary Agency",
    "location": "San Diego, CA",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://dijkstraagency.com"
  },
  {
    "id": 44,
    "name": "Amy Tannenbaum",
    "agency": "Jane Rotrosen Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Women's Fiction",
      "Romance",
      "Thriller"
    ],
    "website": "https://janerotrosen.com"
  },
  {
    "id": 45,
    "name": "Meg LaTorre",
    "agency": "Martin Literary Management",
    "location": "Seattle, WA",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Young Adult"
    ],
    "website": "https://martinlit.com"
  },
  {
    "id": 46,
    "name": "Jennifer March Soloway",
    "agency": "Andrea Brown Literary Agency",
    "location": "San Francisco, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade"
    ],
    "website": "https://www.andreabrownlit.com"
  },
  {
    "id": 47,
    "name": "Andrea Brown",
    "agency": "Andrea Brown Literary Agency",
    "location": "San Francisco, CA",
    "status": "Closed",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.andreabrownlit.com"
  },
  {
    "id": 48,
    "name": "Laura Rennert",
    "agency": "Andrea Brown Literary Agency",
    "location": "San Francisco, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Literary Fiction"
    ],
    "website": "https://www.andreabrownlit.com"
  },
  {
    "id": 49,
    "name": "Kate McKean",
    "agency": "Morhaim Literary",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Graphic Novels"
    ],
    "website": "https://morhaimliterary.com"
  },
  {
    "id": 50,
    "name": "Lucienne Diver",
    "agency": "The Knight Agency",
    "location": "Atlanta, GA",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Romance",
      "Young Adult"
    ],
    "website": "https://knightagency.net"
  },
  {
    "id": 51,
    "name": "Deidre Knight",
    "agency": "The Knight Agency",
    "location": "Atlanta, GA",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Fantasy"
    ],
    "website": "https://knightagency.net"
  },
  {
    "id": 52,
    "name": "Nephele Tempest",
    "agency": "The Knight Agency",
    "location": "Atlanta, GA",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "Thriller"
    ],
    "website": "https://knightagency.net"
  },
  {
    "id": 53,
    "name": "Travis Pennington",
    "agency": "The Knight Agency",
    "location": "Atlanta, GA",
    "status": "Open",
    "genres": [
      "Thriller",
      "Mystery/Thriller",
      "Horror"
    ],
    "website": "https://knightagency.net"
  },
  {
    "id": 54,
    "name": "Kristy Hunter",
    "agency": "The Knight Agency",
    "location": "Atlanta, GA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Romance",
      "Women's Fiction"
    ],
    "website": "https://knightagency.net"
  },
  {
    "id": 55,
    "name": "Michelle Richter",
    "agency": "Fuse Literary",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Thriller",
      "Mystery/Thriller",
      "Nonfiction"
    ],
    "website": "https://fuseliterary.com"
  },
  {
    "id": 56,
    "name": "Laurie McLean",
    "agency": "Fuse Literary",
    "location": "San Francisco, CA",
    "status": "Closed",
    "genres": [
      "Fantasy",
      "Science Fiction",
      "Romance"
    ],
    "website": "https://fuseliterary.com"
  },
  {
    "id": 57,
    "name": "Gordon Warnock",
    "agency": "Fuse Literary",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Cookbooks"
    ],
    "website": "https://fuseliterary.com"
  },
  {
    "id": 58,
    "name": "Uwe Stender",
    "agency": "TriadaUS Literary Agency",
    "location": "Pittsburgh, PA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.triadaus.com"
  },
  {
    "id": 59,
    "name": "Brent Taylor",
    "agency": "TriadaUS Literary Agency",
    "location": "Pittsburgh, PA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Fantasy"
    ],
    "website": "https://www.triadaus.com"
  },
  {
    "id": 60,
    "name": "Amy Jameson",
    "agency": "A+B Works",
    "location": "Portland, OR",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://abworks.com"
  },
  {
    "id": 61,
    "name": "Michael Bourret",
    "agency": "Dystel Goderich & Bourret",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.dystel.com"
  },
  {
    "id": 62,
    "name": "Stacey Graham",
    "agency": "Three Seas Literary Agency",
    "location": "Maryland",
    "status": "Open",
    "genres": [
      "Romance",
      "Mystery/Thriller",
      "Nonfiction"
    ],
    "website": "https://threeseaslit.com"
  },
  {
    "id": 63,
    "name": "Michelle Witte",
    "agency": "Mansion Street Literary Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://mansionstreet.com"
  },
  {
    "id": 64,
    "name": "Jean Sagendorph",
    "agency": "Mansion Street Literary Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Cookbooks"
    ],
    "website": "https://mansionstreet.com"
  },
  {
    "id": 65,
    "name": "Kevan Lyon",
    "agency": "Marsal Lyon Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Young Adult"
    ],
    "website": "https://marsallyonliterary.com"
  },
  {
    "id": 66,
    "name": "Jill Marsal",
    "agency": "Marsal Lyon Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Women's Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://marsallyonliterary.com"
  },
  {
    "id": 67,
    "name": "Patricia Nelson",
    "agency": "Marsal Lyon Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Fantasy",
      "Literary Fiction"
    ],
    "website": "https://marsallyonliterary.com"
  },
  {
    "id": 68,
    "name": "Shannon Hassan",
    "agency": "Marsal Lyon Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://marsallyonliterary.com"
  },
  {
    "id": 69,
    "name": "Eva Scalzo",
    "agency": "Speilburg Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Young Adult",
      "New Adult"
    ],
    "website": "https://speilburgliterary.com"
  },
  {
    "id": 70,
    "name": "Alice Speilburg",
    "agency": "Speilburg Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Nonfiction"
    ],
    "website": "https://speilburgliterary.com"
  },
  {
    "id": 71,
    "name": "Sarah Phair",
    "agency": "Curtis Brown Ltd.",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.curtisbrown.com"
  },
  {
    "id": 72,
    "name": "Ginger Clark",
    "agency": "Curtis Brown Ltd.",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Young Adult"
    ],
    "website": "https://www.curtisbrown.com"
  },
  {
    "id": 73,
    "name": "Holly Frederick",
    "agency": "Curtis Brown Ltd.",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Thriller",
      "Mystery/Thriller",
      "Commercial Fiction"
    ],
    "website": "https://www.curtisbrown.com"
  },
  {
    "id": 74,
    "name": "Steven Salpeter",
    "agency": "Curtis Brown Ltd.",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://www.curtisbrown.com"
  },
  {
    "id": 75,
    "name": "Danielle Burby",
    "agency": "Nelson Literary Agency",
    "location": "Denver, CO",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Romance",
      "Fantasy"
    ],
    "website": "https://nelsonagency.com"
  },
  {
    "id": 76,
    "name": "Victoria Wells Arms",
    "agency": "Wells Arms Literary",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://wellsarmsliterary.com"
  },
  {
    "id": 77,
    "name": "Jennifer Laughran",
    "agency": "Andrea Brown Literary Agency",
    "location": "San Francisco, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Children's Nonfiction"
    ],
    "website": "https://www.andreabrownlit.com"
  },
  {
    "id": 78,
    "name": "Sara Megibow",
    "agency": "KT Literary",
    "location": "Denver, CO",
    "status": "Open",
    "genres": [
      "Romance",
      "Science Fiction",
      "Fantasy"
    ],
    "website": "https://ktliterary.com"
  },
  {
    "id": 79,
    "name": "Renee Nyen",
    "agency": "KT Literary",
    "location": "Denver, CO",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Fantasy"
    ],
    "website": "https://ktliterary.com"
  },
  {
    "id": 80,
    "name": "Beth Campbell",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Cozy Mystery"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 81,
    "name": "James McGowan",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Horror"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 82,
    "name": "Amanda Jain",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Mystery/Thriller",
      "Romance",
      "Historical Fiction"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 83,
    "name": "Natalie Lakosil",
    "agency": "Bradford Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Romance"
    ],
    "website": "https://bradfordliteraryagency.com"
  },
  {
    "id": 84,
    "name": "Kari Sutherland",
    "agency": "Bradford Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade"
    ],
    "website": "https://bradfordliteraryagency.com"
  },
  {
    "id": 85,
    "name": "Jennifer Chen Tran",
    "agency": "Bradford Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Memoir"
    ],
    "website": "https://bradfordliteraryagency.com"
  },
  {
    "id": 86,
    "name": "Penelope Burns",
    "agency": "Gelfman Schneider / ICM Partners",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://www.icmpartners.com"
  },
  {
    "id": 87,
    "name": "Amy Berkower",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Women's Fiction",
      "Young Adult",
      "Nonfiction"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 88,
    "name": "Merrilee Heifetz",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Fantasy",
      "Science Fiction"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 89,
    "name": "Susan Golomb",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 90,
    "name": "Stacy Testa",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 91,
    "name": "Alexandra Machinist",
    "agency": "ICM Partners",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.icmpartners.com"
  },
  {
    "id": 92,
    "name": "Stephanie Cabot",
    "agency": "The Gernert Company",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://thegernertco.com"
  },
  {
    "id": 93,
    "name": "Seth Fishman",
    "agency": "The Gernert Company",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Science Fiction",
      "Nonfiction"
    ],
    "website": "https://thegernertco.com"
  },
  {
    "id": 94,
    "name": "Rebecca Gradinger",
    "agency": "Fletcher & Company",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://fletcherandco.com"
  },
  {
    "id": 95,
    "name": "Christy Fletcher",
    "agency": "Fletcher & Company",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://fletcherandco.com"
  },
  {
    "id": 96,
    "name": "Molly Jaffa",
    "agency": "Folio Literary Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.foliolit.com"
  },
  {
    "id": 97,
    "name": "John Cusick",
    "agency": "Folio Literary Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.foliolit.com"
  },
  {
    "id": 98,
    "name": "Erin Harris",
    "agency": "Folio Literary Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Memoir",
      "Nonfiction"
    ],
    "website": "https://www.foliolit.com"
  },
  {
    "id": 99,
    "name": "Melissa Edwards",
    "agency": "Stonesong",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Nonfiction"
    ],
    "website": "https://stonesong.com"
  },
  {
    "id": 100,
    "name": "Alison Fargis",
    "agency": "Stonesong",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Cookbooks"
    ],
    "website": "https://stonesong.com"
  },
  {
    "id": 101,
    "name": "Maria Carvainis",
    "agency": "Maria Carvainis Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Mystery/Thriller",
      "Romance"
    ],
    "website": "http://mariacarvainisagency.com"
  },
  {
    "id": 102,
    "name": "Elizabeth Copps",
    "agency": "Maria Carvainis Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Women's Fiction"
    ],
    "website": "http://mariacarvainisagency.com"
  },
  {
    "id": 103,
    "name": "Mark Gottlieb",
    "agency": "Trident Media Group",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Thriller"
    ],
    "website": "https://www.tridentmediagroup.com"
  },
  {
    "id": 104,
    "name": "Ellen Levine",
    "agency": "Trident Media Group",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.tridentmediagroup.com"
  },
  {
    "id": 105,
    "name": "Alyssa Eisner Henkin",
    "agency": "Trident Media Group",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.tridentmediagroup.com"
  },
  {
    "id": 106,
    "name": "Scott Miller",
    "agency": "Trident Media Group",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Thriller",
      "Nonfiction",
      "Commercial Fiction"
    ],
    "website": "https://www.tridentmediagroup.com"
  },
  {
    "id": 107,
    "name": "Dan Lazar",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Young Adult",
      "Nonfiction"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 108,
    "name": "Stephen Barr",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Humor"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 109,
    "name": "Susan Ginsburg",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Thriller",
      "Nonfiction"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 110,
    "name": "Brenda Bowen",
    "agency": "The Book Group",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://thebookgroup.com"
  },
  {
    "id": 111,
    "name": "Julie Barer",
    "agency": "The Book Group",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://thebookgroup.com"
  },
  {
    "id": 112,
    "name": "Faye Bender",
    "agency": "The Book Group",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://thebookgroup.com"
  },
  {
    "id": 113,
    "name": "Catherine Drayton",
    "agency": "InkWell Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Young Adult",
      "Nonfiction"
    ],
    "website": "https://inkwellmanagement.com"
  },
  {
    "id": 114,
    "name": "Richard Pine",
    "agency": "InkWell Management",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://inkwellmanagement.com"
  },
  {
    "id": 115,
    "name": "Elise Capron",
    "agency": "Sandra Dijkstra Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://dijkstraagency.com"
  },
  {
    "id": 116,
    "name": "Andrea Cavallaro",
    "agency": "Sandra Dijkstra Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Science"
    ],
    "website": "https://dijkstraagency.com"
  },
  {
    "id": 117,
    "name": "Jennifer Azantian",
    "agency": "Azantian Literary Agency",
    "location": "Los Angeles, CA",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Science Fiction",
      "Young Adult"
    ],
    "website": "https://azantianlitagency.com"
  },
  {
    "id": 118,
    "name": "Lane Heymont",
    "agency": "The Tobias Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Science Fiction",
      "Thriller"
    ],
    "website": "https://www.thetobiasagency.com"
  },
  {
    "id": 119,
    "name": "Jennifer Wills",
    "agency": "The Seymour Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "Young Adult"
    ],
    "website": "https://www.theseymouragency.com"
  },
  {
    "id": 120,
    "name": "Nicole Resciniti",
    "agency": "The Seymour Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Inspirational"
    ],
    "website": "https://www.theseymouragency.com"
  },
  {
    "id": 121,
    "name": "Lesley Sabga",
    "agency": "The Seymour Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "Thriller"
    ],
    "website": "https://www.theseymouragency.com"
  },
  {
    "id": 122,
    "name": "Julie Stevenson",
    "agency": "The Seymour Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Mystery/Thriller",
      "Romance",
      "Nonfiction"
    ],
    "website": "https://www.theseymouragency.com"
  },
  {
    "id": 123,
    "name": "Tamara Kawar",
    "agency": "DeFiore and Company",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://defioreandco.com"
  },
  {
    "id": 124,
    "name": "Brian DeFiore",
    "agency": "DeFiore and Company",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Commercial Fiction"
    ],
    "website": "https://defioreandco.com"
  },
  {
    "id": 125,
    "name": "Meredith Kaffel Simonoff",
    "agency": "DeFiore and Company",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://defioreandco.com"
  },
  {
    "id": 126,
    "name": "Katie Shea Boutillier",
    "agency": "Donald Maass Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Mystery/Thriller"
    ],
    "website": "https://maassagency.com"
  },
  {
    "id": 127,
    "name": "Kiana Nguyen",
    "agency": "Donald Maass Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Science Fiction",
      "Young Adult"
    ],
    "website": "https://maassagency.com"
  },
  {
    "id": 128,
    "name": "Sam Morgan",
    "agency": "JABberwocky Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Nonfiction"
    ],
    "website": "https://awfulagent.com"
  },
  {
    "id": 129,
    "name": "Valentina Sainato",
    "agency": "JABberwocky Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "Young Adult"
    ],
    "website": "https://awfulagent.com"
  },
  {
    "id": 130,
    "name": "Carly Watters",
    "agency": "P.S. Literary Agency",
    "location": "Toronto, ON",
    "status": "Open",
    "genres": [
      "Women's Fiction",
      "Thriller",
      "Memoir"
    ],
    "website": "https://www.psliterary.com"
  },
  {
    "id": 131,
    "name": "Curtis Russell",
    "agency": "P.S. Literary Agency",
    "location": "Toronto, ON",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.psliterary.com"
  },
  {
    "id": 132,
    "name": "Kurestin Armada",
    "agency": "P.S. Literary Agency",
    "location": "Toronto, ON",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Young Adult"
    ],
    "website": "https://www.psliterary.com"
  },
  {
    "id": 133,
    "name": "Amy Collins",
    "agency": "Talcott Notch Literary",
    "location": "Connecticut",
    "status": "Open",
    "genres": [
      "Romance",
      "Mystery/Thriller",
      "Women's Fiction"
    ],
    "website": "https://talcottnotch.net"
  },
  {
    "id": 134,
    "name": "Gina Panettieri",
    "agency": "Talcott Notch Literary",
    "location": "Connecticut",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Thriller",
      "Science Fiction"
    ],
    "website": "https://talcottnotch.net"
  },
  {
    "id": 135,
    "name": "Saba Sulaiman",
    "agency": "Talcott Notch Literary",
    "location": "Connecticut",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Romance",
      "Young Adult"
    ],
    "website": "https://talcottnotch.net"
  },
  {
    "id": 136,
    "name": "Veronica Park",
    "agency": "Corvisiero Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "Young Adult"
    ],
    "website": "https://www.corvisieroagency.com"
  },
  {
    "id": 137,
    "name": "Saritza Hernandez",
    "agency": "Corvisiero Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "LGBTQ+ Fiction"
    ],
    "website": "https://www.corvisieroagency.com"
  },
  {
    "id": 138,
    "name": "Kortney Price",
    "agency": "Corvisiero Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Nonfiction"
    ],
    "website": "https://www.corvisieroagency.com"
  },
  {
    "id": 139,
    "name": "Leon Husock",
    "agency": "L. Perkins Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Horror"
    ],
    "website": "https://lperkinsagency.com"
  },
  {
    "id": 140,
    "name": "Sandy Lu",
    "agency": "L. Perkins Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Science Fiction",
      "Young Adult"
    ],
    "website": "https://lperkinsagency.com"
  },
  {
    "id": 141,
    "name": "Lori Perkins",
    "agency": "L. Perkins Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Horror",
      "Nonfiction"
    ],
    "website": "https://lperkinsagency.com"
  },
  {
    "id": 142,
    "name": "Ann Leslie Tuttle",
    "agency": "Dystel Goderich & Bourret",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction"
    ],
    "website": "https://www.dystel.com"
  },
  {
    "id": 143,
    "name": "Sharon Pelletier",
    "agency": "Dystel Goderich & Bourret",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Women's Fiction",
      "Memoir"
    ],
    "website": "https://www.dystel.com"
  },
  {
    "id": 144,
    "name": "Erin Young",
    "agency": "Dystel Goderich & Bourret",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://www.dystel.com"
  },
  {
    "id": 145,
    "name": "Clelia Gore",
    "agency": "Martin Literary Management",
    "location": "Seattle, WA",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Self-Help"
    ],
    "website": "https://martinlit.com"
  },
  {
    "id": 146,
    "name": "Sharlene Martin",
    "agency": "Martin Literary Management",
    "location": "Seattle, WA",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "True Crime"
    ],
    "website": "https://martinlit.com"
  },
  {
    "id": 147,
    "name": "Tanusri Prasanna",
    "agency": "Janklow & Nesbit Associates",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://www.janklowandnesbit.com"
  },
  {
    "id": 148,
    "name": "Marya Spence",
    "agency": "Janklow & Nesbit Associates",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.janklowandnesbit.com"
  },
  {
    "id": 149,
    "name": "PJ Mark",
    "agency": "Janklow & Nesbit Associates",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://www.janklowandnesbit.com"
  },
  {
    "id": 150,
    "name": "Adriana Ranta",
    "agency": "Wolf Literary Services",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://wolflit.com"
  },
  {
    "id": 151,
    "name": "Kirsten Wolf",
    "agency": "Wolf Literary Services",
    "location": "New York, NY",
    "status": "Closed",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://wolflit.com"
  },
  {
    "id": 152,
    "name": "Julie Gwinn",
    "agency": "The Seymour Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Inspirational"
    ],
    "website": "https://www.theseymouragency.com"
  },
  {
    "id": 153,
    "name": "Jessica Alvarez",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Mystery/Thriller"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 154,
    "name": "Tracy Marchini",
    "agency": "BookStop Literary Agency",
    "location": "California",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.bookstopliterary.com"
  },
  {
    "id": 155,
    "name": "Chris Bucci",
    "agency": "Aevitas Creative Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Thriller"
    ],
    "website": "https://aevitascreative.com"
  },
  {
    "id": 156,
    "name": "David Granger",
    "agency": "Aevitas Creative Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Business"
    ],
    "website": "https://aevitascreative.com"
  },
  {
    "id": 157,
    "name": "Laura Nolan",
    "agency": "Aevitas Creative Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Thriller",
      "Nonfiction"
    ],
    "website": "https://aevitascreative.com"
  },
  {
    "id": 158,
    "name": "Erin Files",
    "agency": "Aevitas Creative Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://aevitascreative.com"
  },
  {
    "id": 159,
    "name": "Rick Richter",
    "agency": "Aevitas Creative Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://aevitascreative.com"
  },
  {
    "id": 160,
    "name": "David Fugate",
    "agency": "LaunchBooks Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Nonfiction",
      "Technology"
    ],
    "website": "http://www.launchbooks.com"
  },
  {
    "id": 161,
    "name": "Eddie Schneider",
    "agency": "JABberwocky Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Science Fiction",
      "Young Adult"
    ],
    "website": "https://awfulagent.com"
  },
  {
    "id": 162,
    "name": "Hannah Bowman",
    "agency": "Liza Dawson Associates",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Science Fiction",
      "Fantasy",
      "Literary Fiction"
    ],
    "website": "https://www.lizadawsonassociates.com"
  },
  {
    "id": 163,
    "name": "Jennifer Johnson-Blalock",
    "agency": "Liza Dawson Associates",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Mystery/Thriller",
      "Women's Fiction",
      "Nonfiction"
    ],
    "website": "https://www.lizadawsonassociates.com"
  },
  {
    "id": 164,
    "name": "Rachel Ekstrom Courage",
    "agency": "Irene Goodman Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Women's Fiction",
      "Romance",
      "Nonfiction"
    ],
    "website": "https://irenegoodman.com"
  },
  {
    "id": 165,
    "name": "Kim Lionetti",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Nonfiction"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 166,
    "name": "John Rudolph",
    "agency": "Dystel Goderich & Bourret",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.dystel.com"
  },
  {
    "id": 167,
    "name": "Roz Foster",
    "agency": "Sandra Dijkstra Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Fantasy",
      "Literary Fiction"
    ],
    "website": "https://dijkstraagency.com"
  },
  {
    "id": 168,
    "name": "Jessica Regel",
    "agency": "Helm Literary",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Young Adult"
    ],
    "website": "https://helmliterary.com"
  },
  {
    "id": 169,
    "name": "Aimee Ashcraft",
    "agency": "Brower Literary & Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Romance",
      "Women's Fiction"
    ],
    "website": "https://browerliterary.com"
  },
  {
    "id": 170,
    "name": "Mary C. Moore",
    "agency": "Kimberley Cameron & Associates",
    "location": "Tiburon, CA",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Women's Fiction",
      "Memoir"
    ],
    "website": "https://kimberleycameron.com"
  },
  {
    "id": 171,
    "name": "Kimberley Cameron",
    "agency": "Kimberley Cameron & Associates",
    "location": "Tiburon, CA",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Mystery/Thriller",
      "Memoir"
    ],
    "website": "https://kimberleycameron.com"
  },
  {
    "id": 172,
    "name": "Elizabeth Bewley",
    "agency": "Sterling Lord Literistic",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.sll.com"
  },
  {
    "id": 173,
    "name": "Danielle Chiotti",
    "agency": "Upstart Crow Literary",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://www.upstartcrowliterary.com"
  },
  {
    "id": 174,
    "name": "Michael Steger",
    "agency": "Upstart Crow Literary",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.upstartcrowliterary.com"
  },
  {
    "id": 175,
    "name": "Kayla Lightner",
    "agency": "Upstart Crow Literary",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Fantasy",
      "Romance"
    ],
    "website": "https://www.upstartcrowliterary.com"
  },
  {
    "id": 176,
    "name": "Kathleen Rushall",
    "agency": "Andrea Brown Literary Agency",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.andreabrownlit.com"
  },
  {
    "id": 177,
    "name": "Lara Perkins",
    "agency": "Andrea Brown Literary Agency",
    "location": "San Francisco, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://www.andreabrownlit.com"
  },
  {
    "id": 178,
    "name": "Claire Draper",
    "agency": "InkWell Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://inkwellmanagement.com"
  },
  {
    "id": 179,
    "name": "Nathaniel Jacks",
    "agency": "InkWell Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://inkwellmanagement.com"
  },
  {
    "id": 180,
    "name": "Elana Roth Parker",
    "agency": "Laura Dail Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Fantasy"
    ],
    "website": "http://www.ldlainc.com"
  },
  {
    "id": 181,
    "name": "Laura Dail",
    "agency": "Laura Dail Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Historical Fiction",
      "Thriller"
    ],
    "website": "http://www.ldlainc.com"
  },
  {
    "id": 182,
    "name": "Tamar Rydzinski",
    "agency": "Laura Dail Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Young Adult"
    ],
    "website": "http://www.ldlainc.com"
  },
  {
    "id": 183,
    "name": "Priya Doraswamy",
    "agency": "Lotus Lane Literary",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Translation"
    ],
    "website": "https://www.lotuslit.com/"
  },
  {
    "id": 184,
    "name": "Jennifer De Chiara",
    "agency": "The Jennifer De Chiara Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "http://www.jdlit.com/"
  },
  {
    "id": 185,
    "name": "Savannah Brooks",
    "agency": "The Jennifer De Chiara Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Romance",
      "Young Adult",
      "Fantasy"
    ],
    "website": "http://www.jdlit.com/"
  },
  {
    "id": 186,
    "name": "Victoria Doherty-Munro",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Romance"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 187,
    "name": "Soumeya Roberts",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 188,
    "name": "Amelia Appel",
    "agency": "McIntosh & Otis",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Young Adult",
      "Nonfiction"
    ],
    "website": "https://mcintoshandotis.com/"
  },
  {
    "id": 189,
    "name": "Christa Heschke",
    "agency": "McIntosh & Otis",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://mcintoshandotis.com/"
  },
  {
    "id": 190,
    "name": "Eugene Kim",
    "agency": "McIntosh & Otis",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Thriller"
    ],
    "website": "https://mcintoshandotis.com/"
  },
  {
    "id": 191,
    "name": "Danielle Barthel",
    "agency": "New Leaf Literary & Media",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Romance",
      "Fantasy"
    ],
    "website": "https://www.newleafliterary.com"
  },
  {
    "id": 192,
    "name": "Jordan Hamessley",
    "agency": "New Leaf Literary & Media",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Middle Grade",
      "Young Adult",
      "Picture Books"
    ],
    "website": "https://www.newleafliterary.com"
  },
  {
    "id": 193,
    "name": "Kelvin Kong",
    "agency": "New Leaf Literary & Media",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Science Fiction",
      "Young Adult"
    ],
    "website": "https://www.newleafliterary.com"
  },
  {
    "id": 194,
    "name": "Patrice Caldwell",
    "agency": "New Leaf Literary & Media",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Fantasy",
      "Literary Fiction"
    ],
    "website": "https://www.newleafliterary.com"
  },
  {
    "id": 195,
    "name": "Hilary Harwell",
    "agency": "KT Literary",
    "location": "Denver, CO",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://ktliterary.com"
  },
  {
    "id": 196,
    "name": "Aida Herrera",
    "agency": "Root Literary",
    "location": "Los Angeles, CA",
    "status": "Open",
    "genres": [
      "Romance",
      "Young Adult",
      "Women's Fiction"
    ],
    "website": "https://rootliterary.com"
  },
  {
    "id": 197,
    "name": "Taylor Haggerty",
    "agency": "Root Literary",
    "location": "Los Angeles, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Romance",
      "Fantasy"
    ],
    "website": "https://rootliterary.com"
  },
  {
    "id": 198,
    "name": "Melanie Castillo",
    "agency": "Root Literary",
    "location": "Los Angeles, CA",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Young Adult"
    ],
    "website": "https://rootliterary.com"
  },
  {
    "id": 199,
    "name": "Heather Alexander",
    "agency": "Pippin Properties",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://pippinproperties.com"
  },
  {
    "id": 200,
    "name": "Sara Crowe",
    "agency": "Pippin Properties",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://pippinproperties.com"
  },
  {
    "id": 201,
    "name": "Ashley Lopez",
    "agency": "Waxman Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://waxmanagency.com"
  },
  {
    "id": 202,
    "name": "Fleetwood Robbins",
    "agency": "Janklow & Nesbit Associates",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Fantasy",
      "Horror"
    ],
    "website": "https://www.janklowandnesbit.com"
  },
  {
    "id": 203,
    "name": "Tina Wexler",
    "agency": "ICM Partners",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.icmpartners.com"
  },
  {
    "id": 204,
    "name": "Peter Steinberg",
    "agency": "Foundry Literary + Media",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Business"
    ],
    "website": "https://www.foundrymedia.com"
  },
  {
    "id": 205,
    "name": "Brandi Bowles",
    "agency": "Foundry Literary + Media",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Pop Culture"
    ],
    "website": "https://www.foundrymedia.com"
  },
  {
    "id": 206,
    "name": "Adriann Ranta Zurhellen",
    "agency": "Foundry Literary + Media",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.foundrymedia.com"
  },
  {
    "id": 207,
    "name": "Michael Nardullo",
    "agency": "Foundry Literary + Media",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Thriller",
      "Horror",
      "Science Fiction"
    ],
    "website": "https://www.foundrymedia.com"
  },
  {
    "id": 208,
    "name": "Hannah Mann",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Fantasy"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 209,
    "name": "Alexandra Levick",
    "agency": "Writers House",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Young Adult"
    ],
    "website": "https://www.writershouse.com"
  },
  {
    "id": 210,
    "name": "Chelsea Eberly",
    "agency": "Greenhouse Literary Agency",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade"
    ],
    "website": "https://www.greenhouseliterary.com"
  },
  {
    "id": 211,
    "name": "Stefanie Von Borstel",
    "agency": "Full Circle Literary",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.fullcircleliterary.com"
  },
  {
    "id": 212,
    "name": "Adriana Dominguez",
    "agency": "Full Circle Literary",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Picture Books"
    ],
    "website": "https://www.fullcircleliterary.com"
  },
  {
    "id": 213,
    "name": "Taylor Martindale Kean",
    "agency": "Full Circle Literary",
    "location": "San Diego, CA",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Middle Grade",
      "Nonfiction"
    ],
    "website": "https://www.fullcircleliterary.com"
  },
  {
    "id": 214,
    "name": "Annie Hwang",
    "agency": "Folio Literary Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.foliolit.com"
  },
  {
    "id": 215,
    "name": "Melissa Sarver White",
    "agency": "Folio Literary Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Fantasy",
      "Young Adult"
    ],
    "website": "https://www.foliolit.com"
  },
  {
    "id": 216,
    "name": "Jeff Kleinman",
    "agency": "Folio Literary Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction",
      "Memoir"
    ],
    "website": "https://www.foliolit.com"
  },
  {
    "id": 217,
    "name": "Jamie Chambliss",
    "agency": "Folio Literary Management",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://www.foliolit.com"
  },
  {
    "id": 218,
    "name": "Emily Forney",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Young Adult"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 219,
    "name": "Natascha Morris",
    "agency": "BookEnds Literary Agency",
    "location": "New Jersey",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "Mystery/Thriller"
    ],
    "website": "https://bookendsliterary.com"
  },
  {
    "id": 220,
    "name": "Jennie Kendrick",
    "agency": "The Knight Agency",
    "location": "Atlanta, GA",
    "status": "Open",
    "genres": [
      "Romance",
      "Fantasy",
      "Young Adult"
    ],
    "website": "https://knightagency.net"
  },
  {
    "id": 221,
    "name": "Pamela Harty",
    "agency": "The Knight Agency",
    "location": "Atlanta, GA",
    "status": "Open",
    "genres": [
      "Romance",
      "Women's Fiction",
      "Nonfiction"
    ],
    "website": "https://knightagency.net"
  },
  {
    "id": 222,
    "name": "Janna Bonikowski",
    "agency": "The Knight Agency",
    "location": "Atlanta, GA",
    "status": "Open",
    "genres": [
      "Fantasy",
      "Science Fiction",
      "Horror"
    ],
    "website": "https://knightagency.net"
  },
  {
    "id": 223,
    "name": "Lana Popovic",
    "agency": "Chalberg & Sussman",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Young Adult",
      "Fantasy",
      "Literary Fiction"
    ],
    "website": "https://chalbergandsussman.com"
  },
  {
    "id": 224,
    "name": "Rachel Sussman",
    "agency": "Chalberg & Sussman",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Nonfiction",
      "Memoir",
      "Lifestyle"
    ],
    "website": "https://chalbergandsussman.com"
  },
  {
    "id": 225,
    "name": "Terra Chalberg",
    "agency": "Chalberg & Sussman",
    "location": "New York, NY",
    "status": "Open",
    "genres": [
      "Literary Fiction",
      "Nonfiction"
    ],
    "website": "https://chalbergandsussman.com"
  }
];
