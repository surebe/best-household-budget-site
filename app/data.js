// HearthBook seed data: a household of four (two adults, two children) keeping its
// budget in dollars. November 2026 is the live month; October 2026 is history so the
// month switcher shows real change. Every figure below is invented example data.

export const CATEGORIES = {
  in: [
    { id: 'salary', label: 'Salary', color: '#4d7c59' },
    { id: 'side', label: 'Side income', color: '#7ba05b' },
    { id: 'other', label: 'Other income', color: '#d9a441' },
  ],
  out: [
    { id: 'housing', label: 'Housing', color: '#5b7fa6' },
    { id: 'groceries', label: 'Groceries', color: '#4d7c59' },
    { id: 'transport', label: 'Transport', color: '#8a6d9b' },
    { id: 'utilities', label: 'Utilities', color: '#c9a227' },
    { id: 'dining', label: 'Dining out', color: '#c96f4a' },
    { id: 'health', label: 'Health', color: '#b3556e' },
    { id: 'education', label: 'Education', color: '#3e7d8c' },
    { id: 'leisure', label: 'Leisure', color: '#7a9e7e' },
    { id: 'shopping', label: 'Shopping', color: '#a67c52' },
    { id: 'subscriptions', label: 'Subscriptions', color: '#8c8c8c' },
  ],
};

export const CATEGORY_MAP = Object.fromEntries(
  [...CATEGORIES.in, ...CATEGORIES.out].map((c) => [c.id, c]),
);

// Monthly spending limits, in dollars.
export const BUDGETS = {
  housing: 1500,
  groceries: 650,
  transport: 220,
  utilities: 260,
  dining: 180,
  health: 150,
  education: 200,
  leisure: 160,
  shopping: 200,
  subscriptions: 45,
};

