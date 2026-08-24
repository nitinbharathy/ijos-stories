# ijós Moments — Site Improvement Backlog

Last reviewed: 2 August 2026

This document consolidates the outstanding design, usability, accessibility, performance, and SEO findings for the website. Completed decisions and intentionally deferred items are recorded separately so they are not raised repeatedly.

## Current status

- The website builds successfully.
- The site is responsive and uses a single clear H1.
- Service galleries autoplay, loop, support dragging, and include previous/next controls.
- Gallery autoplay pauses on hover and keyboard focus.
- Reduced-motion preferences disable gallery autoplay.
- The header includes a `Get in touch` action.
- The contact form displays success feedback after valid submission.
- Testimonial and footer spacing have been tightened.
- The Pixieset bottom banner is not included.

## Intentionally deferred

- [ ] Hero crossfade refinements — intentionally ignored for now at the owner's request.
- [ ] Replacement of future scroll animations — keep any scroll-triggered motion isolated and easy to replace.

## Priority 1 — Conversion and form behavior

- [ ] Connect the contact form to a real delivery service or backend. The current form only presents local success feedback and does not send the enquiry anywhere.
- [ ] Show the success message only after the server confirms that the enquiry was delivered.
- [ ] Add a visible error state when submission fails, with a clear retry action.
- [ ] Prevent duplicate submissions while a message is being sent.
- [ ] Add a short response-time expectation, such as `We usually reply within two working days.`
- [ ] Add an appropriate privacy notice or link near the form before collecting personal details.
- [ ] Confirm that phone and email details are clickable using `tel:` and `mailto:` links.

## Priority 2 — SEO essentials

- [x] Replace the generic page title with a descriptive title, for example: `Singapore Wedding Photographer & Videographer | ijós Moments`.
- [x] Add a concise meta description focused on Singapore wedding photography, videography, pre-wedding shoots, and proposals.
- [ ] Add a canonical URL after the production domain is confirmed.
- [ ] Set the Cloudflare Pages `SITE_URL` environment variable to the final HTTPS production origin after the custom domain is connected.
- [ ] Review Cloudflare bot protection and WAF rules to ensure Googlebot, Bingbot, and OAI-SearchBot can fetch public pages without a JavaScript challenge or block.
- [ ] Add Open Graph title, description, image, type, and production URL metadata.
- [ ] Add X/Twitter card metadata.
- [ ] Add a production-ready favicon and application icons.
- [x] Add `robots.txt` with explicit access for Googlebot, Bingbot, and OAI-SearchBot.
- [x] Generate `sitemap.xml` during each build from `SITE_URL`, with `CF_PAGES_URL` as the deployment-domain fallback.
- [x] Add `ProfessionalService` structured data with the business name, service area, contact details, founder, Instagram profile, and service catalogue.
- [ ] Review the structured business metadata in `/index.html`, inside `<script id="business-structured-data">`. Confirm the name, description, phone, email, Singapore service area, founder details, Instagram URL, and service list; after the production domain is confirmed, add its canonical `url`, stable `@id`, logo, and representative image.
- [x] Add service-specific structured data for wedding photography, videography, pre-wedding shoots, and proposals.
- [x] Replace generic gallery alt text such as `Wedding day gallery 1` with concise descriptions of the visible scene.
- [ ] Review all image alt text and leave decorative images with an empty alt attribute where appropriate.
- [ ] Confirm that the production site returns indexable HTML and correct status codes for the main route.
- [ ] Register the production domain with Google Search Console after launch and submit the sitemap.
- [ ] Register the production domain with Bing Webmaster Tools after launch and submit the sitemap.

## AEO and GEO roadmap

AEO/GEO should be treated as strong technical SEO plus clear business identity, original first-hand content, crawlability, and external corroboration. Google states that there is no special AI schema or AI-readable file required for its generative search features.

### Already implemented

- [x] Explicitly allow Googlebot, Bingbot, and OAI-SearchBot.
- [x] Generate an XML sitemap for the homepage and all three service pages.
- [x] Create dedicated Wedding Day, Pre-wedding, and Proposal service pages.
- [x] Give each service page a unique search title and meta description.
- [x] Add visible service FAQs.
- [x] Add business, service, offer, and FAQ structured data.
- [x] Use descriptive image names and meaningful alt text.
- [x] Add internal links between the homepage and service pages.

### Next technical priorities

- [ ] Pre-render or statically generate the homepage and each service page so their title, description, canonical link, visible content, and structured data are present in the initial HTML rather than relying on client-side JavaScript.
- [ ] After the final domain is confirmed, set `SITE_URL` and generate production canonical URLs for `/`, `/wedding-day`, `/pre-wedding`, and `/proposal`.
- [ ] Add a stable production `@id`, canonical `url`, logo URL, and representative image URLs to the business entity metadata.
- [ ] Redirect HTTP, `www`, preview-domain, trailing-slash, and other duplicate URL variants to the chosen canonical URLs where applicable.
- [ ] Ensure Cloudflare bot protection does not show a managed challenge or block to Googlebot, Bingbot, or OAI-SearchBot.
- [ ] Add Open Graph and X/Twitter metadata with an appropriate social-preview image.
- [ ] Validate the deployed structured data with Google's Rich Results Test and Schema.org validator.

