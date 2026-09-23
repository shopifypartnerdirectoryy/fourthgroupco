import { Link } from "@tanstack/react-router";
import { BookOpenText, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_GROUPS, SITE } from "@/data/site";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 bg-background">
      <div className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-end gap-5 px-5 text-xs">
          <Link to="/contact" className="text-secondary-foreground/75 hover:text-secondary-foreground">Contact</Link>
          <Link to="/membership" className="text-secondary-foreground/75 hover:text-secondary-foreground">Sign in</Link>
          <Button asChild size="sm" className="h-7 rounded-md px-4 font-semibold">
            <Link to="/membership">Join now</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center px-5 py-7 md:py-9">
        <Link to="/" aria-label="Fourth Group and Co home" className="flex items-center gap-3">
          <BookOpenText className="size-9 text-primary" strokeWidth={1.7} />
          <span>
            <span className="block font-serif text-2xl leading-none text-foreground md:text-3xl">
              Fourth Group <span className="text-primary">&amp; Co</span>
            </span>
            <span className="mt-2 block text-[10px] font-medium uppercase text-muted-foreground md:text-xs">
              A global literary community
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
          <div className="flex items-center gap-1">
            {NAV_GROUPS.map((group) => (
              <DropdownMenu key={group.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-11 rounded-none px-4 text-[11px] font-bold uppercase text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-primary data-[state=open]:text-primary"
                  >
                    {group.label} <ChevronDown className="size-3 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={0} className="min-w-52 rounded-md border-border bg-popover p-2 shadow-xl">
                  {group.items.map((item) => (
                    <DropdownMenuItem key={item.to} asChild className="cursor-pointer rounded-sm px-3 py-3 focus:bg-accent">
                      <Link to={item.to}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
          <Link to="/membership" className="px-3 text-[11px] font-bold uppercase text-primary hover:text-primary/80">
            Join the community
          </Link>
        </nav>

        {open ? (
          <nav aria-label="Mobile navigation" className="px-5 py-3 lg:hidden">
            <Accordion type="multiple" className="mx-auto max-w-6xl">
              {NAV_GROUPS.map((group) => (
                <AccordionItem key={group.label} value={group.label} className="border-secondary-foreground/15">
                  <AccordionTrigger className="py-3 text-xs font-semibold uppercase text-secondary-foreground hover:no-underline">
                    {group.label}
                  </AccordionTrigger>
                  <AccordionContent className="grid gap-1 pb-3">
                    {group.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="rounded-sm px-3 py-2 text-sm text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button asChild className="mt-4 w-full">
              <Link to="/membership" onClick={() => setOpen(false)}>Join the community</Link>
            </Button>
          </nav>
        ) : null}
      </div>
    </header>
  );
}