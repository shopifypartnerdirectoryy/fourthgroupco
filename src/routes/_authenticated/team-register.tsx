import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/team-register")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Team Registration | Fourth Group & Co" }, { name: "description", content: "Private team registration." },
    { property: "og:title", content: "Team Registration | Fourth Group & Co" }, { property: "og:description", content: "Private team registration." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: TeamPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40),
  country: z.string().trim().max(80),
  role_interest: z.string().trim().min(2, "Tell us the role you're applying for").max(120),
  motivation: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

function TeamPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const mine = useQuery({ queryKey: ["team-app", user.id], queryFn: async () => (await supabase.from("team_applications").select("*").eq("user_id", user.id).maybeSingle()).data });
  const [f, setF] = useState({ full_name: "", email: user.email ?? "", phone: "", country: "", role_interest: "", motivation: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const save = useMutation({
    mutationFn: async (d: z.infer<typeof schema>) => {
      const { error } = await supabase.from("team_applications").insert({ ...d, phone: d.phone || null, country: d.country || null, user_id: user.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team-app", user.id] }),
    onError: () => toast.error("We couldn't submit your registration. Please try again."),
  });
  function submit(e: FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) { const m: Record<string, string> = {}; r.error.issues.forEach((i) => { m[String(i.path[0])] = i.message; }); setErrors(m); return; }
    setErrors({}); save.mutate(r.data);
  }
  const a = mine.data;
  return (
    <PageShell>
      <PageHeader kicker="Team" title="Fourth Group & Co team registration" intro="For invited team members only. Every application is reviewed by our administration." />
      <div className="mx-auto max-w-2xl px-5 py-12">
        {mine.isLoading ? <p className="text-sm">Loading…</p> : a ? (
          <div className="rounded-sm border border-border bg-card p-7">
            {a.status === "approved" && a.referral_code ? (<>
              <h2 className="font-serif text-2xl">You're approved</h2>
              <p className="mt-3 text-sm text-muted-foreground">Your personal referral code:</p>
              <p className="mt-2 font-serif text-5xl tracking-[0.3em] text-primary">{a.referral_code}</p>
              <p className="mt-4 text-xs text-muted-foreground">Members can enter this code at checkout. A referral is only counted after their payment is confirmed.</p>
            </>) : (<>
              <h2 className="font-serif text-2xl">Status: {a.status}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{a.status === "pending" ? "Your team registration has been submitted for review. Your personal referral code will be issued after your application is approved by Fourth Group & Co administration." : "Your application is not active. Contact the team if you have questions."}</p>
            </>)}
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-4 rounded-sm border border-border bg-card p-7">
            {([["full_name", "Full name"], ["email", "Email"], ["phone", "Phone (optional)"], ["country", "Country (optional)"], ["role_interest", "Role you're applying for"]] as const).map(([k, l]) => (
              <label key={k} className="text-sm">{l}<Input value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className="mt-1" />{errors[k] ? <span className="mt-1 block text-xs text-destructive">{errors[k]}</span> : null}</label>
            ))}
            <label className="text-sm">Why do you want to join the team?<Textarea rows={5} value={f.motivation} onChange={(e) => setF({ ...f, motivation: e.target.value })} className="mt-1" />{errors["motivation"] ? <span className="mt-1 block text-xs text-destructive">{errors["motivation"]}</span> : null}</label>
            <Button type="submit" disabled={save.isPending}>Submit registration</Button>
          </form>
        )}
      </div>
    </PageShell>
  );
}
