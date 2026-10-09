import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Copy, Download } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/author-protection")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/author-protection" }],
    meta: [
      { title: "Copyright Notice Maker & Author Badges | Fourth Group & Co" },
      { name: "description", content: "Create a copyright notice for your book or manuscript and download Fourth Group & Co author badges. General information, not legal advice." },
      { property: "og:title", content: "Copyright Notice Maker & Author Badges | Fourth Group & Co" },
      { property: "og:description", content: "A free copyright notice generator and downloadable badges for writers." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "https://fourthgroupco.lovable.app/author-protection" },
    ],
  }),
  component: Page,
});

const AI_LINES: Record<string, string> = {
  none: "",
  no_training: "No part of this work may be used to train artificial intelligence or machine-learning systems without the author's written permission.",
  human: "This work was written by a human author.",
};

function Page() {
  const year = new Date().getFullYear();
  const [v, setV] = useState({ author: "", title: "", year: String(year), publisher: "", contact: "", reserve: "all", ai: "no_training" });
  const notice = useMemo(() => {
    const who = v.author.trim() || "[Author name]";
    const lines = [
      `${v.title.trim() || "[Title]"}`,
      `Copyright © ${v.year || year} ${who}${v.reserve === "all" ? ". All rights reserved." : ". Some rights reserved."}`,
      v.reserve === "all"
        ? "No part of this publication may be reproduced, distributed or transmitted in any form or by any means without the prior written permission of the copyright holder, except for brief quotations in reviews and certain other non-commercial uses permitted by copyright law."
        : "You may share brief excerpts with credit to the author. For any other use, please contact the copyright holder.",
      AI_LINES[v.ai] ?? "",
      v.publisher.trim() ? `Published by ${v.publisher.trim()}.` : "",
      v.contact.trim() ? `Permissions: ${v.contact.trim()}` : "",
    ];
    return lines.filter(Boolean).join("\n\n");
  }, [v, year]);

  return (
    <PageShell>
      <PageHeader kicker="Author protection" title="Copyright notice maker & author badges" intro="Practical tools for presenting your work. Your copyright exists when you create the work; these tools help you state it clearly." />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-2">
        <section>
          <h2 className="font-serif text-2xl text-foreground">Copyright notice</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Label className="text-xs">Author / copyright holder<Input className="mt-1" maxLength={120} value={v.author} onChange={(e) => setV({ ...v, author: e.target.value })} /></Label>
            <Label className="text-xs">Title<Input className="mt-1" maxLength={200} value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} /></Label>
            <Label className="text-xs">Year of first publication<Input className="mt-1" inputMode="numeric" maxLength={4} value={v.year} onChange={(e) => setV({ ...v, year: e.target.value.replace(/\D/g, "") })} /></Label>
            <Label className="text-xs">Publisher (optional)<Input className="mt-1" maxLength={120} value={v.publisher} onChange={(e) => setV({ ...v, publisher: e.target.value })} /></Label>
            <Label className="text-xs sm:col-span-2">Permissions contact (optional)<Input className="mt-1" maxLength={200} value={v.contact} onChange={(e) => setV({ ...v, contact: e.target.value })} /></Label>
            <Label className="text-xs">Rights<select className="mt-1 h-9 w-full rounded-sm border border-input bg-background px-2" value={v.reserve} onChange={(e) => setV({ ...v, reserve: e.target.value })}><option value="all">All rights reserved</option><option value="some">Allow short excerpts with credit</option></select></Label>
            <Label className="text-xs">AI statement<select className="mt-1 h-9 w-full rounded-sm border border-input bg-background px-2" value={v.ai} onChange={(e) => setV({ ...v, ai: e.target.value })}><option value="no_training">No AI training without permission</option><option value="human">Written by a human author</option><option value="none">None</option></select></Label>
          </div>
          <pre className="mt-5 whitespace-pre-wrap rounded-sm border border-border bg-card p-5 font-serif text-sm leading-relaxed text-card-foreground">{notice}</pre>
          <Button className="mt-3" onClick={() => navigator.clipboard.writeText(notice).then(() => toast.success("Copied"), () => toast.error("Copy failed"))}><Copy />Copy notice</Button>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">General information only — not legal advice. A notice does not register your copyright. For registration or disputes, consult your national copyright office or a qualified lawyer.</p>
        </section>
        <Badges />
      </div>
    </PageShell>
  );
}

function badgeSvg(top: string, main: string, sub: string) {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">
<circle cx="240" cy="240" r="232" fill="#14213d"/><circle cx="240" cy="240" r="210" fill="none" stroke="#c9a227" stroke-width="3"/><circle cx="240" cy="240" r="196" fill="none" stroke="#c9a227" stroke-width="1"/>
<text x="240" y="165" text-anchor="middle" font-family="Georgia, serif" font-size="20" letter-spacing="4" fill="#c9a227">${esc(top.toUpperCase())}</text>
<text x="240" y="255" text-anchor="middle" font-family="Georgia, serif" font-size="46" fill="#f8f5ee">${esc(main)}</text>
<line x1="150" y1="290" x2="330" y2="290" stroke="#c9a227" stroke-width="2"/>
<text x="240" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="18" letter-spacing="2" fill="#f8f5ee">${esc(sub)}</text>
</svg>`;
}
function download(name: string, svg: string) {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const a = document.createElement("a"); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}

function Badges() {
  const { user } = useSession();
  const year = String(new Date().getFullYear());
  const { data: active } = useQuery({
    queryKey: ["active-membership", user?.id], enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("memberships").select("status, expires_on").eq("user_id", user!.id).eq("status", "active").order("expires_on", { ascending: false }).limit(1).maybeSingle();
      return !!data && (!data.expires_on || data.expires_on >= new Date().toISOString().slice(0, 10));
    },
  });
  const badges = [
    { file: "human-written.svg", label: "Human-written", svg: badgeSvg("Author statement", "Human-Written", "Fourth Group & Co"), note: "A self-declaration you can use if you wrote the work yourself." },
    { file: "all-rights-reserved.svg", label: "All rights reserved", svg: badgeSvg("© " + year, "All Rights", "Reserved by the author"), note: "A reminder that your work is protected by copyright." },
  ];
  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground">Downloadable badges</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {badges.map((b) => <BadgeCard key={b.file} {...b} />)}
        {active ? <BadgeCard file="fourth-group-member.svg" label="Fourth Group & Co Member" note={`For active members. Valid for the ${year} membership year.`} svg={badgeSvg("Member " + year, "Fourth Group", "& Co · Literary community")} />
          : <div className="grid place-items-center rounded-sm border border-dashed border-border p-6 text-center text-xs text-muted-foreground">The member badge is available to active members.<Link to="/membership" className="mt-2 text-primary underline">About membership</Link></div>}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Badges are statements, not certifications. They do not mean Fourth Group & Co has verified, registered or legally protected your work.</p>
    </section>
  );
}

function BadgeCard({ file, label, svg, note }: { file: string; label: string; svg: string; note: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-4 text-center">
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} alt={`${label} badge`} className="mx-auto size-36" />
      <p className="mt-3 text-sm font-semibold text-card-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      <Button size="sm" variant="outline" className="mt-3" onClick={() => download(file, svg)}><Download />Download</Button>
    </div>
  );
}
