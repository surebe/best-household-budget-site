# HearthBook — self-check for the resubmission (28 Nov 2026)

Standing version: commit ab41c60 — blind rounds R1 1,553/4,675 → R2 2,797/5,723
(score 533,365). This revision was graded against the judge's five criteria in
the kit's RULES.txt, in the judge's own order. The judge sees a sheet of the
four screenshots plus a short source outline, so the screenshots carry most
of the weight.

## What changed

- Removed the blue focus ring that framed `<main>` in every screenshot
  (`main:focus` outline suppressed; `<main>` is a programmatic focus target,
  rings kept on interactive controls). It read as a rendering bug.
- Screenshot 4 is now the **Goals page at phone size** (390×844). Before, the
  sheet showed Dashboard, Transactions, Budget and the dashboard again on a
  phone — the whole Goals section was invisible to the judge. The new shot
  shows the goals section *and* the phone layout in one frame.
- Denser frames: tighter page rhythm (smaller h1, card/tile padding, donut
  220→192px, row padding). Budget shot now shows 6 categories (was 5),
  transactions one more day, dashboard recent list 2 rows (was 1).
- Donut legend now shows each category's share % next to its amount.
- Progress bars gained a subtle sheen; header a soft shadow; tiles match the
  cards' elevation. Phone nav fits on one row (was wrapping 3+1).
- Honest ETAs: `monthsToGoal` now fills goals in listed order at the month's
  leftover pace, so the cards no longer all claim "about 1 month"
  (Emergency fund 1 mo, Bali trip 2 mo, New laptop 2 mo), and the goals page
  explains the queue.

## Criterion-by-criterion verdict

1. **Working site in the screenshots — KUAT.**
   All four sections appear in the sheet, each reached by the nav, with real
   figures everywhere and working controls visible (add form, delete
   buttons, month switcher, contribute buttons). Screenshots and source
   agree — same seed data. Re-verified end to end: **14/14 interaction
   checks pass, 0 page errors** (add/delete transaction, inline validation
   error, month switch, totals updating across pages, goal contribute,
   new-goal form). Weakness: the shots are top-of-page frames — the
   six-month chart and the transactions totals footer sit below the fold,
   and the recent-transactions card shows 2 of its 6 rows.
2. **Content & usefulness — KUAT.**
   Coherent, specific household figures (23 November transactions, October
   history, per-category limits, three goals), an insight strip, a
   tightest-category warning, and now truthful goal ETAs with the method
   explained on the page. Weakness: one household and two months of data;
   no recurring-bills or shared-household features. Solid demo depth, not
   richer than the strongest rivals.
3. **Ease of use — KUAT.**
   Clear hierarchy, labelled nav with `aria-current`, month switcher on
   every money page, single-column phone layout that now fits its nav on
   one row, tabular numerals, body-text contrast ≥4.5:1, visible focus
   rings on interactive elements. No material weakness found.
4. **Look & originality — SEDANG (improved, still the softest criterion).**
   The identity is its own (HearthBook; warm paper, sage, terracotta,
   gold), palette and type are coherent, and the finish is cleaner than
   the standing version. Honest limit: the design is tidy rather than
   striking — flat cards, system font stack, the donut is the only visual
   moment. This is where a top rival most plausibly still beats us.
5. **Speed & structure — KUAT.**
   Dossier Totals line: first load 5 files, **8,657 bytes gzip-9**; the
   four views load later by `import()` (9,796 bytes gzip); whole app
   10 files, 53,205 bytes; no framework, no network requests. Source is
   split one job per file (data / store / charts / views). This revision
   cost +248 bytes gzip on the core files (style.css +732 raw) — accepted
   for the polish above. `main.ts` verified deterministic: two runs
   byte-identical.

## Does it beat the standing version?

Yes — on the evidence the judge actually reads. One more section is
visible, a visible defect (the ring) is gone, every frame carries more
real content, the phone layout is tidier, and the goal ETAs stopped
overpromising. The gains are real but incremental: criterion 4 remains
the ceiling, and no honest reading of this sheet promises a jump out of
the thousands on its own — it removes the reasons to rank *below* the
standing entry and gives the judge strictly more working site to credit.

## Verification record

- Interaction checks: 14 PASS, 0 FAIL (test-budget.cjs, 28 Nov 2026).
- Screenshots: 1-dashboard.jpg 107,138 B · 2-transactions.jpg 89,124 B ·
  3-budget.jpg 94,284 B · 4-goals-phone.jpg 49,282 B — all ≤ 262,144 B,
  taken at the shots.json viewports, 0 console/page errors, each viewed.
- Determinism: `MAKEFUN_OUTPUT_DIR` runs ×2, `diff -r` clean.
- Deadlines: round 3 judges 28 Nov 20:57Z; entries close 29 Nov 14:57Z.
