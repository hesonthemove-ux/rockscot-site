// crew.js
// Handles CREW tab: DJ carousel and bio modal

import { STATION_CONFIG } from './config.js';

class Crew {
  constructor(trackId='crew-roller') {
    this.track = document.getElementById(trackId);
    if (!this.track) return;
    this.loadCrew();
  }

  loadCrew() {
    if (!STATION_CONFIG.djs?.length) return;

    this.track.innerHTML = STATION_CONFIG.djs.map(d => `
      <div class="crew-card" onclick="Crew.openBio('${d.id}')">
        <img src="${d.img}" alt="${d.name}">
        <div class="crew-info">
          <h3 style="font-family:'Bebas Neue'; font-size:2rem;">${d.name}</h3>
          <p style="font-size:0.8rem; color:#aaa;">${d.title}</p>
        </div>
      </div>
    `).join('');
  }

  // ----------------------
  // Open DJ bio modal
  // ----------------------
  static openBio(id) {
    const dj = STATION_CONFIG.djs.find(d => d.id === id);
    if (!dj) return;

    const modalTitle = document.getElementById('gen-title');
    const modalBody = document.getElementById('gen-body');
    const modal = document.getElementById('gen-modal');

    if (modalTitle && modalBody && modal) {
      modalTitle.innerText = dj.name;
      modalBody.innerText = dj.bio;
      modal.classList.add('open');
    }
  }
}

// Singleton
let crewInstance = null;
export function getCrew() {
  if (!crewInstance) crewInstance = new Crew();
  return crewInstance;
}
