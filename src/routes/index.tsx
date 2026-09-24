import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, ExternalLink, Feather, Film, Globe2, Library, Search, Star, Users } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ClaimArticleDialog } from "@/components/claim-article-dialog";
import { SITE } from "@/data/site";
import heroDesk from "@/assets/hero-desk.jpg";
import earlyMornings from "@/assets/early-mornings-with-dick.jpg.asset.json";
import socratesDog from "@/assets/blame-it-on-socrates-dog.jpg.asset.json";
import proudAmerican from "@/assets/proud-american.jpg.asset.json";
import socratesPortrait from "@/assets/blame-it-on-socrates-portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fourth Group & Co — A Global Literary Community" },
      { name: "description", content: "A global literary community with curated opportunities, practical resources and meaningful visibility for writers." },
      { property: "og:title", content: "Fourth Group & Co — A Global Literary Community" },
      { property: "og:description", content: "Where serious writers build their careers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const books = [
  {
    title: 'Early Mornings with “Dick”', author: "Jack Ryan", format: "Hardcover", rating: "5.0 · 1 review", image: earlyMornings.url,
    description: "A compelling historical novel following a Georgetown law student whose private breakfasts with President Richard Nixon reshape his understanding of leadership, truth, and public service.",
    link: "https://www.amazon.com/Early-Mornings-Dick-Jack-Ryan/dp/1808570472?ref_=ast_author_dp&th=1&psc=1",
    tag: "Historical fiction",
  },
  {
    title: "Blame It on Socrates", author: "Jack Ryan", format: "Kindle Edition", rating: "5.0 · 7 reviews", image: socratesDog.url,
    description: "Professor Patrick Dolan returns to the turbulent 1960s after a long-lost letter forces him to examine the ideals, friendships, and unfinished choices that shaped his life.",
    link: "https://www.amazon.com/BLAME-SOCRATES-Jack-Ryan-ebook/dp/B0F2SJZY24?ref_=ast_author_mpb",
    tag: "Literary fiction",
  },
  {
    title: "Proud American", author: "Sergio A. Tinoco", format: "Kindle Edition", rating: "5.0 · 2 reviews", image: proudAmerican.url,
    description: "A remarkable true story of a South Texas migrant worker who became a soldier and federal agent—a testament to service, sacrifice, faith, and Hispanic American pride.",
    link: "https://www.amazon.com/Proud-American-Migrant-Soldier-Agent-ebook/dp/B0H1348M12?ref_=ast_author_mpb",
    tag: "Memoir",
  },
  {
    title: "Blame It on Socrates", author: "Jack Ryan", format: "Kindle Edition", rating: "Available now", image: socratesPortrait.url,
    description: "A witty, reflective campus novel about philosophy, nostalgia, and the weight of unfinished business, bridging the unrest of the 1960s with one professor’s present reckoning.",
    link: "https://www.amazon.com/Blame-Socrates-Jack-Ryan-ebook/dp/B0H52YRPRN?ref_=ast_author_dp_rw&th=1&psc=1&dib=eyJ2IjoiMSJ9.u1utHiXMTiQYN4uTXaOEO-6QZcSvcAAPOGQi5Z5D5tTGjHj071QN20LucGBJIEps.FSSTeA2ssfah_Ond7-IMcFadEcuP-dxey0rosAK0tKI&dib_tag=AUTHOR",
    tag: "Campus novel",
  },
] as const;

const writerTools = [
  { icon: Search, label: "Find Opportunities", detail: "Grants, awards and contests", to: "/grants-awards" },
  { icon: Library, label: "Publish Your Writing", detail: "Magazines, presses and agents", to: "/literary-magazines" },
  { icon: Film, label: "Pitch for the Screen", detail: "Put your story before producers", to: "/movie-adaptation" },
  { icon: Users, label: "Meet the Community", detail: "Authors, events and conversations", to: "/directory" },
  { icon: Feather, label: "Strengthen Your Craft", detail: "Prompts, practice and support", to: "/writing-prompts" },
] as const;

