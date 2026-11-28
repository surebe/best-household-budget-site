// Dashboard: a dark hearth hero built around the one figure the household
// checks first — what is left to spend — with the month's other totals as a
// stat strip inside it; then the spending donut, budget health (the three
// categories nearest their limit), recent transactions, and the six-month
// income-vs-spending chart.

import { CATEGORY_MAP, money, money0, monthLabel } from '../data.js';
import { byCategory, monthTxns, sixMonthSeries, store, tightestCategories, totals } from '../store.js';
import { donut, incomeVsSpent } from '../charts.js';
import { chipStyle, icon } from '../icons.js';

export function render(el, go) {
  const t = totals();
  const cats = byCategory().filter((c) => c.spent > 0);
  const tight = tightestCategories();
  const recent = monthTxns().slice(0, 6);
  const series = sixMonthSeries();
  const rate = Math.round(t.savingsRate * 100);
  const spentShare = t.income > 0 ? Math.min(100, Math.round((t.spent / t.income) * 100)) : 0;
  const insight =
    t.left >= 0
      ? `You are ${money(t.left)} ahead this month — at this pace the emergency fund is about a month from full.`
      : `You are ${money(-t.left)} over income this month — check the budget page for the tightest categories.`;

  el.innerHTML = `
  <section class="hero" aria-labelledby="page-title">
    <div class="hero-head">
      <div>
        <h1 id="page-title">Your household at a glance</h1>
        <p class="lede">Income, spending and savings for the whole household — one page, no surprises.</p>
      </div>
      ${monthSwitcher()}
    </div>
    <div class="hero-body">
      <div class="hero-figure">
        <p class="hero-eyebrow">${icon('flame')} Left to spend · ${monthLabel(store.month)}</p>
        <p class="hero-amount ${t.left < 0 ? 'negative' : ''}">${money(t.left)}</p>
        <div class="hero-meter" role="img" aria-label="Spent ${money(t.spent)} of ${money(t.income)} income, ${spentShare} percent"><span style="width:${spentShare}%"></span></div>
        <p class="hero-caption">Spent <b>${money(t.spent)}</b> of <b>${money(t.income)}</b> income · ${money0(t.spent / daysSoFar())} a day so far</p>
      </div>
      <p class="hero-insight">${insight}</p>
    </div>
    <dl class="hero-stats" aria-label="Monthly totals">
      <div class="hstat"><dt>Income</dt><dd>${money(t.income)}</dd><dd class="hstat-sub">${t.count} transactions in ${monthLabel(store.month)}</dd></div>
      <div class="hstat"><dt>Spent</dt><dd>${money(t.spent)}</dd><dd class="hstat-sub">across ${cats.length} categories</dd></div>
      <div class="hstat"><dt>Savings rate</dt><dd>${rate}%</dd><dd class="hstat-sub">${rate >= 20 ? 'above the 20% rule of thumb' : 'below the 20% rule of thumb'}</dd></div>
      <div class="hstat"><dt>Tightest category</dt><dd>${tight[0] ? Math.round(tight[0].pct * 100) + '%' : '—'}</dd><dd class="hstat-sub">${tight[0] ? `${tight[0].label} is nearest its limit` : 'nothing spent yet'}</dd></div>
    </dl>
  </section>

  <div class="dash-grid">
    <section class="card" aria-labelledby="donut-title">
      <h2 id="donut-title">Where the money went</h2>
      ${donut(cats, t.spent)}
      <ul class="legend">
        ${cats.map((c) => `<li><span class="cat-chip" style="${chipStyle(c.color)}">${icon(c.id)}</span>${c.label}<span class="legend-share">${Math.round((c.spent / Math.max(1, t.spent)) * 100)}%</span><b>${money(c.spent)}</b></li>`).join('')}
      </ul>
      <details class="data-table"><summary>Spending by category as a table</summary>
        <table><thead><tr><th scope="col">Category</th><th scope="col">Spent</th><th scope="col">Share</th></tr></thead>
        <tbody>${cats.map((c) => `<tr><td>${c.label}</td><td>${money(c.spent)}</td><td>${Math.round((c.spent / Math.max(1, t.spent)) * 100)}%</td></tr>`).join('')}</tbody></table>
      </details>
    </section>

    <div class="dash-side">
      <section class="card" aria-labelledby="health-title">
        <h2 id="health-title">Budget health — nearest the limit</h2>
        <ul class="health-list">
          ${tight.map((c) => `<li><span class="health-name"><span class="cat-chip" style="${chipStyle(c.color)}">${icon(c.id)}</span>${c.label}</span><span class="health-bar"><span style="width:${Math.min(100, Math.round(c.pct * 100))}%" class="${barClass(c.pct)}"></span></span><b>${Math.round(c.pct * 100)}%</b><span class="health-left">${money(Math.max(0, c.limit - c.spent))} left</span></li>`).join('')}
        </ul>
        <p class="card-link"><a href="#/budget">See the full budget →</a></p>
      </section>

      <section class="card" aria-labelledby="recent-title">
        <h2 id="recent-title">Recent transactions</h2>
        <ul class="txn-list">
          ${recent.map((txn) => txnRow(txn)).join('')}
        </ul>
        <p class="card-link"><a href="#/transactions">All transactions →</a></p>
      </section>
    </div>
  </div>

  <section class="card chart-card" aria-labelledby="trend-title">
    <h2 id="trend-title">Six months: income vs spending</h2>
    <p class="card-sub">June to September are the household’s recorded totals; October and November come from the transactions on this site, so adding or deleting one moves the bars.</p>
    <div class="legend-inline"><span><i class="swatch" style="background:#4d7c59"></i>Income</span><span><i class="swatch" style="background:#c96f4a"></i>Spending</span></div>
    ${incomeVsSpent(series)}
    <details class="data-table"><summary>Monthly figures as a table</summary>
      <table><thead><tr><th scope="col">Month</th><th scope="col">Income</th><th scope="col">Spent</th><th scope="col">Saved</th></tr></thead>
      <tbody>${series.map((r) => `<tr><td>${monthLabel(r.month)}</td><td>${money(r.income)}</td><td>${money(r.spent)}</td><td>${money(r.income - r.spent)}</td></tr>`).join('')}</tbody></table>
    </details>
  </section>`;

  el.querySelectorAll('[data-month]').forEach((btn) => {
    btn.addEventListener('click', () => go(btn.dataset.month));
  });
}

