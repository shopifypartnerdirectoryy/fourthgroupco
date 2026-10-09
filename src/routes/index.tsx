import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, ExternalLink, Feather, Film, Globe2, Library, MessageCircle, Quote, Search, Star, Users } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ClaimArticleDialog } from "@/components/claim-article-dialog";
import { AuthorSpotlightForm } from "@/components/author-spotlight-form";
import { WeeklySpotlights } from "@/components/weekly-spotlights";
import { COUNTS, TOTAL_OPPORTUNITIES } from "@/data/directory-counts";
import { SITE } from "@/data/site";
import heroDesk from "@/assets/hero-desk.jpg";
import earlyMornings from "@/assets/early-mornings-with-dick.jpg";
import socratesDog from "@/assets/blame-it-on-socrates-dog.jpg";
import proudAmerican from "@/assets/proud-american.jpg";
import socratesPortrait from "@/assets/blame-it-on-socrates-portrait.jpg";
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

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/" }],
    meta: [
      { title: "Fourth Group & Co — A Global Literary Community" },
      { name: "description", content: "A global literary community with curated opportunities, practical resources and meaningful visibility for writers." },
      { property: "og:title", content: "Fourth Group & Co — A Global Literary Community" },
      { property: "og:description", content: "Publishing research, editorial attention, and literary community for writers moving their work forward." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/" },
    ],
  }),
  component: Index,
});

