import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Fourth Group & Co" },
      {
        name: "description",
        content: `Get in touch with Fourth Group & Co about membership, listings or book spotlights at ${SITE.email}.`,
      },
      { property: "og:title", content: "Contact Fourth Group & Co" },
      { property: "og:description", content: "Reach the team about membership and listings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Message from ${name || "a writer"}`,
  )}&body=${encodeURIComponent(`${message}\n\n— ${name}\n${email}`)}`;

  return (
    <PageShell>
      <PageHeader
        kicker="Contact"
        title="Write to us"
        intro="Membership questions, a listing that needs correcting, or a book you would like us to consider for a spotlight — all of it comes to the same inbox."
      />
      <div className="mx-auto grid max-w-4xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr]">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
        >
          <div>
            <label htmlFor="name" className="text-sm text-foreground">
              Your name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-foreground">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Send message
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <p className="font-serif text-lg text-card-foreground">Email us directly</p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-2 block text-sm text-primary underline underline-offset-4"
          >
            {SITE.email}
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We answer most messages within two working days.
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
