# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

Prototype-specific preference: keep scroll-triggered motion isolated and easy to replace; avoid janky scroll animations. The Pixieset branding/footer banner must not appear.

Desktop hero preference: use white text directly over the photograph near the upper-left, matching mobile; do not use a desktop background fade.

Contact section preference: use `/assets/source/2e4d33a64348961a.jpg` as the full-section background, with white contact copy and the form in a warm-white panel on the left.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