const books = [
  {
    title: 'Early Mornings with “Dick”', author: "Jack Ryan", format: "Hardcover", rating: "5.0 · 1 review", image: earlyMornings,
    description: "A compelling historical novel following a Georgetown law student whose private breakfasts with President Richard Nixon reshape his understanding of leadership, truth, and public service.",
    link: "https://www.amazon.com/Early-Mornings-Dick-Jack-Ryan/dp/1808570472?ref_=ast_author_dp&th=1&psc=1",
    tag: "Historical fiction",
  },
  {
    title: "Blame It on Socrates", author: "Jack Ryan", format: "Kindle Edition", rating: "5.0 · 7 reviews", image: socratesDog,
    description: "Professor Patrick Dolan returns to the turbulent 1960s after a long-lost letter forces him to examine the ideals, friendships, and unfinished choices that shaped his life.",
    link: "https://www.amazon.com/BLAME-SOCRATES-Jack-Ryan-ebook/dp/B0F2SJZY24?ref_=ast_author_mpb",
    tag: "Literary fiction",
  },
  {
    title: "Proud American", author: "Sergio A. Tinoco", format: "Kindle Edition", rating: "5.0 · 2 reviews", image: proudAmerican,
    description: "A remarkable true story of a South Texas migrant worker who became a soldier and federal agent—a testament to service, sacrifice, faith, and Hispanic American pride.",
    link: "https://www.amazon.com/Proud-American-Migrant-Soldier-Agent-ebook/dp/B0H1348M12?ref_=ast_author_mpb",
    tag: "Memoir",
  },
  {
    title: "Blame It on Socrates", author: "Jack Ryan", format: "Kindle Edition", rating: "Available now", image: socratesPortrait,
    description: "A witty, reflective campus novel about philosophy, nostalgia, and the weight of unfinished business, bridging the unrest of the 1960s with one professor’s present reckoning.",
    link: "https://www.amazon.com/Blame-Socrates-Jack-Ryan-ebook/dp/B0H52YRPRN?ref_=ast_author_dp_rw&th=1&psc=1&dib=eyJ2IjoiMSJ9.u1utHiXMTiQYN4uTXaOEO-6QZcSvcAAPOGQi5Z5D5tTGjHj071QN20LucGBJIEps.FSSTeA2ssfah_Ond7-IMcFadEcuP-dxey0rosAK0tKI&dib_tag=AUTHOR",
    tag: "Campus novel",
  },
  {
    title: "Stjarna's Stars", author: "Patricia Squire", format: "Hardcover", rating: "Available now", image: stjarnasStars,
    description: "An illustrated story of a young girl, winter skies, and the wonder of following the stars.",
    link: "https://www.amazon.com/Stjarnas-Stars-Patricia-Squire/dp/1039192289",
    tag: "Children's fantasy",
  },
  {
    title: "Shattered by Love", author: "Michael Knapp \u00b7 ed. Patricia Fancher", format: "Kindle Edition", rating: "Available now", image: shatteredByLove,
    description: "A heartfelt story of romance, joy, and heartache across a life shaped by family and service.",
    link: "https://www.amazon.com/Shattered-Love-carousel-romance-heartache-ebook/dp/B0CNKYDB52?ref_=ast_author_mpb",
    tag: "Romance",
  },
  {
    title: "A Girl with a Bad Reputation", author: "Dave Gioia", format: "Kindle Edition", rating: "Available now", image: girlBadReputation,
    description: "A sharp, emotional novel about rumour, judgement, and a young woman reclaiming her own story.",
    link: "https://www.amazon.com/Girl-Bad-Reputation-Dave-Gioia-ebook/dp/B0F45YJJHN?ref_=ast_author_mpb",
    tag: "Fiction",
  },
  {
    title: "Lucrecia: Memoir of a Manic Woman", author: "Jamie Goudeau", format: "Paperback", rating: "Available now", image: lucrecia,
    description: "A candid memoir of living with mania, resilience, and the long search for wholeness.",
    link: "https://www.amazon.com/Lucrecia-Memoir-Manic-Jamie-Goudeau/dp/B0H639GLNQ",
    tag: "Memoir",
  },
  {
    title: "Reflections for the Twenty-First Century", author: "Jean Pi Lee", format: "Paperback", rating: "Available now", image: reflections,
    description: "Thoughtful essays on a changing world, from global shifts to the personal questions of modern life.",
    link: "https://www.amazon.com/Reflections-Twenty-First-Century-Jean-Lee/dp/1039151930",
    tag: "Essays",
  },
  {
    title: "SuperPower: The Ability to Fly or to Become Invisible", author: "Roger E. Pedersen", format: "Kindle Edition", rating: "Available now", image: superpower,
    description: "Book 4 of In Ashes, Phoenix Eagles Shall Rise \u2014 where extraordinary abilities carry extraordinary consequences.",
    link: "https://www.amazon.com/SuperPower-Ability-Become-Invisible-Phoenix-ebook/dp/B0DFBXKY2C",
    tag: "Science fiction",
  },
  {
    title: "Finish the Race", author: "Jon Waller", format: "Hardcover", rating: "Available now", image: finishTheRace,
    description: "An energetic story of endurance and determination, where crossing the line means more than winning.",
    link: "https://www.amazon.com/Finish-Race-Jon-Waller/dp/B0H1P1D7PM",
    tag: "Sports fiction",
  },
  {
    title: "Gunfighters, Thieves and Lawmen", author: "David Milton McGowan \u00b7 illus. Samantha Singer", format: "Kindle Edition", rating: "Available now", image: gunfighters,
    description: "Frontier tales of outlaws, lawmen, and the hard choices of the open range.",
    link: "https://www.amazon.com/Gunfighters-Thieves-Lawmen-Milton-McGowan-ebook/dp/B08DNHKVVV",
    tag: "Western",
  },
  {
    title: "Boundaries", author: "David M. McGowan", format: "Kindle Edition", rating: "Available now", image: boundaries,
    description: "A Western of ranch country, loyalty, and the lines people draw \u2014 and cross.",
    link: "https://www.amazon.com/Boundaries-David-M-McGowan-ebook/dp/B0CRMWVRLW",
    tag: "Western",
  },
  {
    title: "Egypt Under the Stars", author: "Ev Cochrane", format: "Kindle Edition", rating: "Available now", image: egyptStars,
    description: "A scholarly exploration of astral religion and cosmogonic myth in ancient Egypt.",
    link: "https://www.amazon.co.uk/Egypt-Under-Stars-Religion-Cosmogonic-ebook/dp/B0GH3HPFL8",
    tag: "History & myth",
  },
] as const;

