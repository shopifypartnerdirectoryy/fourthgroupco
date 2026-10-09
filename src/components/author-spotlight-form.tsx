import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { SPOTLIGHT_GENRES } from "@/data/policies";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  project_title: z.string().trim().min(1, "Please enter your book or project title").max(200),
  genre: z.string().min(1, "Please choose a genre"),
});
type Values = z.infer<typeof schema>;
const EMPTY: Values = { full_name: "", email: "", project_title: "", genre: "" };

export function AuthorSpotlightForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [website, setWebsite] = useState(""); // honeypot
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof Values, v: string) => { setValues((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const i of parsed.error.issues) next[i.path[0] as keyof Values] ??= i.message;
      setErrors(next);
      return;
    }
    if (website) { setDone(true); return; }
    setBusy(true);
    const { error } = await supabase.from("spotlight_submissions").insert({ ...parsed.data, email: parsed.data.email.toLowerCase() });
    setBusy(false);
    if (error) {
      if (error.code === "23505") toast.error("We already have a spotlight request for this title from this email. Our editors will be in touch.");
      else toast.error("Your request could not be sent. Please try again in a moment.");
      return;
    }
    toast.success("Request received. Our editorial team will review it and contact you.");
    setDone(true);
    setValues(EMPTY);
  }

  if (done) {
    return (
      <div role="status" className="rounded-sm border border-primary/40 bg-card p-8 text-center text-card-foreground">
        <p className="font-serif text-2xl">Thank you — your request is with our editors.</p>
        <p className="mt-3 text-sm text-muted-foreground">We review every request personally. Nothing is published until we have spoken with you.</p>
        <Button variant="outline" className="mt-6 rounded-none" onClick={() => setDone(false)}>Submit another title</Button>
      </div>
    );
  }

  const field = (k: keyof Values, label: string, type = "text", auto?: string) => (
    <div className="grid gap-2">
      <Label htmlFor={`sp-${k}`}>{label} <span aria-hidden="true" className="text-primary">*</span></Label>
      <Input id={`sp-${k}`} type={type} autoComplete={auto} value={values[k]} onChange={(e) => set(k, e.target.value)}
        aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `sp-${k}-err` : undefined} className="h-11 bg-background" />
      {errors[k] ? <p id={`sp-${k}-err`} className="text-xs text-destructive">{errors[k]}</p> : null}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-sm border border-border bg-card p-6 text-card-foreground shadow-sm md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("full_name", "Full name", "text", "name")}
        {field("email", "Email address", "email", "email")}
      </div>
      {field("project_title", "Book / project title")}
      <div className="grid gap-2">
        <Label htmlFor="sp-genre">Genre <span aria-hidden="true" className="text-primary">*</span></Label>
        <Select value={values.genre} onValueChange={(v) => set("genre", v)}>
          <SelectTrigger id="sp-genre" aria-invalid={!!errors.genre} className="h-11 bg-background"><SelectValue placeholder="Choose a genre" /></SelectTrigger>
          <SelectContent>{SPOTLIGHT_GENRES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
        </Select>
        {errors.genre ? <p className="text-xs text-destructive">{errors.genre}</p> : null}
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" aria-hidden="true" />
      <Button type="submit" disabled={busy} className="h-12 rounded-none text-sm">
        {busy ? <><Loader2 className="animate-spin" /> Sending…</> : "Claim Free Author Spotlight"}
      </Button>
      <p className="text-xs text-muted-foreground">This is an editorial request only — it does not subscribe you to marketing emails.</p>
    </form>
  );
}
