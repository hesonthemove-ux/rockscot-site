/** ==========================================
 * APP.JS PHASE 10 – Dynamic SEO + Departure Board + Wire
 * ==========================================
 */
const STATION_CONFIG = {
    meta: {
        email: "sales@rock.scot",
        streamUrl: "https://player.broadcast.radio/caledonia-tx-ltd"
    },
    prices: {
        packages: [
            { id: 299, name: "Single Region (£299)" },
            { id: 449, name: "Multi-Region (£449)" },
            { id: 2500, name: "Top-of-Hour Exclusive (£2,500/mo)" }
        ],
        productionFee: 195,
        surchargeThreshold: 28,
        surchargeRate: 1.3
    },
    djs: [
        { id:'alex', name:'ALEX', title: "Johnstone's Vinyl Viking", img:'assets/images/crew/dj_alex.jpg', bio:'Born and bred in Johnstone...' },
        { id:'andy', name:'ANDY', title: "East Kilbride Rock Rebel", img:'assets/images/crew/dj_andy.jpg', bio:'Hailing from East Kilbride...' },
        { id:'stevie', name:'STEVIE', title: "Port Glasgow Headbanger", img:'assets/images/crew/dj_stevie.jpg', bio:'From the shipbuilding heart of Port Glasgow...' },
        { id:'mhairi', name:'MHAIRI', title: "Hamilton's Hard Rock Queen", img:'assets/images/crew/dj_mhairi.jpg', bio:'Hamilton in South Lanarkshire gave Mhairi her first taste...' },
        { id:'jude', name:'JUDE', title: "Irvine's Indie Rock Icon", img:'assets/images/crew/dj_jude.jpg', bio:'North Ayrshire\'s Irvine is Jude\'s stomping ground...' },
        { id:'chris', name:'CHRIS', title: "Greenock's Guitar Guru", img:'assets/images/crew/dj_chris.jpg', bio:'Greenock in Inverclyde bred Chris on tales of shipyard workers...' },
        { id:'cal', name:'CAL', title: "Kilmarnock's Classic Rocker", img:'assets/images/crew/dj_cal.jpg', bio:'Straight out of Kilmarnock in the Ayrshire heartlands...' },
        { id:'blue', name:'BLUE', title: "Gourock's Bluesy Rock Maverick", img:'assets/images/crew/dj_blue.jpg', bio:'From the seaside charm of Gourock in Inverclyde...' }
    ],
    news: {
        feed: "https://api.rss2json.com/v1/api.json?rss_url=https://snackmag.co.uk/category/music/feed",
        images: ["assets/images/background/background1.jpg","assets/images/background/background2.jpg","assets/images/background/background3.jpg","assets/images/background/background4.jpg","assets/images/background/background5.jpg","assets/images/background/background6.jpg","assets/images/background/background7.jpg"]
    },
    signals: ["LANARKSHIRE","INVERCLYDE","AYRSHIRE"]
};

const app = {
    bgIdx: 0,
    rssItems: [],
    departureIdx: 0,
    audioPlaying: false,
    audioEl: null,
    init: function() {
        // Clock
        setInterval(() => {
            const d = new Date();
            document.getElementById('clock').innerText = d.toTimeString().split(' ')[0];
        }, 1000);

        // Departure board container
        this.loadRSS();

        // Background image
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;
        setInterval(() => {
            this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
            document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;
        }, 15000);

        // Audio
        this.audioEl = document.createElement('audio');
        this.audioEl.src = STATION_CONFIG.meta.streamUrl;
        this.audioEl.controls = true;
        this.audioEl.autoplay = false;
        document.getElementById('player-container').appendChild(this.audioEl);

        // Initial Signals
        document.getElementById('sig-list').innerHTML = STATION_CONFIG.signals.map(l=>`<div style="padding:5px 0;"><span style="color:#0f0">●</span> ${l}: PEAK</div>`).join('');

        // Crew carousel
        this.loadCrew();
    },

    switchTab: function(id, btnEl) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('v-'+id).classList.add('active');
        btnEl.classList.add('active');

        if(id==='wire') this.loadWire();
    },

    loadCrew: function() {
        const trk = document.getElementById('crew-roller');
        trk.innerHTML = STATION_CONFIG.djs.map(d => `
            <div class="crew-card" onclick="app.openBio('${d.id}')">
                <img src="${d.img}" alt="${d.name}">
                <div class="crew-info">
                    <h3>${d.name}</h3>
                    <p>${d.title}</p>
                </div>
            </div>
        `).join('');
    },

    openBio: function(id) {
        const p = STATION_CONFIG.djs.find(x => x.id===id);
        if(p){
            document.getElementById('gen-title').innerText = p.name;
            document.getElementById('gen-body').innerText = p.bio;
            document.getElementById('gen-modal').classList.add('open');
        }
    },

    loadRSS: async function() {
        try {
            const res = await fetch(STATION_CONFIG.news.feed);
            const data = await res.json();
            this.rssItems = data.items;
            this.updateDepartureBoard();
        } catch(e) {
            document.getElementById('ticker-out').innerText = "Departure board offline.";
        }
    },

    updateDepartureBoard: function() {
        if(!this.rssItems.length) return;
        const boardEl = document.getElementById('departure-board');
        const item = this.rssItems[this.departureIdx];
        boardEl.innerHTML = `<div class="departure-item">${item.title}</div>`;
        // Update SEO dynamically
        document.title = item.title + " | Rock.Scot";
        document.querySelector('meta[name="description"]').setAttribute('content', item.description.slice(0,150));

        this.departureIdx = (this.departureIdx + 1) % this.rssItems.length;
        setTimeout(()=>{this.updateDepartureBoard();}, 10000);
    },

    loadWire: function() {
        const g = document.getElementById('wire-grid');
        if(!this.rssItems.length) {
            g.innerHTML = "<p>Wire offline...</p>";
            return;
        }
        g.innerHTML = this.rssItems.map(i => `
            <div class="uniform-card">
                <h4>${i.title}</h4>
                <p>${i.description ? i.description.slice(0,150) + "..." : ""}</p>
                <a href="${i.link}" target="_blank">Read More</a>
            </div>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', ()=>{app.init();});
