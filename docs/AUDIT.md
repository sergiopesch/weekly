# Project Audit

## Scope

This audit covers the current static Casa Weekly app:

- `index.html`
- `styles.css`
- `app.js`
- `family-guide/`
- `scripts/e2e-smoke.mjs`
- `README.md`

## Current Strengths

- The app runs without a build step.
- Weekly plans are stored per Monday week start.
- Grocery basket, avoid list, dietary toggles, locks, swaps, and optimisation are wired together.
- Family feedback is stored locally as favourites, skips, and notes.
- Settings shape planning behaviour through planning promises.
- The app exposes a friendly taste profile so the family can see what Casa is learning.
- The E2E smoke test exercises planner rendering, settings, grocery updates, feedback, week switching, and local persistence.

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

## Recommended Next Steps

- Add custom meal creation.
- Add meal ratings beyond heart/skip.
- Add export/import for the full family state.
- Add a larger recipe library with dietary metadata.
- Add a printable grocery list and weekly meal plan.
