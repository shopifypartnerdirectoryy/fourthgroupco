import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/data/site";
import brandLogo from "@/assets/fourth-group-footer-logo.webp";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-secondary-foreground/10 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" aria-label="Fourth Group and Co home" className="inline-block rounded-sm bg-background p-3">
            <img src={brandLogo} alt="Fourth Group & Co" className="h-auto w-40 object-contain" />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary-foreground/65">{SITE.tagline}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-block text-sm text-primary underline underline-offset-4"
          >
            {SITE.email}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-primary">Explore</p>
          <ul className="mt-4 space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-primary">Community</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/membership" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">
                Membership
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">
                About us
              </Link>
            </li>
            <li><Link to="/trust-standards" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">Trust & Transparency</Link></li>
            <li><Link to="/team-register" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">Team Registration</Link></li>
            <li><Link to="/membership-terms" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">Membership Terms</Link></li>
            <li><Link to="/refund-policy" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">Refund Policy</Link></li>
            <li><Link to="/privacy" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">Terms of Service</Link></li>
            <li><Link to="/cookie-policy" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">Cookie Policy</Link></li>
            <li><a href="mailto:support@fourthgroup.co" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">support@fourthgroup.co</a></li>
            <li>
              <Link to="/contact" className="text-sm text-secondary-foreground/65 hover:text-secondary-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
