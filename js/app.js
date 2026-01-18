// app.js
// Main entry point for Rock.Scot site

import { getPlayer } from './player.js';
import { getUI } from './ui.js';
import { getWire } from './wire.js';
import { getAds } from './ads.js';
import { getCrew } from './crew.js';
import { getViews } from './views.js';
import { getModals } from './modals.js';

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------
  // Initialize modules
  // ----------------------
  const player = getPlayer();   // Persistent audio player
  const ui = getUI();           // Clock, ticker, signals
  const wire = getWire();       // News feed
  const ads = getAds();         // Advertising calculator & PDF/email
  const crew = getCrew();       // DJ carousel
  const views = getViews();     // Tab switching & background rotation
  const modals = getModals();   // All modals (bios, ads, submit)

  // ----------------------
  // Expose modals globally for other modules
  // ----------------------
  window.Modals = modals;

  // ----------------------
  // Register service worker for PWA offline support
  // ----------------------
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('Service Worker registered successfully'))
      .catch(err => console.error('Service Worker registration failed:', err));
  }

  // ----------------------
  // Optional: expose modules globally for debugging
  // ----------------------
  window.RockScot = {
    player,
    ui,
    wire,
    ads,
    crew,
    views,
    modals
  };

});
