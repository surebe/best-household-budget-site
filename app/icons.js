// HearthBook icons: small hand-drawn stroke glyphs (24×24, currentColor), one
// per spending category plus the goal and brand marks. Views drop them into
// tinted chips so every category and goal reads at a glance, in the outline
// of the code as much as on the page. No icon font, no images, no network.

// Inner SVG content per glyph (paths only; icon() adds the <svg> frame).
const GLYPHS = {
  // Brand / insight mark: a flame in a teardrop, the hearth of HearthBook.
  flame:
    '<path d="M12 3s5.5 5.6 5.5 9.8a5.5 5.5 0 0 1-11 0C6.5 8.6 12 3 12 3Z"/>' +
    '<path d="M12 21a2.8 2.8 0 0 1-2.8-2.8c0-1.9 2.8-4.4 2.8-4.4s2.8 2.5 2.8 4.4A2.8 2.8 0 0 1 12 21Z"/>',
  house:
    '<path d="M4 11.2 12 4l8 7.2"/><path d="M6.2 9.8V20h11.6V9.8"/><path d="M10 20v-5h4v5"/>',
  // Income categories.
  salary:
    '<rect x="2.5" y="6.5" width="19" height="11" rx="2"/><circle cx="12" cy="12" r="2.6"/>' +
    '<path d="M6 9.8h.01M18 14.2h.01"/>',
  side:
    '<rect x="3.5" y="8" width="17" height="11.5" rx="2"/>' +
    '<path d="M9 8V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V8M3.5 12.5h17"/>',
  other:
    '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  // Spending categories.
  housing:
    '<path d="M4 11.2 12 4l8 7.2"/><path d="M6.2 9.8V20h11.6V9.8"/><path d="M10 20v-5h4v5"/>',
  groceries:
    '<circle cx="9.5" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/>' +
    '<path d="M3 3.5h2.2l2.3 11h10.6l2-7.5H7"/>',
  transport:
    '<path d="M4 17 5.6 10.8A2 2 0 0 1 7.5 9.4h9a2 2 0 0 1 1.9 1.4L20 17"/>' +
    '<path d="M3.5 17h17v2.5h-2.3V18H5.8v1.5H3.5V17Z"/>' +
    '<circle cx="7.6" cy="13.6" r=".6"/><circle cx="16.4" cy="13.6" r=".6"/>',
  utilities:
    '<path d="M13 2.5 4.5 14H11l-1 7.5L18.5 10H12l1-7.5Z"/>',
  dining:
    '<path d="M7 3v6.5M4.8 3v3.8a2.2 2.2 0 0 0 4.4 0V3M7 9.5V21"/>' +
    '<path d="M17.5 3c-1.7 2.2-2.4 4.8-2.4 7.4 0 1.5.9 2.4 2.4 2.4V21"/>',
  health:
    '<path d="M12 20.2S3.8 15.3 3.8 9.9A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.2 2.9c0 5.4-8.2 10.3-8.2 10.3Z"/>',
  education:
    '<path d="M12 6.2C10 4.7 7.4 4.2 4 4.2v13.6c3.4 0 6 .5 8 2 2-1.5 4.6-2 8-2V4.2c-3.4 0-6 .5-8 2Z"/>' +
    '<path d="M12 6.2v13.6"/>',
  leisure:
    '<circle cx="12" cy="12" r="3.6"/>' +
    '<path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"/>',
  shopping:
    '<path d="M5.5 8h13l-1.1 12.5H6.6L5.5 8Z"/><path d="M9 10.5V6.8a3 3 0 0 1 6 0v3.7"/>',
  subscriptions:
    '<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20.2 3.2v4h-4"/>',
  // Goal marks.
  shield:
    '<path d="M12 3 5 5.8v6.4c0 4.3 2.9 7.3 7 8.8 4.1-1.5 7-4.5 7-8.8V5.8L12 3Z"/>' +
    '<path d="m9 11.8 2.2 2.2 4.2-4.2"/>',
  plane:
    '<path d="M21 3 10.2 13.8M21 3l-6.8 18-3.4-7.2L3.6 10.4 21 3Z"/>',
  laptop:
    '<rect x="5" y="4.5" width="14" height="10" rx="1.5"/><path d="M3.5 19.5h17"/>',
  target:
    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.1"/>',
};

// An inline SVG string for a glyph name; unknown names render the target.
export function icon(name) {
  const body = GLYPHS[name] ?? GLYPHS.target;
  return (
    `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
    `stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ` +
    `aria-hidden="true" focusable="false">${body}</svg>`
  );
}

// Inline style for a category chip: the category colour at low alpha behind
// the same colour's glyph, so chips stay soft on the warm paper.
export function chipStyle(color) {
  return `background:${color}21;color:${color}`;
}
