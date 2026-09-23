import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { PROMPT } from "@/data/site";

export const Route = createFileRoute("/writing-prompts")({
  head: () => ({
    meta: [
      { title: "Weekly Writing Prompts | Fourth Group & Co" },
      {
        name: "description",
        content:
          "A new writing prompt each week for poets, novelists and essayists, written by working writers.",
      },
      { property: "og:title", content: "Weekly Writing Prompts | Fourth Group & Co" },
      { property: "og:description", content: "Prompts for poetry, fiction and non-fiction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const ARCHIVE = [
  {
    title: "The Borrowed Coat",
    form: "Fiction",
    body: "A character wears something that belongs to someone else for an entire scene. Nobody comments on it.",
  },
  {
    title: "Instructions for a Stranger",
    form: "Poetry",
    body: "Write a poem entirely in the imperative. Let the commands become tender by the final third.",
  },
  {
    title: "The Year Told Backwards",
    form: "Essay",
    body: "Begin in December and work towards January. Notice what the reversal makes visible.",
  },
  {
    title: "Two Doors",
    form: "Screen",
    body: "A scene with no dialogue in which a decision is made. You have one page.",
  },
  {
    title: "Weather Report",
    form: "Poetry",
    body: "Describe a relationship using only the language of forecasting.",
  },
  {
    title: "The Unsent Letter",
    form: "Fiction",
    body: "Someone writes a letter they will never send, then does something with it that surprises them.",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Every Monday"
        title="Writing prompts"
        intro="One new prompt each week, written by poets, novelists and screenwriters in the community. Use them, ignore them, or bend them out of shape."
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-2xl border border-primary/30 bg-accent/60 p-8 md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">This week</p>
          <h2 className="mt-3 font-serif text-3xl text-foreground">{PROMPT.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{PROMPT.body}</p>
        </div>

        <h3 className="mt-14 font-serif text-2xl text-foreground">From the archive</h3>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ARCHIVE.map((p) => (
            <article key={p.title} className="rounded-xl border border-border bg-card p-6">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                {p.form}
              </span>
              <h4 className="mt-4 font-serif text-lg text-card-foreground">{p.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
