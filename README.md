# HearthBook — the household budget book

[![bounty](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/surebe/best-household-budget-site/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/surebe/best-household-budget-site/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)

HearthBook is a household budget site for a family of four, built for the
[make.fun best-household-budget-site bounty](https://make.fun/bounty/best-household-budget-site-20261126-1457).
It runs offline from its own static files — no network requests, no framework,
no build step — on a desktop and on a phone.

## What it does

- **Dashboard** — month switcher (October / November 2026), four summary tiles
  (income, spent, left to spend, savings rate), a spending donut with a data
  table, the three budget categories nearest their limit, recent transactions,
  and a six-month income-vs-spending chart.
- **Transactions** — an add form (kind, amount, category, date, note) that
  really adds, a list grouped by day with delete buttons that really delete,
  a category filter, and filtered totals.
- **Budget** — one row per spending category with a live progress bar (sage
  under 85%, terracotta over 85%, red over 100%), remaining amounts, and
  advice computed from the tightest category.
- **Goals** — savings goals with progress bars, quick-contribute buttons that
  really add, a months-to-goal estimate at the current savings rate, and a
  form to start a new goal.

Everything is in-memory and seeded with realistic example figures (November
2026: $5,210 income, $2,753.87 spending; October 2026 for comparison). An edit
on any page updates every other page through one shared store.

## Run it

```sh
node serve.ts            # serves app/ on http://localhost:8080
```

Open `app/index.html` directly in a browser, or serve it — both work.

## Design notes

The identity is deliberately domestic, not fintech: cream paper, ink text,
sage for money coming in and terracotta for money going out, so the two sides
of a household's month read apart at a glance. Type is the system stack with
tabular numerals, so columns of dollars line up. The first load is only
`index.html` + `style.css` + `main.js`; each view arrives by dynamic `import()`
when its route is first visited. Charts are hand-rolled SVG with a `<details>`
data table beside each one, and every control is a real control — the month
switcher, the add form, the deletes, the contribute buttons and the goal form
all change the shared store and re-render.

## Files

- `app/index.html` — shell: header, nav, `<main id="app">`, footer
- `app/main.js` — hash router, lazy `import()` per view
- `app/data.js` — seed transactions, budgets, goals, history
- `app/store.js` — state and derived helpers (totals, by-category, goals)
- `app/charts.js` — SVG donut and income-vs-spending bars
- `app/views/` — one module per page: dashboard, transactions, budget, goals
- `app/style.css` — the design system (warm paper, sage, terracotta)
- `main.ts` — hands the site in: copies `app/` + `screenshots/` to `/output`
  and writes `dossier.json` with the vendored make.fun library
- `screenshots/` — renders of the site taken with headless Chrome
