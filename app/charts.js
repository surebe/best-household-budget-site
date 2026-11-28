// HearthBook charts: small hand-rolled SVG helpers (no library). Each chart is
// role="img" with an aria-label, and views pair it with a <details> data table
// so the numbers are readable without the picture.

import { money, monthLabel } from './data.js';

const NS = 'http://www.w3.org/2000/svg';

// Donut of spending by category. `rows` are { label, color, spent } with spent > 0.
export function donut(rows, total) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 78;
  const inner = 52;
  let offset = 0;
  const parts = [];
  for (const row of rows) {
    const frac = total > 0 ? row.spent / total : 0;
    const len = frac * 2 * Math.PI * r;
    const dash = `${Math.max(0, len - 1.5).toFixed(1)} ${(2 * Math.PI * r - len + 1.5).toFixed(1)}`;
    parts.push(
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${row.color}" stroke-width="26" ` +
        `stroke-dasharray="${dash}" stroke-dashoffset="${(-offset).toFixed(1)}" />`,
    );
    offset += len;
  }
  const label = rows.map((row) => `${row.label} ${money(row.spent)}`).join(', ');
  return (
    `<svg class="donut" viewBox="0 0 ${size} ${size}" role="img" ` +
    `aria-label="Spending by category: ${label}. Total ${money(total)}." xmlns="${NS}">` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#ece0c8" stroke-width="26" />` +
    parts.join('') +
    `<circle cx="${cx}" cy="${cy}" r="${inner}" fill="#fffdf8" />` +
    // The hearth flame in gold above the total: the brand mark inside the chart.
    `<g transform="translate(101.5 60) scale(0.72)" fill="none" stroke="#d9a441" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M12 3s5.5 5.6 5.5 9.8a5.5 5.5 0 0 1-11 0C6.5 8.6 12 3 12 3Z"/>` +
    `<path d="M12 21a2.8 2.8 0 0 1-2.8-2.8c0-1.9 2.8-4.4 2.8-4.4s2.8 2.5 2.8 4.4A2.8 2.8 0 0 1 12 21Z"/></g>` +
    `<text x="${cx}" y="${cy + 8}" text-anchor="middle" class="donut-total">${money(total)}</text>` +
    `<text x="${cx}" y="${cy + 29}" text-anchor="middle" class="donut-caption">spent</text>` +
    `</svg>`
  );
}

// Grouped bars: income (sage) vs spending (terracotta) for six months.
export function incomeVsSpent(rows) {
  const w = 560;
  const h = 210;
  const padL = 52;
  const padB = 26;
  const padT = 14;
  const max = Math.max(...rows.map((r) => Math.max(r.income, r.spent)), 1);
  const plotW = w - padL - 8;
  const plotH = h - padT - padB;
  const slot = plotW / rows.length;
  const barW = Math.min(26, (slot - 14) / 2);
  const y = (v) => padT + plotH - (v / max) * plotH;
  const grid = [0.25, 0.5, 0.75, 1].map((f) => {
    const gy = padT + plotH - f * plotH;
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - 8}" y2="${gy.toFixed(1)}" class="grid" />` +
      `<text x="${padL - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" class="axis">$${Math.round((max * f) / 100) / 10}k</text>`;
  });
  const bars = rows
    .map((row, i) => {
      const x0 = padL + i * slot + (slot - barW * 2 - 4) / 2;
      const short = monthLabel(row.month).slice(0, 3);
      return (
        `<rect x="${x0.toFixed(1)}" y="${y(row.income).toFixed(1)}" width="${barW}" height="${(plotH - (y(row.income) - padT)).toFixed(1)}" rx="4" fill="url(#hb-inc)">` +
        `<title>${monthLabel(row.month)} income ${money(row.income)}</title></rect>` +
        `<rect x="${(x0 + barW + 4).toFixed(1)}" y="${y(row.spent).toFixed(1)}" width="${barW}" height="${(plotH - (y(row.spent) - padT)).toFixed(1)}" rx="4" fill="url(#hb-spent)">` +
        `<title>${monthLabel(row.month)} spending ${money(row.spent)}</title></rect>` +
        `<text x="${(padL + i * slot + slot / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" class="axis">${short}</text>`
      );
    })
    .join('');
  const label = rows
    .map((row) => `${monthLabel(row.month)}: income ${money(row.income)}, spent ${money(row.spent)}`)
    .join('; ');
  return (
    `<svg class="bars" viewBox="0 0 ${w} ${h}" role="img" aria-label="Income versus spending, June to November 2026: ${label}." xmlns="${NS}">` +
    // Vertical gradients give the bars depth: lit sage for income, ember for spending.
    `<defs>` +
    `<linearGradient id="hb-inc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#82b08f"/><stop offset="1" stop-color="#477a56"/></linearGradient>` +
    `<linearGradient id="hb-spent" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e89e6b"/><stop offset="1" stop-color="#bd5a30"/></linearGradient>` +
    `</defs>` +
    grid.join('') +
    bars +
    `</svg>`
  );
}
