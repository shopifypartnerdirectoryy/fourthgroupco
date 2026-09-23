import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-tight text-foreground">Fourth Group</span>
          <span className="font-serif text-xl text-primary">&amp; Co</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/membership"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Join · ${SITE.membership}/yr
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="ml-auto rounded-md p-2 text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border/70 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/membership"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Become a member
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
