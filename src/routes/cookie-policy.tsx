import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, policyHead } from "@/components/policy-page";

export const Route = createFileRoute("/cookie-policy")({
  staticData: { sitemap: true },
  head: policyHead("cookie-policy", "Cookie Policy", "The browser storage Fourth Group & Co uses and why."),
  component: () => (
    <PolicyPage title="Cookie Policy" intro="The small amount of browser storage we use."
      sections={[
        { h: "Essential storage", body: <ul className="list-disc space-y-1 pl-5">
          <li>Sign-in session — keeps you signed in to your account.</li>
          <li>Popup reminder — remembers that you have already seen the article popup during a visit.</li>
        </ul> },
        { h: "Advertising and tracking", body: <p>We do not use advertising or cross-site tracking cookies. If this changes we will update this page and ask for consent where required.</p> },
        { h: "Managing storage", body: <p>You can clear site data in your browser settings at any time. Clearing it will sign you out.</p> },
      ]} />
  ),
});