export function monthSwitcher() {
  const months = ['2026-10', '2026-11'];
  const i = months.indexOf(store.month);
  const prev = months[i - 1];
  const next = months[i + 1];
  return `<div class="month-switch" role="group" aria-label="Choose month">
    <button type="button" data-month="${prev ?? ''}" ${prev ? '' : 'disabled'} aria-label="Previous month: October 2026">‹</button>
    <span class="month-label" aria-current="true">${monthLabel(store.month)}</span>
    <button type="button" data-month="${next ?? ''}" ${next ? '' : 'disabled'} aria-label="Next month: November 2026">›</button>
  </div>`;
}

// Days elapsed in the viewed month (26 for November, the whole of October).
function daysSoFar() {
  return store.month === '2026-11' ? 26 : 31;
}

export function barClass(pct) {
  if (pct > 1) return 'bar-over';
  if (pct > 0.85) return 'bar-warn';
  return 'bar-ok';
}

export function txnRow(txn) {
  const cat = CATEGORY_MAP[txn.category];
  const day = new Date(txn.date + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const sign = txn.kind === 'in' ? '+' : '−';
  return `<li><span class="txn-day">${day}</span><span class="cat-chip" style="${chipStyle(cat ? cat.color : '#8c8c8c')}">${icon(txn.category)}</span><span class="txn-note">${txn.note}</span><span class="txn-cat">${cat ? cat.label : ''}</span><b class="txn-amount ${txn.kind}">${sign}${money(txn.amount)}</b></li>`;
}
