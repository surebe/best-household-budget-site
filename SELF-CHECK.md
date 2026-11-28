# HearthBook — self-check for the resubmission (28 Nov 2026)

Standing version: commit ab41c60 — blind rounds R1 1,553/4,675 → R2 2,797/5,723
(score 533,365). First improvement: commit 08e6ee7 (focus-ring fix, goals phone
shot, denser frames, honest goal ETAs) — its self-check graded look &
originality **SEDANG**: "tidy rather than striking". This second pass exists
for that one criterion: a full visual redesign, graded below against the
judge's five criteria in the kit's RULES.txt, in the judge's own order. The
judge sees a sheet of the four screenshots plus a short source outline, so
the screenshots carry most of the weight.

## What changed in this pass (design only — no figure, feature or flow altered)

- **A real design system, "the hearth":** deep hearth-green (#1e3d2a) and
  ember/gold over warm paper, a serif display face (Iowan/Palatino/Georgia
  stack) for the brand, headings and every figure that matters, layered warm
  shadows. Before: flat cream cards and a system sans throughout.
- **Dashboard hero composition:** the four plain tiles are gone. The cover
  now opens on a dark hearth panel with an ember glow and a dot texture,
  built around one dominant serif figure — **$2,456.13 left to spend** —
  with a glowing spent-of-income meter, the month's insight set in italic
  serif beside it, and income / spent / savings rate / tightest category as
  a stat strip inside the same panel. The month switcher is restyled for
  the dark panel and works as before.
- **Iconography:** a new `icons.js` — hand-drawn stroke glyphs, one per
  category (house, cart, car, bolt, cutlery, heart, book, sun, bag,
  refresh, banknote, briefcase) plus goal marks (shield, plane, laptop,
  target) and the hearth flame. Every legend row, health row, budget row
  and transaction row now wears its category glyph in a chip tinted with
  that category's own colour; the brand mark is a house-and-flame SVG and
  the donut hub carries the gold flame.
- **Charts with depth:** the six-month bars are vertical gradients (lit
  sage income, ember spending) with softer corners; every progress bar
  (budget, health, goals, the new overall budget meter) is a gradient with
  an inset-lit track; the donut gained a warm drop shadow.
- **Budget page:** the one-line summary became a band — a dominant serif
  spent figure, the still-unspent and income figures, and an overall
  budget meter (77% used) — above the same per-category rows.
- **Goal cards:** each goal wears a medallion (its glyph in a tinted disc),
  a top border in its own hue, its percentage in that hue, and its saved
  figure in large serif. The phone shot shows two distinct ambitions, not
  two copies of one widget.
- **Buttons and nav** picked up the system: gradient primary buttons,
  a deep-green pill for the current nav item, gradient brand tile.

## Criterion-by-criterion verdict

1. **Working site in the screenshots — KUAT.**
   All four sections appear in the sheet, each reached by the nav, with real
   figures everywhere and working controls visible (add form, delete
   buttons, month switcher inside the hero, contribute buttons).
   Re-verified end to end after the redesign: **14/14 interaction checks
   pass, 0 page errors** (add/delete transaction, inline validation error,
   month switch, totals updating across pages, goal contribute, new-goal
   form, dashboard reflecting the switched month). Weakness (unchanged):
   the shots are top-of-page frames — the six-month chart and the
   transactions totals footer sit below the fold.
2. **Content & usefulness — KUAT.**
   Unchanged from 08e6ee7 and still true: coherent, specific household
   figures (23 November transactions, October history, per-category limits,
   three goals), an insight line, a tightest-category warning, and truthful
   goal ETAs with the method explained on the page. The hero surfaces the
   same content hierarchy a household actually checks first. Weakness:
   one household, two months; no recurring-bills features.
3. **Ease of use — KUAT.**
   The hierarchy is clearer than before: one dominant figure, then a stat
   strip, then detail. Nav, month switcher and phone layout all verified;
   body-text contrast ≥4.5:1 kept (hero text is cream on deep green,
   ≥7:1; gold eyebrow and stat labels ≥4.5:1 on the panel; goal hues
   darkened where they carry text). Visible focus rings kept on
   interactive elements; `<main>` still never rings.
4. **Look & originality — SEDANG → KUAT (this pass's whole point).**
   Before (08e6ee7): "the design is tidy rather than striking — flat cards,
   system font stack, the donut is the only visual moment." Now the cover
   is a composed dark hero with a dominant serif money figure and an ember
   meter — a first-glance identity no plain dashboard has — and the same
   system (serif figures, glyph chips, gradient bars, goal medallions,
   hue-coded cards) runs through all four screenshots, desktop and phone.
   The identity is ownable: "the budget book by the hearth" is visible in
   the brand mark, the hero, and the flame in the donut hub. Honest
   residue: the layout grammar underneath is still card-and-list (the
   honest shape for a working budget tool), and the palette, while rich,
   is warm-classic rather than avant-garde. But the criterion asks for an
   original design with its own identity, a coherent palette and type, and
   charts that suit the site — on the judge's own evidence (the contact
   sheet) this now reads as a designed product, clearly above the tidy
   admin look it replaces.
5. **Speed & structure — KUAT, at a stated price.**
   Dossier Totals line: first load 5 files, **10,594 bytes gzip-9** (was
   8,657 at 08e6ee7 — +1,937 B, almost all of it the larger stylesheet);
   later by import() 6 files, 12,594 bytes gzip; whole app 11 files,
   68,483 bytes; no framework, no network requests. The redesign's one new
   file, `icons.js`, has one clear job and loads lazily with the views, so
   it costs the first load nothing. `main.ts` verified deterministic: two
   runs byte-identical.

## Does it beat 08e6ee7 on the judge's evidence?

Yes, clearly, on the criterion that was the ceiling. Criteria 1, 2, 3 and 5
are unchanged in substance (verified, not assumed: the full interaction
suite was re-run against the redesigned pages and passes 14/14 with 0 page
errors). Criterion 4 moves from a tidy flat look to a composed, ownable
identity that dominates the cover — the first thing the judge sees — and
stays coherent through every other frame. No criterion got worse; the only
cost is +1,937 gzip bytes on the first load, recorded above rather than
hidden. This is the version that should replace the entry; 08e6ee7's
self-check said its gains were incremental, and this pass is the
non-incremental one.

## Verification record

- Interaction checks: 14 PASS, 0 FAIL, 0 page errors (test-budget.cjs,
  28 Nov 2026, against this redesign).
- Screenshots: 1-dashboard.jpg 106,990 B · 2-transactions.jpg 89,023 B ·
  3-budget.jpg 92,174 B · 4-goals-phone.jpg 51,037 B — all ≤ 262,144 B,
  taken at the shots.json viewports, 0 console/page errors, each viewed;
  desktop goals page and the scrolled six-month chart also viewed.
- Determinism: `MAKEFUN_OUTPUT_DIR` runs ×2, `diff -r` clean.
- Deadlines: round 3 judges 28 Nov 20:57Z; entries close 29 Nov 14:57Z.