const memberVoices = [
  { quote: "Spend less time searching and more time submitting to opportunities that genuinely fit your work.", name: "Opportunity research", craft: "Clear, current, practical" },
  { quote: "Share work in a considered literary setting built for conversation rather than noise.", name: "Writer community", craft: "Thoughtful, generous, focused" },
  { quote: "Describe the heart of your book with confidence when approaching readers and screen professionals.", name: "Story development", craft: "Purposeful, precise, compelling" },
] as const;

const prompts = [
  { title: "The Room After Everyone Leaves", form: "Fiction", note: "Begin with what remains on the table, then let one object reveal what no one said aloud." },
  { title: "A Map Drawn From Memory", form: "Poetry", note: "Trace a familiar place without naming its streets. Let sound and scent establish the borders." },
  { title: "The Letter That Arrived Twice", form: "Memoir", note: "Write about news you understood differently the second time you received it." },
] as const;

const journal = [
  { title: "How to shape a compelling author announcement", label: "Editorial practice", body: "A practical guide to finding the human story inside a launch, award, or publication milestone." },
  { title: "What literary editors notice in the opening page", label: "Publishing insight", body: "Clarity, movement, and a confident point of view matter long before a submission reaches its final paragraph." },
  { title: "Five questions to ask before pitching an adaptation", label: "Screen stories", body: "Identify the visual engine, central conflict, audience, and emotional promise at the heart of your book." },
] as const;

const events = [
  { date: "Soon", title: "Opening Pages: Live Editorial Session", type: "Planned online workshop" },
  { date: "Soon", title: "Writing History Without Losing the Story", type: "Planned author conversation" },
  { date: "Soon", title: "From Book Premise to Screen Pitch", type: "Planned virtual panel" },
] as const;

const writerTools = [
  { icon: Search, label: "Find Opportunities", detail: `${COUNTS.grants} grants · ${COUNTS.contests} contests · ${COUNTS.residencies} residencies`, to: "/grants-awards" },
  { icon: Library, label: "Publish Your Writing", detail: `${COUNTS.magazines} magazines · ${COUNTS.presses} presses · ${COUNTS.agents} agents`, to: "/literary-magazines" },
  { icon: Film, label: "Pitch for the Screen", detail: "Put your story before producers", to: "/movie-adaptation" },
  { icon: Users, label: "Meet the Community", detail: `${COUNTS.authors} authors in the directory`, to: "/directory" },
  { icon: Feather, label: "Strengthen Your Craft", detail: "Prompts, practice and support", to: "/writing-prompts" },
] as const;

