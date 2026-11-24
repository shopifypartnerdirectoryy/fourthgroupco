# Fourth Group & Co Website Refinement Plan

## Goals
Refine the current Fourth Group & Co website—not rebuild it—while preserving its identity, existing URLs, complete service catalogue, prices, payment arrangements, and working integrations.

## Work
1. **Homepage and trust**
   - Reorganize the homepage around the requested author-services positioning and three business pillars: Book Growth & Visibility, Audiobook Production, and Publishing & Screen Opportunities.
   - Arrange the existing material into the requested journey: hero, introduction, service categories, featured books, audiobook introduction, real client feedback, how work proceeds, packages, screen opportunities, FAQs, and final enquiry.
   - Remove the current fictional review drafts. Show only already-published, approved testimonials; if none are available, use factual service/process information rather than invented quotes or review labels.
2. **Books and service navigation**
   - Refine `/client-campaigns` into a responsive book-cover portfolio with the supplied introduction, clear title/author/available genre information, duplicate-title cleanup, and a relevant TikTok-feature CTA. Keep covers as the portfolio; add no purchase links or invented campaign results.
   - Reorganize every existing marketing service into the six requested customer-facing categories while retaining every service, existing price, package name, and proposal link.
   - Add a dedicated audiobook-production page using only the existing quote-based packages and documented capabilities; link it from the homepage, service catalogue, navigation, and footer. Do not invent prices, samples, delivery promises, or distribution outcomes.
3. **Business pages and enquiries**
   - Clarify `/about` and `/screen-adaptation` with factual agency positioning, a clear process, rights-aware language, and no unsupported history, credentials, or guarantees.
   - Add accurate, concise FAQs and direct calls to action based on existing policies and services.
   - Replace the contact page's email-app-only submission with a validated, mobile-friendly enquiry that is saved for authorized staff to review, while preserving the existing proposal flow. The project has no configured sending domain, so automatic owner email alerts cannot be enabled yet; they remain dependent on email setup.
4. **Consistency, accessibility, and search readiness**
   - Extend the current visual system, shared page banner, header, and footer rather than introducing a new brand style.
   - Review important pages at mobile and desktop widths for clipped content, overflow, working navigation, forms, and calls to action.
   - Audit route titles/descriptions, organization and service structured data, sitemap/robots, and the outdated `llms.txt`; preserve current URLs and canonical host settings unless the public domain is confirmed.

## Technical details
- Keep package/service values in the existing agency data source; do not edit existing prices or payment integrations.
- Use local book-cover assets and existing approved testimonial records only.
- Add a narrowly scoped contact-submission table with anonymous insert only and staff-only reads, then expose it in the existing admin area; never make contact details publicly readable.
- Validate form input and verify the principal visitor flows and changed pages before completion.

## Content dependencies
- No authorized audiobook sample files are currently in the project; no sample audio will be fabricated or presented as genuine.
- Email notifications require a verified sending domain; the current project email setup has not been configured.