function Index() {
  return (
    <PageShell>
      <section className="relative bg-secondary text-secondary-foreground">
        <div className="mx-auto flex min-h-[500px] max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-16 text-center md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold">
            <Sparkles className="size-4 text-primary" /> Annual Membership — ${SITE.membership}/year
          </div>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.08] md:text-7xl">
            Where Serious Writers<br /><span className="text-primary">Build Their Careers</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-secondary-foreground/75 md:text-lg">
            Join a dedicated literary community. Access curated opportunities, connect with published authors, and find the resources that turn determined writers into published ones.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="h-12 rounded-md px-8 font-semibold">
              <Link to="/membership">Join for ${SITE.membership}/year <ArrowRight /></Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 justify-center px-5">
          <ClaimArticleDialog className="h-12 bg-primary px-7 text-base text-primary-foreground shadow-lg hover:bg-primary/90" />
        </div>
      </section>

      <section className="bg-background pt-14">
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
              <p className="font-serif text-5xl text-primary">1,200+</p>
              <p className="mt-2 text-xs font-semibold uppercase text-muted-foreground">Literary opportunities researched for writers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/45">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="text-center"><p className="text-xs font-semibold uppercase text-primary">Think for Writers</p><h2 className="mt-3 font-serif text-3xl">A clearer path through the literary world</h2></div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {writerTools.map(({ icon: Icon, label, detail, to }) => (
              <Link key={label} to={to} className="group bg-card p-6 text-center transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Icon className="mx-auto size-5 text-primary" /><h3 className="mt-4 font-serif text-lg">{label}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{detail}</p>
              </Link>
            ))}
          ))}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center"><p className="text-xs font-semibold uppercase text-primary">Book of the Week</p><h2 className="mt-3 font-serif text-4xl">Discover Your Next Great Read</h2><p className="mx-auto mt-3 max-w-2xl text-sm text-secondary-foreground/65">Handpicked selections from our community of writers — spanning literary fiction, history, memoir, and more.</p></div>
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
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase text-primary">From Our Past Spotlights</p><h2 className="mt-3 font-serif text-4xl">Books our readers have discovered</h2></div><Button asChild variant="outline" className="w-fit rounded-none"><Link to="/news">View all spotlights <ArrowRight /></Link></Button></div>
          <div className="mt-10 grid gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => <article key={`spotlight-${book.image}`} className="flex items-center gap-4 bg-background py-5 pr-4 sm:p-5"><img src={book.image} alt="" className="h-24 w-16 shrink-0 object-contain" /><div><p className="text-[10px] font-semibold uppercase text-primary">Reader spotlight</p><h3 className="mt-2 font-serif leading-tight">{book.title}</h3><p className="mt-1 text-xs text-muted-foreground">{book.author}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-accent/35">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[.85fr_1.15fr] md:items-center">
          <div className="grid grid-cols-2 gap-3"><img src={socratesDog.url} alt="Illustrated book cover artwork" className="aspect-[3/4] w-full object-cover" /><img src={socratesPortrait.url} alt="Painted portrait book cover artwork" className="mt-8 aspect-[3/4] w-full object-cover" /></div>
          <div><p className="text-xs font-semibold uppercase text-primary">This Week’s Featured Artists</p><h2 className="mt-3 font-serif text-4xl">Art that makes a reader stop</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">From expressive painted portraiture to atmospheric historical illustration, these covers show how visual storytelling establishes mood before the first page begins.</p><Button asChild variant="outline" className="mt-7 rounded-none"><Link to="/author-services">Discover author services <ArrowRight /></Link></Button></div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20"><p className="text-xs font-semibold uppercase text-primary">Stories Looking for the Screen</p><h2 className="mt-3 font-serif text-4xl">Books with cinematic possibility</h2><p className="mt-3 max-w-2xl text-sm text-muted-foreground">Character-led stories, historical turning points, and extraordinary real lives ready to be discovered by screen professionals.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{books.slice(0, 3).map((book) => <article key={`screen-${book.image}`} className="grid grid-cols-[110px_1fr] gap-5 border-t border-border pt-5"><img src={book.image} alt="" className="h-40 w-[110px] object-contain" /><div><Film className="size-4 text-primary" /><h3 className="mt-3 font-serif text-lg leading-tight">{book.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{book.description}</p></div></article>)}</div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/45"><div className="mx-auto max-w-6xl px-5 py-16"><div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase text-primary">Featured Members</p><h2 className="mt-3 font-serif text-3xl">Writers in our community</h2></div><Link to="/directory" className="text-sm font-semibold text-primary">View directory</Link></div><div className="mt-9 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{[{n:"Jack Ryan",r:"Historical & literary fiction",i:"JR"},{n:"Sergio A. Tinoco",r:"Memoir & military history",i:"ST"},{n:"Adaeze Okonkwo",r:"Literary fiction",i:"AO"},{n:"Helen Varga",r:"Poetry",i:"HV"}].map((member)=><article key={member.n} className="bg-card p-6 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary font-serif text-secondary-foreground">{member.i}</span><h3 className="mt-4 font-serif text-lg">{member.n}</h3><p className="mt-1 text-xs text-muted-foreground">{member.r}</p></article>)}</div></div></section>

      <section className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-3xl px-5 py-16 text-center"><Globe2 className="mx-auto size-6 text-primary" /><h2 className="mt-4 font-serif text-3xl">Bring your story into the community</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-secondary-foreground/65">Join Fourth Group &amp; Co for literary opportunities, thoughtful resources, and a place for your work to be seen.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild size="lg" className="rounded-none"><Link to="/membership">Join for ${SITE.membership}/year <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground"><Link to="/events"><CalendarDays /> Literary events</Link></Button></div></div></section>
    </PageShell>
  );
}