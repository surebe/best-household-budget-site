// HearthBook store: the single source of truth every view reads through, so an
// edit on any page updates every other page. State lives in memory only — a fresh
// load always starts from the seed in data.js.

import { BUDGETS, CATEGORIES, GOALS, HISTORY, MONTHS, SEED } from './data.js';

export const store = {
  month: '2026-11',
  transactions: SEED.map((t) => ({ ...t })),
  goals: GOALS.map((g) => ({ ...g })),
  filterCategory: 'all',
  nextId: 1000,
};

export function availableMonths() {
  return MONTHS;
}

export function setMonth(ym) {
  if (MONTHS.includes(ym)) store.month = ym;
}

export function monthTxns(ym = store.month) {
  return store.transactions
    .filter((t) => t.date.startsWith(ym))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id.localeCompare(a.id)));
}

export function totals(ym = store.month) {
  const txns = monthTxns(ym);
  let income = 0;
  let spent = 0;
  for (const t of txns) {
    if (t.kind === 'in') income += t.amount;
    else spent += t.amount;
  }
  const left = income - spent;
  return { income, spent, left, savingsRate: income > 0 ? left / income : 0, count: txns.length };
}

// Spending per category for a month, highest first, with each category's limit.
export function byCategory(ym = store.month) {
  const spent = {};
  for (const t of monthTxns(ym)) {
    if (t.kind === 'out') spent[t.category] = (spent[t.category] ?? 0) + t.amount;
  }
  return CATEGORIES.out
    .map((c) => ({
      ...c,
      spent: spent[c.id] ?? 0,
      limit: BUDGETS[c.id],
      pct: (spent[c.id] ?? 0) / BUDGETS[c.id],
    }))
    .sort((a, b) => b.spent - a.spent);
}

// The categories closest to (or over) their monthly limit.
export function tightestCategories(ym = store.month, n = 3) {
  return [...byCategory(ym)].sort((a, b) => b.pct - a.pct).slice(0, n);
}

export function addTransaction({ kind, category, amount, date, note }) {
  const txn = {
    id: 'u' + store.nextId++,
    date,
    kind,
    category,
    note: note.trim() || CATEGORIES_MAP_LABEL(category),
    amount,
  };
  store.transactions.push(txn);
  return txn;
}

function CATEGORIES_MAP_LABEL(category) {
  const found = [...CATEGORIES.in, ...CATEGORIES.out].find((c) => c.id === category);
  return found ? found.label : 'Transaction';
}

export function deleteTransaction(id) {
  const i = store.transactions.findIndex((t) => t.id === id);
  if (i >= 0) store.transactions.splice(i, 1);
  return i >= 0;
}

export function goalProgress() {
  return store.goals.map((g) => ({
    ...g,
    pct: g.saved / g.target,
    remaining: Math.max(0, g.target - g.saved),
  }));
}

// A planned contribution: adds to the goal's saved total. It is a plan, not a
// transaction — it does not move money out of any category.
export function contribute(goalId, amount) {
  const g = store.goals.find((x) => x.id === goalId);
  if (!g) return null;
  g.saved = Math.min(g.target, Math.round((g.saved + amount) * 100) / 100);
  return g;
}

export function addGoal(name, target) {
  const goal = { id: 'g' + store.nextId++, name: name.trim(), target, saved: 0 };
  store.goals.push(goal);
  return goal;
}

// Months until a goal is fully funded at the current month's leftover pace.
// The leftover fills the goals in the order they are listed, so a later
// goal's date also counts the queue ahead of it. Returns null when nothing
// is being saved.
export function monthsToGoal(goal) {
  const { left } = totals();
  if (left <= 0) return null;
  const remaining = goal.target - goal.saved;
  if (remaining <= 0) return 0;
  let ahead = 0;
  for (const g of store.goals) {
    if (g.id === goal.id) break;
    ahead += Math.max(0, g.target - g.saved);
  }
  return Math.ceil((ahead + remaining) / left);
}

// Six months of income vs spending: the four HISTORY aggregates plus October
// and November computed live from the transactions, so an edit anywhere moves
// the chart.
export function sixMonthSeries() {
  const rows = HISTORY.map((h) => ({ month: h.month, income: h.income, spent: h.spent }));
  for (const ym of MONTHS) {
    const t = totals(ym);
    rows.push({ month: ym, income: t.income, spent: t.spent });
  }
  return rows;
}
