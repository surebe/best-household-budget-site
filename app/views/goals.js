// Goals: cards with progress bars, quick-contribute buttons that really add to
// the goal's saved total, a months-to-goal estimate at the current savings rate,
// and a mini form that really adds a new goal.

import { money, monthLabel } from '../data.js';
import { addGoal, contribute, goalProgress, monthsToGoal, store, totals } from '../store.js';
import { icon } from '../icons.js';

// Each goal wears its own medallion: a glyph in a tinted disc, so the cards
// read as three different ambitions, not three copies of one widget.
const GOAL_MARKS = {
  g1: { glyph: 'shield', hue: '#4d7c59' },
  g2: { glyph: 'plane', hue: '#a66a1c' },
  g3: { glyph: 'laptop', hue: '#4a6d94' },
};
const goalMark = (id) => GOAL_MARKS[id] ?? { glyph: 'target', hue: '#7d5f8d' };

export function render(el) {
  const goals = goalProgress();
  const { left } = totals();
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);

  el.innerHTML = `
  <section class="page-head" aria-labelledby="page-title">
    <div>
      <h1 id="page-title">Savings goals</h1>
      <p class="lede">What the household is saving for, and how fast the money is getting there. ${money(totalSaved)} saved toward ${money(totalTarget)} in total.</p>
    </div>
    <p class="month-note">${monthLabel(store.month)} leaves <b>${money(left)}</b> to save.</p>
  </section>

  <div class="goals-grid">
    ${goals.map((g) => {
      const months = monthsToGoal(g);
      const eta =
        g.remaining <= 0
          ? 'Fully funded — well done.'
          : months === null
            ? 'No money left to save this month, so the date is on hold.'
            : months <= 1
              ? 'About 1 month to go at this month’s savings pace.'
              : `About ${months} months to go at this month’s savings pace.`;
      const mark = goalMark(g.id);
      return `<article class="card goal-card" style="--goal-hue:${mark.hue}" aria-labelledby="goal-${g.id}">
        <div class="goal-head">
          <span class="goal-medal" aria-hidden="true">${icon(mark.glyph)}</span>
          <h2 id="goal-${g.id}">${g.name}</h2>
          <span class="goal-pct">${Math.round(g.pct * 100)}%</span>
        </div>
        <p class="goal-numbers"><b>${money(g.saved)}</b> of ${money(g.target)}</p>
        <div class="budget-bar goal-bar" role="img" aria-label="${g.name}: ${money(g.saved)} saved of ${money(g.target)}, ${Math.round(g.pct * 100)} percent"><span style="width:${Math.min(100, Math.round(g.pct * 100))}%" class="bar-ok"></span></div>
        <p class="goal-eta">${eta}</p>
        <p class="goal-actions">
          <button type="button" class="btn-primary" data-contribute="${g.id}" data-amount="50">Add $50</button>
          <button type="button" class="btn-ghost" data-contribute="${g.id}" data-amount="100">Add $100</button>
        </p>
        <p class="form-note" aria-live="polite"></p>
      </article>`;
    }).join('')}

    <section class="card goal-card new-goal" style="--goal-hue:#c96f4a" aria-labelledby="new-goal-title">
      <div class="goal-head">
        <span class="goal-medal" aria-hidden="true">${icon('target')}</span>
        <h2 id="new-goal-title">Start a new goal</h2>
      </div>
      <form id="goal-form" novalidate>
        <p class="field">
          <label for="g-name">Goal name</label>
          <input id="g-name" name="name" type="text" maxlength="60" placeholder="e.g. New bikes" required>
        </p>
        <p class="field">
          <label for="g-target">Target amount ($)</label>
          <input id="g-target" name="target" type="number" min="1" step="1" inputmode="numeric" placeholder="1000" required>
        </p>
        <p class="form-error" id="goal-error" role="alert" hidden></p>
        <p><button type="submit" class="btn-primary">Add goal</button></p>
        <p class="form-note" id="goal-note" aria-live="polite"></p>
      </form>
    </section>
  </div>

  <section class="card" aria-labelledby="plan-title">
    <h2 id="plan-title">How contributing works here</h2>
    <p>“Add $50” is a planned contribution: it records the money you intend to move to that goal this month. It does not take money out of any spending category — the budget page still shows the full month. When the month ends, the household moves the planned amounts to their real accounts, and the saved totals carry over. The months-to-go figure on each card fills the goals in the order they are listed, at this month’s leftover pace, so a goal further down the list waits for the ones above it.</p>
  </section>`;

  el.querySelectorAll('[data-contribute]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const g = contribute(btn.dataset.contribute, Number(btn.dataset.amount));
      render(el);
      if (g) {
        const card = el.querySelector(`#goal-${g.id}`)?.closest('.goal-card');
        const note = card?.querySelector('.form-note');
        if (note) note.textContent = `Added $${btn.dataset.amount} to ${g.name} — now ${money(g.saved)} of ${money(g.target)}.`;
      }
    });
  });

  const form = el.querySelector('#goal-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const target = Number(data.get('target'));
    const errorEl = el.querySelector('#goal-error');
    if (!name) {
      errorEl.textContent = 'Give the goal a name.';
      errorEl.hidden = false;
      el.querySelector('#g-name').focus();
      return;
    }
    if (!Number.isFinite(target) || target <= 0) {
      errorEl.textContent = 'Enter a target greater than $0.';
      errorEl.hidden = false;
      el.querySelector('#g-target').focus();
      return;
    }
    errorEl.hidden = true;
    addGoal(name, target);
    render(el);
    const note = el.querySelector('#goal-note');
    if (note) note.textContent = `Goal “${name}” added with a ${money(target)} target.`;
  });
}
