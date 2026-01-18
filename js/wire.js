// wire.js
// Fetches and displays news feed for the WIRE tab

import { STATION_CONFIG } from './config.js';

class Wire {
  constructor(gridId = 'wire-grid') {
    this.grid = document.getElementById(gridId);
    if (!this.grid) return;
    this.loadWire();
  }

  async loadWire() {
    this.grid.innerHTML = '<h3>TUNING...</h3>';

    try {
      const res = await fetch(STATION_CONFIG.newsFeed);
      const data = await res.json();

      if (!data.items || data.items.length === 0) {
        this.grid.innerHTML = '<h3>NO NEWS AVAILABLE</h3>';
        return;
      }

      this.grid.innerHTML = data.items.map(item => {
        // Escape description safely
        const description = item.description ? escape(item.description) : '';
        const title = item.title ? item.title.replace(/'/g, "") : "Untitled";

        return `
          <div class="uniform-card" onclick="Wire.openNews('${title}', '${description}')">
            <h4 style="color:var(--authority-orange); font-family:'Oswald';">${title}</h4>
            <p style="font-size:0.8rem; margin-top:10px;">Tap to read</p>
          </div>
        `;
      }).join('');

    } catch (e) {
      console.error("WIRE LOAD ERROR", e);
      this.grid.innerHTML = '<h3>WIRE OFFLINE</h3>';
    }
  }

  // Opens news modal
  static openNews(title, description) {
    const genTitle = document.getElementById('gen-title');
    const genBody = document.getElementById('gen-body');
    const genModal = document.getElementById('gen-modal');

    if (genTitle && genBody && genModal) {
      genTitle.innerText = title;
      genBody.innerHTML = unescape(description);
      genModal.classList.add('open');
    }
  }
}

// Singleton
let wireInstance = null;

export function getWire() {
  if (!wireInstance) {
    wireInstance = new Wire();
  }
  return wireInstance;
}

