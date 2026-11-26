// Transactions: the add form (kind toggle, amount, category that follows the
// kind, date defaulting to the viewed month, note) that really adds; the list
// grouped by day with per-row delete buttons that really delete; a category
// filter; and a totals footer for the filtered view.

import { CATEGORIES, CATEGORY_MAP, money, monthLabel } from '../data.js';
import { addTransaction, deleteTransaction, monthTxns, store } from '../store.js';
import { monthSwitcher } from './dashboard.js';

export function render(el, go) {
  const filter = store.filterCategory;
  let txns = monthTxns();
  if (filter !== 'all') txns = txns.filter((t) => t.category === filter);
  const income = txns.filter((t) => t.kind === 'in').reduce((s, t) => s + t.amount, 0);
  const spent = txns.filter((t) => t.kind === 'out').reduce((s, t) => s + t.amount, 0);

  // Group by day, latest day first.
  const days = [];
  for (const txn of txns) {
    const last = days[days.length - 1];
    if (last && last.date === txn.date) last.txns.push(txn);
    else days.push({ date: txn.date, txns: [txn] });
  }

  el.innerHTML = `
  <section class="page-head" aria-labelledby="page-title">
    <div>
      <h1 id="page-title">Transactions</h1>
      <p class="lede">Every dollar in and out, grouped by day. Add one, delete one — the dashboard, budget and goals all update.</p>
    </div>
    ${monthSwitcher()}
  </section>

  <div class="txn-grid">
    <section class="card form-card" aria-labelledby="add-title">
      <h2 id="add-title">Add a transaction</h2>
      <form id="add-form" novalidate>
        <fieldset class="kind-toggle">
          <legend>Kind</legend>
          <label><input type="radio" name="kind" value="out" checked> Spending</label>
          <label><input type="radio" name="kind" value="in"> Income</label>
        </fieldset>
        <p class="field">
          <label for="f-amount">Amount ($)</label>
          <input id="f-amount" name="amount" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="0.00" required>
        </p>
        <p class="field">
          <label for="f-category">Category</label>
          <select id="f-category" name="category"></select>
        </p>
        <p class="field">
          <label for="f-date">Date</label>
          <input id="f-date" name="date" type="date" value="${defaultDate()}" required>
        </p>
        <p class="field">
          <label for="f-note">Note</label>
          <input id="f-note" name="note" type="text" maxlength="80" placeholder="e.g. Weekly shop — market">
        </p>
        <p class="form-error" id="form-error" role="alert" hidden></p>
        <p><button type="submit" class="btn-primary">Add transaction</button></p>
        <p class="form-note" id="form-note" aria-live="polite"></p>
      </form>
    </section>

    <section class="card list-card" aria-labelledby="list-title">
      <div class="list-head">
        <h2 id="list-title">${monthLabel(store.month)} — ${txns.length} transaction${txns.length === 1 ? '' : 's'}</h2>
        <p class="field inline-filter">
          <label for="f-filter">Show</label>
          <select id="f-filter">
            <option value="all">All categories</option>
            ${[...CATEGORIES.in, ...CATEGORIES.out].map((c) => `<option value="${c.id}" ${filter === c.id ? 'selected' : ''}>${c.label}</option>`).join('')}
          </select>
        </p>
      </div>
      ${days.length === 0 ? '<p class="empty">No transactions in this category this month yet.</p>' : days.map((day) => `
        <h3 class="day-head">${dayLabel(day.date)}</h3>
        <ul class="txn-list full">
          ${day.txns.map((txn) => `
          <li>
            <span class="txn-note">${txn.note}</span>
            <span class="txn-cat">${CATEGORY_MAP[txn.category]?.label ?? ''}</span>
            <b class="txn-amount ${txn.kind}">${txn.kind === 'in' ? '+' : '−'}${money(txn.amount)}</b>
            <button type="button" class="btn-delete" data-delete="${txn.id}" aria-label="Delete ${txn.note}, ${money(txn.amount)}">Delete</button>
          </li>`).join('')}
        </ul>`).join('')}
      <footer class="totals-footer" aria-label="Filtered totals">
        <span>In <b class="in">${money(income)}</b></span>
        <span>Out <b class="out">${money(spent)}</b></span>
        <span>Net <b>${money(income - spent)}</b></span>
      </footer>
    </section>
  </div>`;

  const form = el.querySelector('#add-form');
  const categorySelect = el.querySelector('#f-category');
  const errorEl = el.querySelector('#form-error');
  const noteEl = el.querySelector('#form-note');

  const fillCategories = (kind) => {
    categorySelect.innerHTML = CATEGORIES[kind]
      .map((c) => `<option value="${c.id}">${c.label}</option>`)
      .join('');
  };
  fillCategories('out');
  form.querySelectorAll('input[name="kind"]').forEach((radio) => {
    radio.addEventListener('change', () => fillCategories(radio.value));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const amount = Number(data.get('amount'));
    const date = String(data.get('date') || '');
    if (!Number.isFinite(amount) || amount <= 0) {
      errorEl.textContent = 'Enter an amount greater than $0.00.';
      errorEl.hidden = false;
      el.querySelector('#f-amount').focus();
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errorEl.textContent = 'Pick a date for this transaction.';
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;
    const txn = addTransaction({
      kind: String(data.get('kind')),
      category: String(data.get('category')),
      amount: Math.round(amount * 100) / 100,
      date,
      note: String(data.get('note') || ''),
    });
    // Jump the month switcher to the month the transaction landed in.
    store.month = txn.date.slice(0, 7);
    render(el, go);
    const note = el.querySelector('#form-note');
    if (note) note.textContent = `Added ${txn.note} — ${money(txn.amount)}.`;
  });

  el.querySelector('#f-filter').addEventListener('change', (event) => {
    store.filterCategory = event.target.value;
    render(el, go);
  });

  el.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      deleteTransaction(btn.dataset.delete);
      render(el, go);
      const note = el.querySelector('#form-note');
      if (note) note.textContent = 'Transaction deleted.';
    });
  });

  el.querySelectorAll('[data-month]').forEach((btn) => {
    btn.addEventListener('click', () => go(btn.dataset.month));
  });
}

function defaultDate() {
  // Today inside the viewed month (26 November), or the 26th of October.
  return store.month === '2026-11' ? '2026-11-26' : '2026-10-26';
}

function dayLabel(date) {
  return new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
