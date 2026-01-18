// app.js
import { getPlayer } from './player.js';
import { getUI } from './ui.js';
import { getWire } from './wire.js';
import { getAds } from './ads.js';
import { getCrew } from './crew.js';

document.addEventListener('DOMContentLoaded', () => {
  const player = getPlayer();
  const ui = getUI();
  const wire = getWire();
  const ads = getAds();
  const crew = getCrew(); // populate CREW tab
});
