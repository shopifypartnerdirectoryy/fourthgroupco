import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl text-foreground">
            Fourth Group <span className="text-primary">&amp; Co</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{SITE.tagline}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-block text-sm text-foreground underline underline-offset-4"
          >
            {SITE.email}
          </a>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Explore</p>
          <ul className="mt-4 space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Community</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/membership" className="text-sm text-muted-foreground hover:text-foreground">
                Membership
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
