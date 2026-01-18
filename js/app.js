// app.js
// Main entry point

import { getPlayer } from './player.js';
import { getUI } from './ui.js';
import { getWire } from './wire.js';
import { getAds } from './ads.js';

document.addEventListener('DOMContentLoaded',()=>{
  const player = getPlayer(); // persistent audio
  const ui = getUI();         // tabs, backgrounds, clock
  const wire = getWire();     // news feed
  const ads = getAds();       // advertising calculator
});

