// views.js
// Handles view switching, nav buttons, background rotation

import { STATION_CONFIG } from './config.js';

class Views {
  constructor() {
    this.views = document.querySelectorAll('.view');
    this.navButtons = document.querySelectorAll('.nav-btn');
    this.bgIndex = 0;

    this.initNav();
    this.initBackground();
  }

  initNav() {
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab, e.currentTarget);
      });
    });
  }

  switchTab(tabId, btnEl=null) {
    // Hide all views
    this.views.forEach(v => v.classList.remove('active'));
    // Remove active from all nav buttons
    this.navButtons.forEach(b => b.classList.remove('active'));

    // Show selected view
    const targetView = document.getElementById(`v-${tabId}`);
    if (targetView) targetView.classList.add('active');
    if (btnEl) btnEl.classList.add('active');

    // Rotate background
    this.rotateBackground();
  }

  initBackground() {
    if (!STATION_CONFIG.backgrounds?.length) return;
    document.body.style.backgroundImage = `url('${STATION_CONFIG.backgrounds[0]}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }

  rotateBackground() {
    if (!STATION_CONFIG.backgrounds?.length) return;
    this.bgIndex = (this.bgIndex + 1) % STATION_CONFIG.backgrounds.length;
    document.body.style.backgroundImage = `url('${STATION_CONFIG.backgrounds[this.bgIndex]}')`;
  }
}

// Singleton
let viewsInstance = null;
export function getViews() {
  if (!viewsInstance) viewsInstance = new Views();
  return viewsInstance;
                                                  }
