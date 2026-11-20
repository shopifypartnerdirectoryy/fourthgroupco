import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/data/site";
import { Button } from "@/components/ui/button";
import brandLogo from "@/assets/fourth-group-footer-logo.webp";

const FOOTER_GROUPS: { title: string; links: { to: string; label: string }[] }[] = [
  { title: "Company", links: [
    { to: "/about", label: "About Us" },
    { to: "/launch-packages", label: "Launch Packages" },
    { to: "/marketing-services", label: "Marketing Services" },
    { to: "/client-campaigns", label: "Client Campaigns" },
    { to: "/screen-adaptation", label: "Screen Adaptation" },
  ] },
  { title: "Writer Resources & Editorial", links: [
    { to: "/literary-magazines", label: "Literary Magazines" },
    { to: "/small-presses", label: "Independent Presses" },
    { to: "/literary-agents", label: "Literary Agents" },
    { to: "/grants-awards", label: "Grants" },
    { to: "/contests", label: "Contests" },
    { to: "/residencies", label: "Residencies" },
    { to: "/news", label: "Literary Journal" },
  ] },
  { title: "Connect", links: [
    { to: "/contact", label: "Contact" },
    { to: "/marketing-services#terms", label: "Service Terms" },
    { to: "/author-community", label: "Literary Network" },
  ] },
];

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="border-b border-secondary-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-3xl">Ready to Bring Your Book to the Right Readers?</h2>
            <p className="mt-2 max-w-xl text-sm text-secondary-foreground/65">Let's explore a promotional strategy that reflects your book, your audience and your ambitions.</p>
          </div>
          <Button asChild size="lg" className="h-12 shrink-0 rounded-none"><Link to="/campaign-proposal" search={{}}>Request a Campaign Proposal <ArrowRight /></Link></Button>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <Link to="/" aria-label="Fourth Group and Co home" className="inline-block rounded-sm bg-background p-3">
            <img src={brandLogo} alt="Fourth Group & Co" className="h-auto w-40 object-contain" />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary-foreground/65">{SITE.tagline}</p>
          <a href={`mailto:${SITE.email}`} className="mt-4 block text-sm text-primary underline underline-offset-4">{SITE.email}</a>
        </div>
        {FOOTER_GROUPS.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-semibold uppercase text-primary">{g.title}</p>
            <ul className="mt-4 space-y-2">
              {g.links.map((l) => (
                <li key={l.label}><a href={l.to} className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">{l.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-secondary-foreground/50">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-5"><Link to="/privacy" className="hover:text-secondary-foreground">Privacy Policy</Link><Link to="/terms" className="hover:text-secondary-foreground">Terms &amp; Conditions</Link><Link to="/cookie-policy" className="hover:text-secondary-foreground">Cookie Policy</Link></div>
        </div>
      </div>
    </footer>
  );
}
