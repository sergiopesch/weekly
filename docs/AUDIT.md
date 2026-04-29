# Project Audit

## Scope

This audit covers the current static Casa Weekly app:

- `index.html`
- `styles.css`
- `app.js`
- `family-guide/`
- `scripts/check-static.mjs`
- `scripts/check-syntax.mjs`
- `scripts/e2e-smoke.mjs`
- `scripts/capture-banner.mjs`
- `.github/workflows/ci.yml`
- `.github/dependabot.yml`
- `README.md`

## Current Strengths

- The app runs without a build step.
- Weekly plans are stored per Monday week start.
- Grocery basket, avoid list, dietary toggles, locks, swaps, and optimisation are wired together.
- Family feedback is stored locally as favourites, skips, and notes.
- Settings shape planning behaviour through planning promises.
- The app exposes a friendly taste profile so the family can see what Casa is learning.
- The E2E smoke test exercises planner rendering, settings, grocery updates, feedback, week switching, and local persistence.
- Static checks validate the web manifest, favicon wiring, app icon, and README banner asset.
- GitHub Actions now runs the same test suite on pushes to the default branch and on pull requests.
- CI has read-only permissions, concurrency cancellation, a job timeout, and manual workflow dispatch support.
- Dependabot monitors GitHub Actions updates weekly.
- The README banner can be refreshed from the real product UI with `npm run banner`.

## Framework Fit

Casa Weekly now has a clear agentic planning loop:

- Guide: family settings and markdown starter templates.
- Observe: current week, meals, pantry, dietary needs, and feedback.
- Learn: favourites, skips, notes, and derived taste profile.
- Plan: deterministic scoring and week-specific plans.
- Explain: weekly helper cards and guide preview.

## Product Risks

- The meal library is still small. Personalisation quality will improve as the recipe set grows.
- `localStorage` is private to one browser and device. Cross-device sync would need a backend or export/import flow.
- Nutrition is qualitative, not clinical. The app should not imply medical or dietetic authority.
- Clearing learning is immediate. A future pass could add undo or confirmation.

## Technical Risks

- `app.js` is intentionally dependency-free but large. If the app grows, split data, state, rendering, and planning into modules.
- The E2E test uses Chromium remote debugging directly to avoid dependencies. It is useful but lower-level than Playwright.
- Downloaded guide files are exports; the app does not re-import them yet.
- CI depends on the Chrome binary available on GitHub-hosted runners. Locally, set `CHROMIUM_BIN` if `chromium` is not the installed browser command.

## Recommended Next Steps

- Add custom meal creation.
- Add meal ratings beyond heart/skip.
- Add export/import for the full family state.
- Add a larger recipe library with dietary metadata.
- Add a printable grocery list and weekly meal plan.
