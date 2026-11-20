import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { PRIMARY_NAV } from "@/data/site";
import brandMark from "@/assets/fourth-group-mark.webp";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(!!session));
    return () => data.subscription.unsubscribe();
  }, []);
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="relative z-50 bg-background">
      <div className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-end gap-5 px-5 text-xs">
          <Link to="/contact" className="text-secondary-foreground/75 hover:text-secondary-foreground">Contact</Link>
          {signedIn ? (
            <>
              <Link to="/dashboard" className="text-secondary-foreground/75 hover:text-secondary-foreground">My dashboard</Link><Link to="/submissions" className="text-secondary-foreground/75 hover:text-secondary-foreground">My Desk</Link>
              <button type="button" onClick={signOut} className="text-secondary-foreground/75 hover:text-secondary-foreground">Sign out</button>
            </>
          ) : (
            <Link to="/auth" className="text-secondary-foreground/75 hover:text-secondary-foreground">Sign in</Link>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center px-5 py-4 md:py-5">
        <Link to="/" aria-label="Fourth Group and Co home" className="flex items-center gap-3 md:gap-4">
          <img
            src={brandMark}
            alt=""
            aria-hidden="true"
            className="size-12 shrink-0 object-contain md:size-16"
          />
          <span>
            <span className="block font-serif text-xl leading-none text-foreground md:text-3xl">
              Fourth Group <span className="text-primary">&amp; Co</span>
            </span>
            <span className="mt-2 block text-[9px] font-medium uppercase text-muted-foreground md:text-xs">
              Book Publicity &amp; Literary Marketing
            </span>
          </span>
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="ml-auto lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div className="border-y border-secondary-foreground/20 bg-secondary text-secondary-foreground">
        <nav aria-label="Main navigation" className="mx-auto hidden max-w-6xl items-center justify-between px-5 lg:flex">
          <div className="flex items-center">
            {PRIMARY_NAV.map((item) => (
              <Link key={item.to} to={item.to} className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-secondary-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>{item.label}</Link>
            ))}
          </div>
          <Button asChild size="sm" className="h-8 rounded-none px-5 text-[11px] font-bold uppercase tracking-wider">
            <Link to="/campaign-proposal" search={{}}>Request a Campaign Proposal</Link>
          </Button>
        </nav>

        {open ? (
          <nav aria-label="Mobile navigation" className="px-5 py-3 lg:hidden">
            <div className="mx-auto grid max-w-6xl">
              {PRIMARY_NAV.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-secondary-foreground/15 py-3 text-sm font-semibold uppercase text-secondary-foreground hover:text-primary">{item.label}</Link>
              ))}
            </div>
            <Button asChild className="mt-4 w-full rounded-none">
              <Link to="/campaign-proposal" search={{}} onClick={() => setOpen(false)}>Request a Campaign Proposal</Link>
            </Button>
          </nav>
        ) : null}
      </div>
    </header>
  );
}