// Transactions: { id, date 'YYYY-MM-DD', kind 'in' | 'out', category, note, amount }.
// November: income $5,210, spending $2,753.87. October: income $5,000, spending $2,413.14.
export const SEED = [
  // ---- October 2026 ----
  { id: 't101', date: '2026-10-01', kind: 'in', category: 'salary', note: 'Salary — Sam (part-time)', amount: 1150 },
  { id: 't102', date: '2026-10-01', kind: 'out', category: 'housing', note: 'Rent', amount: 1450 },
  { id: 't103', date: '2026-10-03', kind: 'out', category: 'groceries', note: 'Weekly shop — market', amount: 141.10 },
  { id: 't104', date: '2026-10-05', kind: 'out', category: 'utilities', note: 'Electricity bill', amount: 88.30 },
  { id: 't105', date: '2026-10-06', kind: 'out', category: 'transport', note: 'Fuel', amount: 44 },
  { id: 't106', date: '2026-10-09', kind: 'out', category: 'groceries', note: 'Weekly shop — supermarket', amount: 128.45 },
  { id: 't107', date: '2026-10-12', kind: 'out', category: 'dining', note: 'Sunday lunch out', amount: 39.60 },
  { id: 't108', date: '2026-10-15', kind: 'out', category: 'utilities', note: 'Internet bill', amount: 59.99 },
  { id: 't109', date: '2026-10-17', kind: 'out', category: 'groceries', note: 'Weekly shop — market', amount: 149.80 },
  { id: 't110', date: '2026-10-20', kind: 'out', category: 'health', note: 'Pharmacy', amount: 22.15 },
  { id: 't111', date: '2026-10-21', kind: 'out', category: 'transport', note: 'Bus pass — Sam', amount: 62 },
  { id: 't112', date: '2026-10-24', kind: 'out', category: 'groceries', note: 'Weekly shop — supermarket', amount: 118.25 },
  { id: 't113', date: '2026-10-25', kind: 'in', category: 'salary', note: 'Salary — Maya', amount: 3850 },
  { id: 't114', date: '2026-10-27', kind: 'out', category: 'leisure', note: 'Autumn fair tickets', amount: 45 },
  { id: 't115', date: '2026-10-29', kind: 'out', category: 'shopping', note: 'Kids’ rain boots', amount: 64.50 },
  // ---- November 2026 ----
  { id: 't201', date: '2026-11-01', kind: 'in', category: 'salary', note: 'Salary — Sam (part-time)', amount: 1150 },
  { id: 't202', date: '2026-11-01', kind: 'out', category: 'housing', note: 'Rent', amount: 1450 },
  { id: 't203', date: '2026-11-02', kind: 'out', category: 'groceries', note: 'Weekly shop — market', amount: 148.20 },
  { id: 't204', date: '2026-11-03', kind: 'out', category: 'transport', note: 'Bus pass — Sam', amount: 62 },
  { id: 't205', date: '2026-11-04', kind: 'out', category: 'utilities', note: 'Electricity bill', amount: 96.40 },
  { id: 't206', date: '2026-11-05', kind: 'out', category: 'dining', note: 'Family pizza night', amount: 42.50 },
  { id: 't207', date: '2026-11-07', kind: 'out', category: 'groceries', note: 'Weekly shop — supermarket', amount: 132.75 },
  { id: 't208', date: '2026-11-08', kind: 'out', category: 'subscriptions', note: 'Streaming bundle', amount: 15.99 },
  { id: 't209', date: '2026-11-09', kind: 'out', category: 'health', note: 'Pharmacy', amount: 28.40 },
  { id: 't210', date: '2026-11-10', kind: 'out', category: 'transport', note: 'Fuel', amount: 45 },
  { id: 't211', date: '2026-11-12', kind: 'out', category: 'groceries', note: 'Weekly shop — market', amount: 156.30 },
  { id: 't212', date: '2026-11-14', kind: 'out', category: 'leisure', note: 'Cinema + popcorn', amount: 38 },
  { id: 't213', date: '2026-11-15', kind: 'out', category: 'utilities', note: 'Water bill', amount: 54.20 },
  { id: 't214', date: '2026-11-16', kind: 'out', category: 'education', note: 'Kids’ workbooks', amount: 36.90 },
  { id: 't215', date: '2026-11-18', kind: 'out', category: 'shopping', note: 'Winter coats', amount: 89.99 },
  { id: 't216', date: '2026-11-19', kind: 'out', category: 'groceries', note: 'Weekly shop — supermarket', amount: 121.60 },
  { id: 't217', date: '2026-11-20', kind: 'out', category: 'dining', note: 'Takeaway Thai', amount: 34.80 },
  { id: 't218', date: '2026-11-22', kind: 'out', category: 'health', note: 'Dentist check-up', amount: 85 },
  { id: 't219', date: '2026-11-24', kind: 'out', category: 'transport', note: 'Fuel', amount: 41.50 },
  { id: 't220', date: '2026-11-25', kind: 'in', category: 'salary', note: 'Salary — Maya', amount: 3850 },
  { id: 't221', date: '2026-11-25', kind: 'in', category: 'side', note: 'Weekend market stall', amount: 210 },
  { id: 't222', date: '2026-11-26', kind: 'out', category: 'groceries', note: 'Top-up shop', amount: 64.35 },
  { id: 't223', date: '2026-11-27', kind: 'out', category: 'subscriptions', note: 'Music streaming', amount: 9.99 },
];

export const GOALS = [
  { id: 'g1', name: 'Emergency fund', target: 6000, saved: 3850 },
  { id: 'g2', name: 'Bali family trip', target: 2400, saved: 960 },
  { id: 'g3', name: 'New laptop', target: 1200, saved: 300 },
];

// Monthly aggregates for the months before the seeded transactions, so the
// six-month income-vs-spending chart has real history to show.
export const HISTORY = [
  { month: '2026-06', income: 4980, spent: 2610 },
  { month: '2026-07', income: 5120, spent: 2890 },
  { month: '2026-08', income: 5050, spent: 2740 },
  { month: '2026-09', income: 5190, spent: 2520 },
];

export const MONTHS = ['2026-10', '2026-11'];

export function monthLabel(ym) {
  const [y, m] = ym.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function money(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function money0(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}
