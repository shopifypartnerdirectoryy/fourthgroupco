import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const SELECTOR =
  "main article, main section > div, main .reveal, footer > div";

/** Adds a gentle fade/slide-in to page content as it scrolls into view. */
export function ScrollReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );

    const timer = window.setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      const vh = window.innerHeight;
      els.forEach((el, i) => {
        if (el.classList.contains("is-revealed")) return;
        const rect = el.getBoundingClientRect();
        el.classList.add("reveal");
        el.style.setProperty("--reveal-delay", `${Math.min(i % 6, 5) * 60}ms`);
        if (rect.top < vh && rect.bottom > 0) {
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
