// wire.js
// Handles WIRE news feed

import { STATION_CONFIG } from './config.js';

class Wire {
  constructor(gridId='wire-grid') {
    this.grid = document.getElementById(gridId);
    if (!this.grid) return;
    this.loadWire();
  }

  async loadWire() {
    this.grid.innerHTML = '<h3>TUNING...</h3>';
    try {
      const res = await fetch(STATION_CONFIG.newsFeed);
      const data = await res.json();
      if (!data.items?.length) { this.grid.innerHTML='<h3>NO NEWS AVAILABLE</h3>'; return; }
      this.grid.innerHTML = data.items.map(i=>{
        const desc = i.description ? escape(i.description) : '';
        const title = i.title ? i.title.replace(/'/g,'') : 'Untitled';
        return `<div class="uniform-card" onclick="Wire.openNews('${title}','${desc}')">
                  <h4 style="color:var(--authority-orange);font-family:'Oswald';">${title}</h4>
                  <p style="font-size:0.8rem;margin-top:10px;">Tap to read</p>
                </div>`;
      }).join('');
    } catch(e) { console.error(e); this.grid.innerHTML='<h3>WIRE OFFLINE</h3>'; }
  }

  static openNews(title, description) {
    const genTitle = document.getElementById('gen-title');
    const genBody = document.getElementById('gen-body');
    const genModal = document.getElementById('gen-modal');
    if(genTitle && genBody && genModal) {
      genTitle.innerText = title;
      genBody.innerHTML = unescape(description);
      genModal.classList.add('open');
    }
  }
}

let wireInstance = null;
export function getWire() { if(!wireInstance) wireInstance=new Wire(); return wireInstance; }
