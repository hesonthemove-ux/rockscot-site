import { STATION_CONFIG } from './config.js';

const app = {
  bgIdx: 0,

  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.initClock();
    this.initTicker();
    this.initSignals();
    this.loadCrew();
  },

  cacheDom: function() {
    this.navButtons = document.querySelectorAll('.nav-btn');
    this.views = document.querySelectorAll('.view');
    this.clockEl = document.getElementById('clock');
    this.tickerOut = document.getElementById('ticker-out');
    this.sigList = document.getElementById('sig-list');
    this.crewRoller = document.getElementById('crew-roller');
    this.modal = document.getElementById('gen-modal');
    this.modalTitle = document.getElementById('gen-title');
    this.modalBody = document.getElementById('gen-body');
    this.launchPortalBtn = document.getElementById('launch-portal');
    this.startUploadBtn = document.getElementById('start-upload');
  },

  bindEvents: function() {
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', e => this.switchTab(e));
    });

    this.launchPortalBtn.addEventListener('click', () => {
      this.modalTitle.innerText = "Advertising Portal";
      this.modalBody.innerHTML = `<p>Portal under development.</p>`;
      this.openModal();
    });

    this.startUploadBtn.addEventListener('click', () => {
      this.modalTitle.innerText = "Submit Track";
      this.modalBody.innerHTML = `<p>Ensure 24/7 OFCOM Compliance.</p><input type="file" class="std-input"><button class="btn-auth" onclick="alert('Uploaded')">UPLOAD</button>`;
      this.openModal();
    });

    // Close modal when clicking overlay
    this.modal.addEventListener('click', () => this.closeModal());
    this.modal.querySelector('.mag-layout').addEventListener('click', e => e.stopPropagation());
  },

  initClock: function() {
    setInterval(() => {
      const now = new Date();
      this.clockEl.innerText = now.toLocaleTimeString('en-GB', { hour12: false });
    }, 1000);
  },

  initTicker: function() {
    const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
    this.tickerOut.innerHTML = msg.repeat(10);
  },

  initSignals: function() {
    this.sigList.innerHTML = STATION_CONFIG.signals.map(s => `
      <div style="padding:5px 0; display:flex; justify-content:space-between;">
        <span style="color:#0f0">●</span> <span>${s}</span> <span>PEAK</span>
      </div>
    `).join('');
  },

  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.views.forEach(v => v.classList.remove('active'));
    this.navButtons.forEach(b => b.classList.remove('active'));
    document.getElementById(`v-${tab}`).classList.add('active');
    e.currentTarget.classList.add('active');

    // Rotate background
    this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
    document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;

    if(tab === 'crew') this.loadCrew();
    if(tab === 'wire') this.loadWire();
  },

  loadCrew: function() {
    this.crewRoller.innerHTML = STATION_CONFIG.djs.map(d => `
      <div class="crew-card" onclick="app.openBio('${d.id}')">
        <img src="assets/images/crew/${d.img}" alt="${d.name}">
        <div class="crew-info">
          <h3>${d.name}</h3>
          <p>${d.title}</p>
        </div>
      </div>
    `).join('');
  },

  openBio: function(id) {
    const dj = STATION_CONFIG.djs.find(d => d.id === id);
    if(dj) {
      this.modalTitle.innerText = dj.name;
      this.modalBody.innerText = dj.bio;
      this.openModal();
    }
  },

  loadWire: async function() {
    const wireGrid = document.getElementById('wire-grid');
    wireGrid.innerHTML = '<h3>Tuning...</h3>';
    try {
      const res = await fetch(STATION_CONFIG.news.feed);
      const data = await res.json();
      wireGrid.innerHTML = data.items.map(i => `
        <div class="uniform-card" onclick="app.openNews('${i.title.replace(/'/g, "")}', '${escape(i.description)}')">
          <h4>${i.title}</h4>
          <p>Tap to read</p>
        </div>
      `).join('');
    } catch {
      wireGrid.innerHTML = '<h3>Wire offline</h3>';
    }
  },

  openNews: function(title, desc) {
    this.modalTitle.innerText = title;
    this.modalBody.innerHTML = unescape(desc);
    this.openModal();
  },

  openModal: function() {
    this.modal.classList.add('open');
  },

  closeModal: function() {
    this.modal.classList.remove('open');
  }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => app.init());
