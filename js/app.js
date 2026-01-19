// app.js Phase 10 – Horizontal Nav + Departure Board + Wire + Crew + Audio + RSS

// --- Configuration ---
const STATION_CONFIG = {
  streamUrl: "https://player.broadcast.radio/caledondia-tx-ltd",
  backgrounds: [
    "assets/images/background/background1.jpg",
    "assets/images/background/background2.jpg",
    "assets/images/background/background3.jpg",
    "assets/images/background/background4.jpg",
    "assets/images/background/background5.jpg",
    "assets/images/background/background6.jpg",
    "assets/images/background/background7.jpg"
  ],
  signals: ["South Lanarkshire", "Inverclyde", "North Ayrshire"],
  crew: [
    { id:'alex', name:'Alex', title:"Johnstone's Vinyl Viking", img:'assets/images/crew/dj_alex.jpg', bio:'Born and bred in Johnstone...' },
    { id:'andy', name:'Andy', title:"East Kilbride Rock Rebel", img:'assets/images/crew/dj_andy.jpg', bio:'Hailing from East Kilbride...' },
    { id:'stevie', name:'Stevie', title:"Port Glasgow Headbanger", img:'assets/images/crew/dj_stevie.jpg', bio:'From the shipbuilding heart of Port Glasgow...' },
    { id:'mhairi', name:'Mhairi', title:"Hamilton's Hard Rock Queen", img:'assets/images/crew/dj_mhairi.jpg', bio:'Hamilton in South Lanarkshire gave Mhairi her first taste...' },
    { id:'jude', name:'Jude', title:"Irvine's Indie Rock Icon", img:'assets/images/crew/dj_jude.jpg', bio:'North Ayrshire\'s Irvine is Jude\'s stomping ground...' },
    { id:'chris', name:'Chris', title:"Greenock's Guitar Guru", img:'assets/images/crew/dj_chris.jpg', bio:'Greenock in Inverclyde bred Chris on tales of shipyard workers...' },
    { id:'cal', name:'Cal', title:"Kilmarnock's Classic Rocker", img:'assets/images/crew/dj_cal.jpg', bio:'Straight out of Kilmarnock in the Ayrshire heartlands...' },
    { id:'blue', name:'Blue', title:"Gourock's Bluesy Rock Maverick", img:'assets/images/crew/dj_blue.jpg', bio:'From the seaside charm of Gourock in Inverclyde...' }
  ],
  rssFeed: "https://api.rss2json.com/v1/api.json?rss_url=https://snackmag.co.uk/category/music/feed"
};

// --- App State ---
const app = {
  bgIndex: 0,
  rssItems: [],
  departureIndex: 0,
  audioPlaying: false,
  audioEl: null,

  init: function() {
    this.setupClock();
    this.setupAudio();
    this.setupSignals();
    this.setupCrew();
    this.loadRSS();
    this.setupBackgroundRotation();
  },

  // --- Clock ---
  setupClock: function() {
    const clockEl = document.getElementById('clock');
    setInterval(() => {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString();
    }, 1000);
  },

  // --- Audio ---
  setupAudio: function() {
    this.audioEl = document.createElement('audio');
    this.audioEl.src = STATION_CONFIG.streamUrl;
    this.audioEl.controls = true;
    this.audioEl.preload = "none";
    document.getElementById('player-container').appendChild(this.audioEl);
  },

  // --- Signals ---
  setupSignals: function() {
    const sigEl = document.getElementById('sig-list');
    sigEl.innerHTML = STATION_CONFIG.signals.map(s => `<div><span style="color:#0f0">●</span> ${s}: GOOD</div>`).join('');
  },

  // --- Crew ---
  setupCrew: function() {
    const crewEl = document.getElementById('crew-roller');
    crewEl.innerHTML = STATION_CONFIG.crew.map(dj => `
      <div class="crew-card" onclick="app.showBio('${dj.id}')">
        <img src="${dj.img}" alt="${dj.name}">
        <div class="crew-info">
          <h3>${dj.name}</h3>
          <p>${dj.title}</p>
        </div>
      </div>
    `).join('');
  },

  showBio: function(id) {
    const dj = STATION_CONFIG.crew.find(c => c.id === id);
    if(!dj) return;
    alert(`${dj.name}\n${dj.title}\n\n${dj.bio}`);
  },

  // --- RSS Departure Board ---
  loadRSS: async function() {
    try {
      const res = await fetch(STATION_CONFIG.rssFeed);
      const data = await res.json();
      this.rssItems = data.items;
      this.updateDepartureBoard();
    } catch(err) {
      document.getElementById('departure-board').textContent = "Departure board offline.";
    }
  },

  updateDepartureBoard: function() {
    if(!this.rssItems.length) return;
    const item = this.rssItems[this.departureIndex];
    document.getElementById('departure-board').textContent = item.title;

    // Dynamic SEO
    document.title = `${item.title} | Rock.Scot`;
    document.querySelector('meta[name="description"]').setAttribute('content', item.description?.slice(0,150) || '');

    this.departureIndex = (this.departureIndex + 1) % this.rssItems.length;
    setTimeout(() => { this.updateDepartureBoard(); }, 10000);
  },

  // --- Wire page ---
  populateWire: function() {
    const wireEl = document.getElementById('wire-grid');
    if(!this.rssItems.length) {
      wireEl.innerHTML = "<p>Wire offline...</p>";
      return;
    }
    wireEl.innerHTML = this.rssItems.map(item => `
      <div class="uniform-card">
        <h4>${item.title}</h4>
        <p>${item.description?.slice(0,150)}...</p>
        <a href="${item.link}" target="_blank">Read More</a>
      </div>
    `).join('');
  },

  // --- Navigation ---
  switchTab: function(tabId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`v-${tabId}`).classList.add('active');
    if(tabId === 'wire') this.populateWire();
  },

  // --- Background rotation ---
  setupBackgroundRotation: function() {
    document.body.style.backgroundImage = `url('${STATION_CONFIG.backgrounds[0]}')`;
    setInterval(() => {
      this.bgIndex = (this.bgIndex + 1) % STATION_CONFIG.backgrounds.length;
      document.body.style.backgroundImage = `url('${STATION_CONFIG.backgrounds[this.bgIndex]}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    }, 15000);
  }
};

document.addEventListener('DOMContentLoaded', () => app.init());