### Business entity and local discovery

- [ ] Confirm the official business name, telephone, email, Singapore service area, founder name, logo, and genuine social/profile URLs.
- [ ] Add a physical address only if it is a genuine public-facing business location; do not invent or expose a private address solely for structured data.
- [ ] Claim or update the Google Business Profile after launch.
- [ ] Register or update the business in Bing Places.
- [ ] Keep the business name, phone number, service area, domain, and profile information consistent across the website and external listings.
- [ ] Add genuine portfolio photographs and request honest client reviews on appropriate public profiles.
- [ ] Seek relevant, genuine citations and links from wedding venues, planners, vendors, publications, and Singapore wedding directories.

### Answer-oriented and first-hand content

- [ ] Expand visible answers for package inclusions, coverage duration, photography versus videography, booking, availability, delivery timelines, destination coverage, wet-weather plans, and location recommendations.
- [ ] Keep important answers in visible page text, not only in structured data.
- [ ] Do not expect FAQ markup to create a Google FAQ rich result; Google has retired FAQ rich-result visibility. Retain useful FAQs for visitors and machine comprehension.
- [ ] Publish first-hand wedding and proposal case studies using original photographs, real locations, practical decisions, and the photographer's own observations.
- [ ] With permission, include specific client quotations and the real context behind the photographed celebration.
- [ ] Prioritize useful Singapore-specific content over generic keyword articles or large numbers of near-duplicate location pages.
- [ ] Add or strengthen an About page covering Madhu's experience since 2013, approach, expertise, and genuine external profiles or features.

### Registration and measurement after launch

- [ ] Verify the production domain in Google Search Console.
- [ ] Submit the production sitemap and inspect all four primary URLs in Search Console.
- [ ] Verify the production domain in Bing Webmaster Tools and submit the sitemap.
- [ ] Enable IndexNow for new, updated, and removed URLs.
- [ ] Track enquiries, organic landing pages, image-search traffic, and conversions without collecting unnecessary personal information.
- [ ] Track ChatGPT referrals using the `utm_source=chatgpt.com` parameter included in ChatGPT referral URLs.
- [ ] Review Bing Webmaster Tools AI Performance reporting if it becomes available for the site.
- [ ] Review Google Search Console generative-AI reporting if it becomes available for the site.
- [ ] Recheck crawling, indexing, structured data, sitemap processing, and canonical selection after significant releases.

### Avoid low-value work

- [ ] Do not create `llms.txt` or custom AI-only markup merely because it is marketed as an AEO requirement; Google says no special AI-readable file or schema is required.
- [ ] Do not generate many thin pages for every possible query variation.
- [ ] Do not add ratings, reviews, addresses, awards, credentials, or business details to structured data unless they are true and visible or otherwise verifiable.
- [ ] Do not treat structured data as a ranking guarantee; it must accurately match the visible content.

### Primary references

- Google AI features and websites: https://developers.google.com/search/docs/appearance/ai-features
- Google generative-AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google SEO starter guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google structured-data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization
- Google LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- OpenAI publisher guidance: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- OpenAI crawler documentation: https://developers.openai.com/api/docs/bots
- Bing sitemap and AI-search guidance: https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search
- Bing Webmaster Tools guidance: https://blogs.bing.com/webmaster/June-2025/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility

## Priority 3 — Image and loading performance

- [x] Audit the legacy files in `public/assets/source/` and remove assets that are not used by the finished site.
- [ ] Convert suitable photography assets to AVIF and WebP while retaining a compatible fallback where needed.
- [ ] Create responsive image sizes rather than sending the same large image to every viewport.
- [ ] Add `srcset` and `sizes` to gallery, testimonial, profile, package, and hero images.
- [ ] Add intrinsic `width` and `height` attributes to every content image to reduce layout movement.
- [ ] Keep the first visible hero image eager and give it high fetch priority.
- [ ] Avoid loading all three full-resolution hero images immediately. Preload the first and defer or preload the remaining slides after the initial view is stable.
- [ ] Lazy-load the below-the-fold photographer and package images.
- [ ] Ensure the contact background image is served at an appropriate size for desktop and mobile.
- [ ] During the Cloudflare Pages production migration, evaluate the Cloudflare Images Free transformation tier (currently up to 5,000 unique transformations per month; recheck the limit and pricing before launch): https://developers.cloudflare.com/images/pricing/
- [ ] Trial Cloudflare image transformations on a small set of high-impact photographs first—especially the homepage hero, story heroes, and prominent full-width backgrounds. Compare LCP, delivered bytes, visual quality, cache behavior, and transformation usage against the generated responsive assets before considering broader gallery adoption. Keep an original-image fallback so exceeding the free transformation allowance cannot leave an image blank.
- [ ] Set long-lived cache headers for fingerprinted scripts, styles, fonts, and images in production.
- [ ] Confirm that production hosting uses Brotli or gzip compression.
- [ ] Check whether the copied source CSS, manifest, and other unused public assets can be removed from the production package.

