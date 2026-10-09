import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/data/site";
import brandLogo from "@/assets/fourth-group-footer-logo.webp";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-secondary-foreground/10 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <Link to="/" aria-label="Fourth Group and Co home" className="inline-block rounded-sm bg-background p-3">
            <img src={brandLogo} alt="Fourth Group & Co" className="h-auto w-40 object-contain" />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary-foreground/65">{SITE.tagline}</p>
          <a href={`mailto:${SITE.email}`} className="mt-4 block text-sm text-primary underline underline-offset-4">{SITE.email}</a>
          <a href="mailto:support@fourthgroup.co" className="mt-1 block text-sm text-secondary-foreground/65 hover:text-secondary-foreground">support@fourthgroup.co</a>
        </div>
        {FOOTER_GROUPS.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-semibold uppercase text-primary">{g.title}</p>
            <ul className="mt-4 space-y-2">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>


      <div className="border-t border-secondary-foreground/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
