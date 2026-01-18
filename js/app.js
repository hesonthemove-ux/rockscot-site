// app.js
import { getPlayer } from './player.js';
import { getUI } from './ui.js';
import { getWire } from './wire.js';
import { getAds } from './ads.js';
import { getCrew } from './crew.js';
import { getViews } from './views.js';
import { getModals } from './modals.js';

document.addEventListener('DOMContentLoaded', () => {
  const player = getPlayer();   // persistent audio player
  const ui = getUI();           // clock, ticker, signals
  const wire = getWire();       // news feed
  const ads = getAds();         // advertising calculator
  const crew = getCrew();       // DJ carousel
  const views = getViews();     // tab system + background
  const modals = getModals();   // modal system

  // Expose modals for other modules (like ads or crew) to open
  window.Modals = modals;
});