## Priority 4 — JavaScript and rendering performance

- [ ] Run a production Lighthouse test after deployment; local development measurements are not representative.
- [ ] Record mobile and desktop scores for Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift.
- [ ] Confirm the hero is the Largest Contentful Paint element and optimize its image accordingly.
- [ ] Check whether the page can ship more meaningful HTML before React starts, through prerendering or server rendering.
- [ ] Reassess the carousel library's bundle cost if JavaScript performance becomes a measurable bottleneck. The current application bundle is approximately 220 KB before compression and 72 KB compressed.
- [ ] Confirm that carousel animations do not trigger expensive layout work on lower-powered mobile devices.
- [ ] Test on a throttled mid-range mobile profile and a slower network connection.

## Priority 5 — Carousel accessibility and control

- [ ] Add an explicit pause/play control to the hero and service carousels. Hover and focus pausing do not help every touch or assistive-technology user.
- [ ] Decide whether autoplay should stop after the first manual interaction instead of restarting automatically.
- [ ] Keep only the active or meaningfully visible slides exposed to assistive technology; the current accessibility tree includes all off-screen slides.
- [ ] Announce slide changes only when helpful and avoid interrupting screen-reader users during autoplay.
- [ ] Increase hero controls from approximately 32px and gallery controls from approximately 38px toward a 44px comfortable touch target.
- [ ] Confirm visible focus treatment for every carousel control against light and dark photographs.
- [ ] Test all carousel controls with keyboard-only navigation.
- [ ] Test swipe behavior without blocking normal vertical page scrolling.

## Priority 6 — General accessibility

- [ ] Run automated checks with Lighthouse and axe against the production build.
- [ ] Perform a complete keyboard-only pass and confirm a logical focus order.
- [ ] Confirm focus visibility for the header action, hero controls, gallery controls, form fields, submit button, and Instagram link.
- [ ] Test page zoom at 200% and 400% for clipping, overlap, and horizontal scrolling.
- [ ] Contrast-test body copy, uppercase labels, placeholder text, form borders, and text over photography.
- [ ] Do not rely on placeholder text as the only source of instructions.
- [ ] Add clear inline form error messages and connect each error to its field programmatically.
- [ ] Consider marking required fields with both visual and programmatic instructions rather than relying only on an asterisk.
- [ ] Confirm the date input has understandable instructions across browsers and screen readers.
- [ ] Test the page with VoiceOver on Safari and at least one additional screen-reader/browser combination.
- [ ] Verify that reduced-motion users receive a stable experience across every autoplaying or animated area.

## Priority 7 — Design and content polish

- [ ] Consider shortening the testimonial or elevating one memorable sentence in larger type to make it easier to scan.
- [ ] Review the testimonial photograph crop at intermediate tablet widths.
- [ ] Check that the new header action never collides with the centered brand at narrow widths.
- [ ] Review footer content after the production contact and privacy links are available.
- [ ] Consider adding a compact closing reassurance or contact action near the footer.
- [ ] Review the pricing heading wording and capitalization for consistency, including `Actual Day`, `Pre-wedding`, and time formatting.
- [ ] Review copy for consistent use of `pre-wedding`, `solemnisation`, `photography and videography`, and the brand name `ijós Moments`.

## Production launch checks

- [ ] Add the GitHub Pages URL to Google Search Console, verify ownership, and submit the sitemap.
- [ ] Add Cloudflare Web Analytics as the initial privacy-focused traffic analytics tool.
- [ ] Track visits to the Wedding Day, Pre-wedding, Proposal, and Stories pages.
- [ ] Track clicks on Instagram, email, phone, and the `Get in touch` action.
- [ ] Connect the enquiry form to real delivery before tracking form starts and successful submissions as conversions.
- [ ] Reconsider Google Analytics 4 only if paid campaigns, attribution, or detailed conversion funnels become necessary.
- [ ] Confirm the final production domain and canonical URL.
- [ ] Confirm HTTPS and redirect all alternate hostnames to the canonical hostname.
- [ ] Confirm there are no broken images, console errors, mixed-content requests, or missing fonts.
- [ ] Confirm social link previews on WhatsApp, iMessage, Slack, Facebook, and LinkedIn.
- [ ] Test the enquiry flow end to end using a real delivery address.
- [ ] Confirm analytics and consent requirements before adding tracking.
- [ ] Verify `robots.txt`, `sitemap.xml`, structured data, and canonical tags on the live URL.
- [ ] Run final Lighthouse tests on the live URL and record the results below.

## Final performance measurements

Fill this section after deployment.

| Measurement | Mobile | Desktop | Target |
|---|---:|---:|---:|
| Lighthouse performance | — | — | 90+ |
| Lighthouse accessibility | — | — | 95+ |
| Lighthouse SEO | — | — | 95+ |
| Largest Contentful Paint | — | — | ≤ 2.5s |
| Interaction to Next Paint | — | — | ≤ 200ms |
| Cumulative Layout Shift | — | — | ≤ 0.1 |
