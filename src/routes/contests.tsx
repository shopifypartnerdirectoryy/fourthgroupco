import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, ListingGrid } from "@/components/page-shell";

export const Route = createFileRoute("/contests")({
  head: () => ({
    meta: [
      { title: "Writing Contests & Competitions | Fourth Group & Co" },
      {
        name: "description",
        content:
          "Open writing contests for poetry, fiction, essay and screenwriting, with entry fees, prizes and deadlines.",
      },
      { property: "og:title", content: "Writing Contests & Competitions | Fourth Group & Co" },
      { property: "og:description", content: "Open competitions with verified deadlines and prizes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const ITEMS = [
  {
    name: "The Long Light Poetry Prize",
    meta: "Entry $12 · Closes 31 Oct",
    detail: "Single poems up to 60 lines. First prize $1,500 and publication in the winners' anthology.",
    tag: "Poetry",
  },
  {
    name: "Harbour Short Story Award",
    meta: "Entry $15 · Closes 20 Jan",
    detail: "Stories to 6,000 words, judged blind by a rotating panel of three writers.",
    tag: "Fiction",
  },
  {
    name: "First Draft Screenplay Competition",
    meta: "Entry $30 · Closes 5 Mar",
    detail: "Feature-length screenplays. Winners receive industry reads and a development meeting.",
    tag: "Screen",
  },
  {
    name: "Flash Season",
    meta: "Free entry · Closes 12 Dec",
    detail: "Flash fiction under 500 words, no fee, open worldwide.",
    tag: "Free",
  },
  {
    name: "Memoir in Miniature",
    meta: "Entry $10 · Closes 28 Feb",
    detail: "Personal essays to 2,000 words on a set theme announced each autumn.",
    tag: "Essay",
  },
  {
    name: "The Debut Manuscript Award",
    meta: "Entry $25 · Closes 14 Jun",
    detail: "Unpublished novel manuscripts, with the winner receiving a full editorial report.",
    tag: "Novel",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Database"
        title="Writing contests now open"
        intro="Around 140 competitions across poetry, fiction, essay and screenwriting. We list the fee, prize and deadline plainly, and flag every free-to-enter award."
      />
      <ListingGrid items={ITEMS} />
    </PageShell>
  );
}
