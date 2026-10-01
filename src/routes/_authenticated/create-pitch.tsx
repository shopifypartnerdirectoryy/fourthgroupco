import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/create-pitch")({
  staticData: { sitemap: false },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/create-pitch" }], meta: [{ title: "Create a Story Pitch | Fourth Group & Co" }, { name: "description", content: "Prepare your story pitch for film and television professionals." }, { property: "og:title", content: "Create a Story Pitch | Fourth Group & Co" }, { property: "og:description", content: "Turn your story into a focused adaptation pitch." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/create-pitch" }, { name: "robots", content: "noindex, follow" }] }),
  component: CreatePitch,
});

const schema = z.object({
  title: z.string().trim().min(1, "Add a title").max(150),
  logline: z.string().trim().min(1, "Add a one-sentence logline").max(400),
  genre: z.string().trim().min(1, "Add a genre").max(80),
  format: z.string().trim().min(1).max(80),
  synopsis: z.string().trim().max(5000),
  rights: z.string().trim().max(500),
  published: z.boolean(),
});

function CreatePitch() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const [v, setV] = useState({ title: "", logline: "", genre: "", format: "Feature film", synopsis: "", rights: "", published: true });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(v);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Please check the form");
    setBusy(true);
    const d = parsed.data;
    const { error } = await supabase.from("pitches").insert({ ...d, synopsis: d.synopsis || null, rights: d.rights || null, user_id: user.id });
    setBusy(false);
    if (error) return setError("We couldn't save your pitch. Please try again.");
    navigate({ to: "/pitch-dashboard" });
  }

  return (
    <PageShell>
      <PageHeader kicker="Movie adaptation" title="Create a pitch" intro="Give film and television readers the essentials: the hook, the world, the people, and the rights you hold." />
      <form onSubmit={submit} noValidate className="mx-auto grid max-w-2xl gap-5 px-5 py-14">
        <div className="grid gap-2"><Label htmlFor="p-title">Story title *</Label><Input id="p-title" value={v.title} onChange={set("title")} /></div>
        <div className="grid gap-2"><Label htmlFor="p-logline">Logline *</Label><Textarea id="p-logline" rows={2} value={v.logline} onChange={set("logline")} placeholder="One sentence: who wants what, and what stands in the way." /></div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2"><Label htmlFor="p-genre">Genre *</Label><Input id="p-genre" value={v.genre} onChange={set("genre")} placeholder="e.g. Family drama" /></div>
          <div className="grid gap-2"><Label htmlFor="p-format">Best suited to</Label>
            <select id="p-format" value={v.format} onChange={set("format")} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              {["Feature film", "Limited series", "Ongoing series", "Documentary", "Animation"].map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
        </div>
        <div className="grid gap-2"><Label htmlFor="p-synopsis">Synopsis</Label><Textarea id="p-synopsis" rows={6} value={v.synopsis} onChange={set("synopsis")} /></div>
        <div className="grid gap-2"><Label htmlFor="p-rights">Rights available</Label><Input id="p-rights" value={v.rights} onChange={set("rights")} placeholder="e.g. Worldwide film and TV rights held by the author" /></div>
        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          <input type="checkbox" checked={v.published} onChange={(e) => setV({ ...v, published: e.target.checked })} className="size-4 accent-primary" />
          List this pitch publicly in Search Pitches
        </label>
        {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" disabled={busy} className="justify-self-start px-8">{busy ? "Saving…" : "Save pitch"}</Button>
      </form>
    </PageShell>
  );
}
