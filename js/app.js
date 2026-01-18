import { STATION_CONFIG } from './config.js'; // your DJ data, prices, signals, etc.

const app = {
  init: function() {
    this.initClock();
    this.initTicker();
    this.loadSignals();
    this.loadCrew();
    this.setupNavigation();
    this.setupAudio();
  },

  initClock: function() {
    const clockEl = document.getElementById('clock');
    setInterval(() => {
      const d = new Date();
      clockEl.innerText = d.toLocaleTimeString('en-GB');
    }, 1000);
  },

  initTicker: function() {
    const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
    document.getElementById('ticker-out').innerHTML = msg.repeat(10);
  },

  loadSignals: function() {
    const sigList = document.getElementById('sig-list');
    sigList.innerHTML = STATION_CONFIG.signals.map(l => `<div><span class="green-dot">●</span> ${l}: PEAK</div>`).join('');
  },

  loadCrew: function() {
    const trk = document.getElementById('crew-roller');
    trk.innerHTML = STATION_CONFIG.djs.map(d => `
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
      document.getElementById('gen-title').innerText = dj.name;
      document.getElementById('gen-body').innerText = dj.bio;
      document.getElementById('gen-modal').classList.add('open');
    }
  },

  setupNavigation: function() {
    const links = document.querySelectorAll('.main-menu a');
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const target = link.getAttribute('href').replace('#','');
        document.querySelectorAll('main > section').forEach(sec => sec.style.display='none');
        const activeSection = document.getElementById(target);
        if(activeSection) activeSection.style.display='block';
      });
    });

    // show default section
    document.querySelectorAll('main > section').forEach(sec => sec.style.display='none');
    document.getElementById('live').style.display='block';
  },

  setupAudio: function() {
    const radioStream = document.getElementById('radio-stream');
    radioStream.play().catch(()=>console.log('User interaction required for autoplay'));
  },

  openAdModal: function() { alert('Advertising portal modal goes here.'); },
  openSubmitModal: function() { alert('Track submission modal goes here.'); }
};

document.addEventListener('DOMContentLoaded', () => app.init());
