// ui.js
// Handles UI interactions: tabs, modals, background rotation, clock, ticker

import { STATION_CONFIG } from './config.js';

class UI {
  constructor() {
    this.bgIndex = 0;
    this.views = document.querySelectorAll('.view');
    this.navButtons = document.querySelectorAll('.nav-btn');
    this.initClock();
    this.initTicker();
    this.initSignals();
    this.initNav();
    this.initBackground();
  }

  // ----------------------
  // Clock
  // ----------------------
  initClock() {
    const clockEl = document.getElementById('clock');
    setInterval(() => {
      const d = new Date();
      const timeStr = d.toTimeString().split(' ')[0];
      clockEl.innerText = timeStr;
    }, 1000);
  }

  // ----------------------
  // Ticker
  // ----------------------
  initTicker() {
    const tickerEl = document.getElementById('ticker-out');
    if (!tickerEl) return;

    const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
    tickerEl.innerHTML = msg.repeat(10);
  }

  // ----------------------
  // Signal list
  // ----------------------
  initSignals() {
    const sigListEl = document.getElementById('sig-list');
    if (!sigListEl) return;

    sigListEl.innerHTML = STATION_CONFIG.signals
      .map(signal => `<div style="padding:10px; border-bottom:1px solid #333;">
                        <span style="color:#0f0">●</span> ${signal}: PEAK
                      </div>`)
      .join('');
  }

  // ----------------------
  // Tab switching
  // ----------------------
  initNav() {
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.dataset.tab;
        this.switchTab(target, e.currentTarget);
      });
    });
  }

  switchTab(tabId, btnEl) {
    // Hide all views
    this.views.forEach(v => v.classList.remove('active'));
    // Deactivate all nav buttons
    this.navButtons.forEach(b => b.classList.remove('active'));

    // Activate selected view and nav button
    const targetView = document.getElementById(`v-${tabId}`);
    if (targetView) targetView.classList.add('active');
    if (btnEl) btnEl.classList.add('active');

    // Rotate background for each tab switch
    this.rotateBackground();
  }

  // ----------------------
  // Background rotation
  // ----------------------
  initBackground() {
    if (!STATION_CONFIG.backgrounds || STATION_CONFIG.backgrounds.length === 0) return;

    // Set initial background
    document.body.style.backgroundImage = `url('${STATION_CONFIG.backgrounds[0]}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }

  rotateBackground() {
    if (!STATION_CONFIG.backgrounds || STATION_CONFIG.backgrounds.length === 0) return;

    this.bgIndex = (this.bgIndex + 1) % STATION_CONFIG.backgrounds.length;
    document.body.style.backgroundImage = `url('${STATION_CONFIG.backgrounds[this.bgIndex]}')`;
  }
}

// Singleton
let uiInstance = null;

export function getUI() {
  if (!uiInstance) {
    uiInstance = new UI();
  }
  return uiInstance;
}

