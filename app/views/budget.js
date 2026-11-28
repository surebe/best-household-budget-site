// Budget: one row per spending category — limit, spent live from the store,
// progress bar (sage under 85%, terracotta over 85%, red over 100%), remaining —
// plus a line of advice computed from the tightest category.

import { money, monthLabel } from '../data.js';
import { byCategory, store, tightestCategories, totals } from '../store.js';
import { barClass, monthSwitcher } from './dashboard.js';
import { chipStyle, icon } from '../icons.js';

export function render(el, go) {
  const cats = byCategory();
  const t = totals();
  const totalLimit = cats.reduce((s, c) => s + c.limit, 0);
  const totalSpent = cats.reduce((s, c) => s + c.spent, 0);
  const tight = tightestCategories(store.month, 1)[0];
  const advice =
    tight.pct > 1
      ? `${tight.label} is ${money(tight.spent - tight.limit)} over its ${money(tight.limit)} limit — move the extra from a category with room, or trim it next month.`
      : tight.pct > 0.85
        ? `${tight.label} is at ${Math.round(tight.pct * 100)}% of its ${money(tight.limit)} limit, with ${money(tight.limit - tight.spent)} left for the rest of ${monthLabel(store.month)}. That is the category to watch.`
        : `Every category is inside its limit. ${tight.label} is the tightest at ${Math.round(tight.pct * 100)}% — ${money(tight.limit - tight.spent)} still to spend.`;

  el.innerHTML = `
  <section class="page-head" aria-labelledby="page-title">
    <div>
      <h1 id="page-title">Budget for ${monthLabel(store.month)}</h1>
      <p class="lede">A limit for every kind of spending, and the bars move the moment you add or delete a transaction.</p>
    </div>
    ${monthSwitcher()}
  </section>

  <section class="card budget-band" aria-labelledby="summary-title">
    <h2 id="summary-title" class="visually-hidden">Budget summary</h2>
    <div class="band-main">
      <div>
        <p class="band-eyebrow">Spent of the month’s budget</p>
        <p class="band-figure">${money(totalSpent)} <span>of ${money(totalLimit)}</span></p>
        <p class="band-sub"><b>${money(totalLimit - totalSpent)}</b> still unspent across all categories · income this month <b>${money(t.income)}</b></p>
      </div>
      <div class="band-meter">
        <div class="budget-bar band-bar" role="img" aria-label="Total: ${money(totalSpent)} spent of a ${money(totalLimit)} budget, ${Math.round((totalSpent / Math.max(1, totalLimit)) * 100)} percent"><span style="width:${Math.min(100, Math.round((totalSpent / Math.max(1, totalLimit)) * 100))}%" class="${barClass(totalSpent / Math.max(1, totalLimit))}"></span></div>
        <p class="band-meter-label">${Math.round((totalSpent / Math.max(1, totalLimit)) * 100)}% of the budget used</p>
      </div>
    </div>
    <p class="insight">${advice}</p>
  </section>

  <section class="card" aria-labelledby="rows-title">
    <h2 id="rows-title" class="visually-hidden">Spending by category</h2>
    <ul class="budget-rows">
      ${cats.map((c) => {
        const pct = Math.round(c.pct * 100);
        const remaining = c.limit - c.spent;
        const status = c.pct > 1 ? `over by ${money(-remaining)}` : `${money(remaining)} left`;
        return `<li>
          <div class="budget-row-head"><span class="budget-name"><span class="cat-chip" style="${chipStyle(c.color)}">${icon(c.id)}</span>${c.label}</span><span class="budget-numbers"><b>${money(c.spent)}</b> of ${money(c.limit)}</span></div>
          <div class="budget-bar" role="img" aria-label="${c.label}: ${money(c.spent)} spent of a ${money(c.limit)} limit, ${pct} percent"><span style="width:${Math.min(100, pct)}%" class="${barClass(c.pct)}"></span></div>
          <div class="budget-row-foot"><span>${pct}% used</span><span class="${c.pct > 1 ? 'over' : ''}">${status}</span></div>
        </li>`;
      }).join('')}
    </ul>
  </section>

  <section class="card" aria-labelledby="how-title">
    <h2 id="how-title">How the limits were set</h2>
    <p>Limits come from the last three months of real spending, rounded to the nearest $5 and trimmed where the household agreed to cut back — groceries $650 after three months averaging $640, dining out $180 after the family chose two restaurant nights a month instead of four. A limit is a plan, not a punishment: going over one category is fine when another has room.</p>
    <p class="card-link"><a href="#/transactions">Add a transaction to see the bars move →</a></p>
  </section>`;

  el.querySelectorAll('[data-month]').forEach((btn) => {
    btn.addEventListener('click', () => go(btn.dataset.month));
  });
}
