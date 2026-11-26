// HearthBook router: hash routes (#/, #/transactions, #/budget, #/goals). Each
// view is loaded with a dynamic import() only when its route is first visited,
// so the first load is just index.html, style.css and this file.

import { setMonth, store } from './store.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('nav a')];

const ROUTES = {
  '/': () => import('./views/dashboard.js'),
  '/transactions': () => import('./views/transactions.js'),
  '/budget': () => import('./views/budget.js'),
  '/goals': () => import('./views/goals.js'),
};

function route() {
  const path = location.hash.replace(/^#/, '') || '/';
  return ROUTES[path] ? path : '/';
}

// Switch the shared month and re-render the current route.
function goMonth(ym) {
  setMonth(ym);
  show();
}

async function show() {
  const path = route();
  const view = await ROUTES[path]();
  view.render(app, goMonth);
  for (const link of navLinks) {
    const href = link.getAttribute('href');
    if (href === '#' + path) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  document.title =
    path === '/'
      ? 'HearthBook — the household budget book'
      : `HearthBook — ${document.querySelector('#page-title')?.textContent ?? ''}`;
  app.focus({ preventScroll: true });
}

window.addEventListener('hashchange', show);
show();