function Index() {
  return (
    <PageShell>
      <section className="relative bg-secondary text-secondary-foreground">
        <div className="mx-auto flex min-h-[500px] max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-16 text-center md:py-24">
          <div className="inline-flex items-center rounded-full border border-primary/40 px-5 py-2 text-xs font-semibold">
            Annual Membership — ${SITE.membership}/year
          </div>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.08] md:text-7xl">
            Make Space for the Work<br /><span className="text-primary">Only You Can Write</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-secondary-foreground/75 md:text-lg">
            Fourth Group &amp; Co brings practical publishing research, generous editorial attention, and meaningful introductions together for writers moving their work forward.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="h-12 rounded-md px-8 font-semibold">
              <Link to="/membership">Join for ${SITE.membership}/year <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      <ClaimArticleDialog autoOpenOnScroll hideTrigger />

      <WeeklySpotlights fallback={{
        book: { title: "Early Mornings with “Dick”", creator_name: "Jack Ryan", specialty: "Memoir · Humour", description: "Our editors' pick this week: a warm, wry book about the small rituals that hold a life together — the kind of read you finish and immediately recommend.", image_url: earlyMornings, link_url: "https://www.amazon.com/Early-Mornings-Dick-Jack-Ryan/dp/1808570472" },
        creative: { title: "Stjarna's Stars", creator_name: "Patricia Squire", specialty: "Author · Storyteller", description: "This week we celebrate Patricia Squire, whose imaginative storytelling and care for young readers make her a creative voice worth following.", image_url: stjarnasStars, link_url: "https://www.amazon.com/Stjarnas-Stars-Patricia-Squire/dp/1039192289" },
      }} />

      <section className="border-b border-border bg-accent/35">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-primary">Author Spotlight</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">We Write About Your Work — At No Cost</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">Have a new book launch, award, or publication milestone? Submit your details, and our editorial team will write a featured post for our literary network.</p>
            <p className="mt-4 text-xs text-muted-foreground">Every request is reviewed by an editor. Nothing is published without your approval.</p>
          </div>
          <AuthorSpotlightForm />
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1.25fr_.75fr] md:items-stretch">
          <article className="relative min-h-[380px] overflow-hidden rounded-md">
            <img src={heroDesk} alt="A writer working at a desk" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-secondary/70" />
            <div className="relative flex min-h-[380px] flex-col justify-end p-7 text-secondary-foreground md:p-10">
              <p className="text-xs font-semibold uppercase text-primary">Literary News</p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight md:text-4xl">The stories, milestones, and ideas shaping our writing community</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-secondary-foreground/75">Read author interviews, publishing insights, new-release features, and thoughtful coverage from across the literary world.</p>
              <Button asChild variant="link" className="mt-4 h-auto w-fit p-0 text-primary"><Link to="/news">Explore the latest stories <ArrowRight /></Link></Button>
            </div>
          </article>
          <div className="border-y border-border py-7 md:border-y-0 md:border-l md:py-8 md:pl-9">
            <p className="text-xs font-semibold uppercase text-primary">This Week’s Prompt</p>
            <h2 className="mt-4 font-serif text-3xl">What the House Remembers</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Write about a room you have not entered in years. Let the objects speak before the people do, and end on a sound rather than an image.</p>
            <Button asChild variant="outline" className="mt-7 rounded-none"><Link to="/writing-prompts">Start writing <ArrowRight /></Link></Button>
            <div className="mt-10 border-t border-border pt-8">
              <p className="font-serif text-5xl text-primary">{TOTAL_OPPORTUNITIES.toLocaleString()}</p>
              <p className="mt-2 text-xs font-semibold uppercase text-muted-foreground">Magazines, presses, agents, grants, contests and residencies listed today</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/45">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="text-center"><p className="text-xs font-semibold uppercase text-primary">The Fourth Group Desk</p><h2 className="mt-3 font-serif text-3xl">Five ways to move a manuscript forward</h2></div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {writerTools.map(({ icon: Icon, label, detail, to }) => (
              <Link key={label} to={to} className="group bg-card p-6 text-center transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Icon className="mx-auto size-5 text-primary" /><h3 className="mt-4 font-serif text-lg">{label}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center"><p className="text-xs font-semibold uppercase text-primary">On Our Reading Table</p><h2 className="mt-3 font-serif text-4xl">Books worth meeting</h2><p className="mx-auto mt-3 max-w-2xl text-sm text-secondary-foreground/65">A Fourth Group &amp; Co selection of history, memoir, literary fiction, and stories of public life.</p></div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <article key={`${book.title}-${book.image}`} className="flex min-w-0 flex-col">
                <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm bg-background/5 p-3"><img src={book.image} alt={`${book.title} book cover`} className="max-h-full max-w-full object-contain shadow-xl" /></div>
                <p className="mt-5 text-[10px] font-semibold uppercase text-primary">{book.tag}</p>
                <h3 className="mt-2 font-serif text-xl leading-tight">{book.title}</h3><p className="mt-1 text-xs text-secondary-foreground/60">by {book.author} · {book.format}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-primary"><span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-current" />)}</span><span>{book.rating}</span></div>
                <p className="mt-4 line-clamp-4 text-xs leading-relaxed text-secondary-foreground/65">{book.description}</p>
                <Button asChild variant="link" className="mt-auto h-auto w-fit px-0 pt-5 text-primary"><a href={book.link} target="_blank" rel="noopener noreferrer">View on Amazon <ExternalLink /></a></Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase text-primary">From the Fourth Group Shelf</p><h2 className="mt-3 font-serif text-4xl">Titles currently in conversation</h2></div><Button asChild variant="outline" className="w-fit rounded-none"><Link to="/news">Browse editorial coverage <ArrowRight /></Link></Button></div>
          <div className="mt-10 grid gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => <article key={`spotlight-${book.image}`} className="flex items-center gap-4 bg-background py-5 pr-4 sm:p-5"><img src={book.image} alt="" className="h-24 w-16 shrink-0 object-contain" /><div><p className="text-[10px] font-semibold uppercase text-primary">Reader spotlight</p><h3 className="mt-2 font-serif leading-tight">{book.title}</h3><p className="mt-1 text-xs text-muted-foreground">{book.author}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-accent/35">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[.85fr_1.15fr] md:items-center">
          <div className="grid grid-cols-2 gap-3"><img src={socratesDog} alt="Illustrated book cover artwork" className="aspect-[3/4] w-full object-cover" /><img src={socratesPortrait} alt="Painted portrait book cover artwork" className="mt-8 aspect-[3/4] w-full object-cover" /></div>
          <div><p className="text-xs font-semibold uppercase text-primary">Cover Craft</p><h2 className="mt-3 font-serif text-4xl">The first conversation with a reader</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Portrait, lettering, colour, and atmosphere all begin telling the story before a book is opened. We look closely at the visual choices that invite readers in.</p><Button asChild variant="outline" className="mt-7 rounded-none"><Link to="/author-services">Explore creative support <ArrowRight /></Link></Button></div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20"><p className="text-xs font-semibold uppercase text-primary">Stories Looking for the Screen</p><h2 className="mt-3 font-serif text-4xl">Books with cinematic possibility</h2><p className="mt-3 max-w-2xl text-sm text-muted-foreground">Character-led stories, historical turning points, and extraordinary real lives ready to be discovered by screen professionals.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{books.slice(0, 3).map((book) => <article key={`screen-${book.image}`} className="grid grid-cols-[110px_1fr] gap-5 border-t border-border pt-5"><img src={book.image} alt="" className="h-40 w-[110px] object-contain" /><div><Film className="size-4 text-primary" /><h3 className="mt-3 font-serif text-lg leading-tight">{book.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{book.description}</p></div></article>)}</div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/45"><div className="mx-auto max-w-6xl px-5 py-16"><div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase text-primary">Featured Members</p><h2 className="mt-3 font-serif text-3xl">Writers in our community</h2></div><Link to="/directory" className="text-sm font-semibold text-primary">View directory</Link></div><div className="mt-9 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{[{n:"Jack Ryan",r:"Historical & literary fiction",i:"JR"},{n:"Sergio A. Tinoco",r:"Memoir & military history",i:"ST"},{n:"Patricia Squire",r:"Children's fantasy",i:"PS"},{n:"D.M. McGowan",r:"Westerns",i:"DM"}].map((member)=><article key={member.n} className="bg-card p-6 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary font-serif text-secondary-foreground">{member.i}</span><h3 className="mt-4 font-serif text-lg">{member.n}</h3><p className="mt-1 text-xs text-muted-foreground">{member.r}</p></article>)}</div></div></section>

      <section className="bg-background"><div className="mx-auto max-w-6xl px-5 py-20"><div className="text-center"><p className="text-xs font-semibold uppercase text-primary">Built Around the Work</p><h2 className="mt-3 font-serif text-4xl">What membership makes possible</h2></div><div className="mt-10 grid gap-6 md:grid-cols-3">{memberVoices.map((voice)=><article key={voice.name} className="border-t-2 border-primary bg-card px-6 py-7 shadow-sm"><Quote className="size-5 text-primary"/><p className="mt-5 font-serif text-xl leading-relaxed">{voice.quote}</p><div className="mt-6 text-xs"><span className="font-semibold text-foreground">{voice.name}</span><span className="mt-1 block text-muted-foreground">{voice.craft}</span></div></article>)}</div></div></section>

      <section className="border-y border-border bg-accent/35"><div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-semibold uppercase text-primary">Author Conversation</p><h2 className="mt-3 font-serif text-4xl">History, memory, and the private rooms of public life</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Jack Ryan’s novels return to defining political moments through characters still deciding what duty means. Our conversations with authors look beyond the synopsis to the questions that keep a book alive.</p><Button asChild variant="outline" className="mt-7 rounded-none"><Link to="/news">Read author conversations <MessageCircle/><ArrowRight/></Link></Button></div><div className="grid grid-cols-[100px_1fr] gap-6 border-l border-border pl-6 sm:grid-cols-[150px_1fr]"><img src={earlyMornings} alt="Early Mornings with Dick book cover" className="w-full object-contain"/><div><p className="text-xs font-semibold uppercase text-primary">In focus</p><h3 className="mt-3 font-serif text-2xl">Early Mornings with “Dick”</h3><p className="mt-2 text-sm text-muted-foreground">Jack Ryan · Historical fiction</p><p className="mt-5 text-sm leading-relaxed text-muted-foreground">A young law student’s unexpected conversations with President Nixon become a lens on ambition, unrest, and public service.</p></div></div></div></section>

      <section className="bg-background"><div className="mx-auto max-w-6xl px-5 py-20"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase text-primary">A Place to Begin</p><h2 className="mt-3 font-serif text-4xl">Three prompts for the blank page</h2></div><Button asChild variant="outline" className="w-fit rounded-none"><Link to="/writing-prompts">See the prompt library <ArrowRight/></Link></Button></div><div className="mt-10 grid gap-px border-y border-border bg-border md:grid-cols-3">{prompts.map((prompt,index)=><article key={prompt.title} className="bg-background p-7"><span className="font-serif text-4xl text-primary/50">0{index+1}</span><p className="mt-6 text-[10px] font-semibold uppercase text-primary">{prompt.form}</p><h3 className="mt-2 font-serif text-xl">{prompt.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{prompt.note}</p></article>)}</div></div></section>

      <section className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-6xl px-5 py-20"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase text-primary">Fourth Group Journal</p><h2 className="mt-3 font-serif text-4xl">Notes for a writing life</h2></div><Link to="/news" className="text-sm font-semibold text-primary">All journal entries</Link></div><div className="mt-10 grid gap-8 md:grid-cols-3">{journal.map((item)=><article key={item.title} className="border-t border-secondary-foreground/25 pt-6"><p className="text-[10px] font-semibold uppercase text-primary">{item.label}</p><h3 className="mt-3 font-serif text-2xl leading-tight">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-secondary-foreground/65">{item.body}</p><Link to="/news" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary">Continue reading <ArrowRight className="size-3"/></Link></article>)}</div></div></section>

      <section className="bg-background"><div className="mx-auto max-w-6xl px-5 py-20"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div><p className="text-xs font-semibold uppercase text-primary">Coming to the Programme</p><h2 className="mt-3 font-serif text-4xl">Gatherings for curious writers</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">These planned formats will bring authors, editors, and fellow writers together for focused conversation and practical learning. Dates will be announced.</p><Button asChild variant="outline" className="mt-7 rounded-none"><Link to="/events">Visit the events page <CalendarDays/></Link></Button></div><div className="divide-y divide-border border-y border-border">{events.map((event)=><article key={event.title} className="grid grid-cols-[68px_1fr] gap-5 py-6"><p className="font-serif text-lg leading-tight text-primary">{event.date}</p><div><p className="text-[10px] font-semibold uppercase text-muted-foreground">{event.type}</p><h3 className="mt-2 font-serif text-xl">{event.title}</h3></div></article>)}</div></div></div></section>

      <section className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-3xl px-5 py-16 text-center"><Globe2 className="mx-auto size-6 text-primary" /><h2 className="mt-4 font-serif text-3xl">Your next chapter deserves good company</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-secondary-foreground/65">Come for the research. Stay for the conversations, shared knowledge, and steady encouragement that help serious work find its readers.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild size="lg" className="rounded-none"><Link to="/membership">Become a member — ${SITE.membership}/year <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground"><Link to="/events"><CalendarDays /> Browse gatherings</Link></Button></div><p className="mt-5 text-xs text-secondary-foreground/50">One annual membership. No tiers or hidden charges.</p></div></section>
    </PageShell>
  );
}