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

- [ ] Replace the generic page title with a descriptive title, for example: `Singapore Wedding Photographer & Videographer | ijós Moments`.
- [ ] Add a concise meta description focused on Singapore wedding photography, videography, pre-wedding shoots, and proposals.
- [ ] Add a canonical URL after the production domain is confirmed.
- [ ] Add Open Graph title, description, image, type, and production URL metadata.
- [ ] Add X/Twitter card metadata.
- [ ] Add a production-ready favicon and application icons.
- [ ] Add `robots.txt`.
- [ ] Add `sitemap.xml` using the final production URL.
- [ ] Add `LocalBusiness` or `ProfessionalService` structured data with the business name, service area, contact details, Instagram profile, and canonical URL.
- [ ] Consider adding service-specific structured data for wedding photography, videography, pre-wedding shoots, and proposals.
- [ ] Replace generic gallery alt text such as `Wedding day gallery 1` with concise descriptions of the visible scene.
- [ ] Review all image alt text and leave decorative images with an empty alt attribute where appropriate.
- [ ] Confirm that the production site returns indexable HTML and correct status codes for the main route.
- [ ] Register the production domain with Google Search Console after launch and submit the sitemap.

## Priority 3 — Image and loading performance

- [ ] Audit the 68 files in `public/assets/source/` and remove assets that are not used by the finished site.
- [ ] Convert suitable photography assets to AVIF and WebP while retaining a compatible fallback where needed.
- [ ] Create responsive image sizes rather than sending the same large image to every viewport.
- [ ] Add `srcset` and `sizes` to gallery, testimonial, profile, package, and hero images.
- [ ] Add intrinsic `width` and `height` attributes to every content image to reduce layout movement.
- [ ] Keep the first visible hero image eager and give it high fetch priority.
- [ ] Avoid loading all three full-resolution hero images immediately. Preload the first and defer or preload the remaining slides after the initial view is stable.
- [ ] Lazy-load the below-the-fold photographer and package images.
- [ ] Ensure the contact background image is served at an appropriate size for desktop and mobile.
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

