import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const SELECTOR =
  "main section, main article, main h1, main h2, main li, main form, main img, footer > div";

/** Adds a gentle fade/slide-in to page content as it scrolls into view. */
export function ScrollReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    const timer = window.setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      const vh = window.innerHeight;
      els.forEach((el, i) => {
        if (el.dataset.revealBound) return;
        el.dataset.revealBound = "1";
        const rect = el.getBoundingClientRect();
        el.classList.add("reveal");
        el.style.setProperty("--reveal-delay", `${Math.min(i % 6, 5) * 60}ms`);
        if (rect.top < vh) {
          requestAnimationFrame(() => el.classList.add("is-revealed"));
        } else {
          observer.observe(el);
        }
      });
    }, 60);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
