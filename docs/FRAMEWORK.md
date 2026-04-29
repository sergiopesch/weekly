# Casa Weekly Framework

Casa Weekly is a personalised family meal-planning framework. It is intentionally local-first: the app learns from browser-local settings and feedback, not from external accounts or hidden files.

## Framework Loop

Casa follows a simple loop:

1. **Guide**
   - Home style
   - Household context
   - Planning promises
   - Family learning

2. **Observe**
   - Current week
   - Planned meals
   - Grocery basket
   - Dietary toggles
   - Avoid list
   - Favourites, skips, and notes

3. **Learn**
   - Favourite meals increase future meal scores.
   - Skipped meals reduce future meal scores.
   - Notes are stored as family context.
   - The taste profile summarises confidence, most-loved meals, skipped meals, and ingredients to reuse.

4. **Plan**
   - Each week gets its own plan keyed by Monday start date.
   - New weeks are suggested from groceries, guide settings, and learned feedback.
   - Locked slots are preserved during optimisation.

5. **Explain**
   - Weekly helpers explain why the current week is shaped the way it is.
   - Settings show what Casa currently understands.
   - The family guide can be previewed or downloaded as markdown.

## Four-Part Guide

The `family-guide/` folder provides standalone starter templates:

- `SOUL.md`: home style
- `USER.md`: household
- `AGENTS.md`: planning promises
- `MEMORY.md`: family learning

These files are project templates. The running app does not read another system's settings and does not import external memory.

## Runtime State

Live state is stored in `localStorage` under `casa-weekly-v1`.

Core fields:

```js
{
  weekStart,
  profile,
  avoid,
  pantry,
  weeks,
  memory,
  settings
}
```

`weeks` keeps separate meal plans by Monday date:

```js
weeks["2026-04-27"] = {
  plan,
  locked,
  notes,
  updatedAt
}
```

`memory` keeps learned feedback:

```js
memory = {
  favorites,
  skips,
  notes,
  lastUpdatedAt
}
```

## Planning Signals

Meal ranking is influenced by:

- grocery reuse
- ingredient overlap for waste reduction
- toddler-friendly meals
- quick meals
- favourite meals
- skipped meals
- avoid-list ingredients
- enabled planning promises

This is intentionally transparent and deterministic. It is agentic in structure, but not opaque.

## Product Language

The app should avoid technical terms in the main UI. Use:

- "Weekly helpers" instead of "agents"
- "Family learning" instead of "memory"
- "Planning promises" instead of "system instructions"
- "Taste profile" instead of "model state"

The technical model can be documented for maintainers, but family users should only see plain, useful language.
