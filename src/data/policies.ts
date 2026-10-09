/** Owner-supplied business policies. Change values here; every page reads from this file. */
export const POLICY = {
  supportEmail: "support@fourthgroup.co",
  website: "https://fourthgroup.co",
  priceUsd: 25,
  durationMonths: 12,
  /** Paste the secure payment link here when it is available. Empty = payment not yet open. */
  paymentUrl: "",
  termsVersion: "2026-10-draft",
  draftNotice:
    "Initial draft for owner and legal review. This document is not final and may change before launch.",
  /** Public Trustpilot (or other review) page. Empty = no review link shown. */
  reviewUrl: "",
};

export const SPOTLIGHT_GENRES = [
  "Literary fiction", "Historical fiction", "Mystery & thriller", "Romance", "Fantasy",
  "Science fiction", "Horror", "Young adult", "Children's", "Memoir", "Biography",
  "Poetry", "Non-fiction", "Self-help", "Faith & spirituality", "Screenplay", "Illustrated / graphic", "Other",
];

export const TRUST_FAQ: { q: string; a: string }[] = [
  { q: "What is included in the $25/year membership?",
    a: `Membership costs $${POLICY.priceUsd} USD for ${POLICY.durationMonths} months, subject to the price shown at checkout. It gives you a member account, the Save to My Desk submission tracker, event registration, access to our curated opportunity directories, and member updates. Benefits are listed on the Membership page; we will not add charges or tiers without telling you first.` },
  { q: "How do we support independent authors and screenwriters?",
    a: "We publish curated directories of magazines, presses, agents, grants, contests and residencies, write free editorial features about members' milestones, run online events, and offer a pitch space for screen adaptation. We are a community and information service, not a publisher or literary agency." },
  { q: "What is our mission and service scope?",
    a: "Fourth Group & Co helps authors, poets, screenwriters and other creatives discover opportunities, manage submissions, connect with one another and share their work responsibly. We do not sell publishing contracts, guarantee placements or act as anyone's agent." },
  { q: "How do we protect member information and submitted manuscripts?",
    a: "Accounts are protected by sign-in, and private records such as your desk, notes and unpublished pitches are only visible to you and to authorised staff where needed to provide the service. We do not sell personal data. Only share material you are comfortable sharing, and keep your own copies. See the Privacy Policy for details." },
  { q: "How does our editorial review process work?",
    a: "Spotlight requests and other submissions are read by our editorial team. Nothing is published automatically: every feature is reviewed, and we contact you before anything about your work goes live. We may decline requests that fall outside our editorial standards." },
  { q: "How do registration, renewal, cancellation, and refunds work?",
    a: `Create a free account, then pay through our secure payment link. Membership lasts ${POLICY.durationMonths} months and renews manually only — you will never be charged automatically. If you cancel, access continues until the end of your paid period, subject to applicable law. Refund requests are reviewed case by case, subject to applicable law; you can submit one from your dashboard.` },
  { q: "How do we handle copyright, AI use, and intellectual property?",
    a: "You keep all rights to your work. Submitting to us does not transfer ownership. We do not use members' manuscripts or pitches to train AI models. Our copyright templates are general information, not legal advice." },
  { q: "Are publication opportunities, grants, awards, or industry placements guaranteed?",
    a: "No. We list opportunities and make introductions where we can, but outcomes are decided by the editors, judges and producers involved. Always confirm details with the organiser." },
  { q: "How can members manage their accounts and membership?",
    a: "Sign in and open your dashboard to see membership status, request cancellation or a refund, and manage saved opportunities, submissions and event registrations." },
  { q: "How can members contact support?",
    a: `Email ${POLICY.supportEmail}. We aim to reply as soon as we can.` },
];

/** Membership plans. Payment is confirmed manually by staff until a checkout provider is connected. */
export const PLANS = {
  standard: {
    name: "Standard Member",
    priceUsd: 25,
    durationMonths: 12,
    refundNote: "Refund requests are reviewed case by case.",
    benefits: [
      "Every magazine, press, agent, grant, contest and residency listing",
      "Save to My Desk submission tracker with deadlines",
      "The members-only Fourth Group Author Community",
      "Event registration and member updates",
      "Critique Exchange and pitch-deck requests",
    ],
  },
  pro: {
    name: "Pro Member",
    priceUsd: 25,
    durationMonths: 12,
    refundNote: "Pro membership is non-refundable once activated.",
    benefits: [
      "Everything in Standard membership",
      "Pro Member badge on your community posts",
      "Access to the Pro Lounge discussion room",
      "Priority consideration for editorial spotlights",
    ],
  },
} as const;
export type PlanKey = keyof typeof PLANS;
