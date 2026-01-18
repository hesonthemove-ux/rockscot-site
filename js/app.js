/** 
 * ROCK.SCOT APP.JS
 * Paths adjusted for current directory structure
 * Full functionality: clock, ticker, audio player, crew, views
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
    signals: ["LANARKSHIRE", "INVERCLYDE", "AYRSHIRE"],
    newsImages: [
        "images/background/background1.jpg",
        "images/background/background2.jpg",
        "images/background/background3.jpg",
        "images/background/background4.jpg",
        "images/background/background5.jpg",
        "images/background/background6.jpg",
        "images/background/background7.jpg"
    ],
    djs: [
        { id:'andy', name:'ANDY', title: "East Kilbride's Rock Rebel", img:'images/djs/dj_andy.jpg', bio:`Hailing from East Kilbride...` },
        { id:'alex', name:'ALEX', title: "Johnstone's Vinyl Viking", img:'images/djs/dj_alex.jpg', bio:`Born and bred in Johnstone...` },
        { id:'stevie', name:'STEVIE', title: "Port Glasgow's Headbanger", img:'images/djs/dj_stevie.jpg', bio:`From Port Glasgow...` },
        { id:'mhairi', name:'MHAIRI', title: "Hamilton's Hard Rock Queen", img:'images/djs/dj_mhairi.jpg', bio:`Hamilton in South Lanarkshire...` },
        { id:'jude', name:'JUDE', title: "Irvine's Indie Rock Icon", img:'images/djs/dj_jude.jpg', bio:`North Ayrshire's Irvine...` },
        { id:'chris', name:'CHRIS', title: "Greenock's Guitar Guru", img:'images/djs/dj_chris.jpg', bio:`Greenock in Inverclyde...` },
        { id:'cal', name:'CAL', title: "Kilmarnock's Classic Rocker", img:'images/djs/dj_cal.jpg', bio:`Straight out of Kilmarnock...` },
        { id:'blue', name:'BLUE', title: "Gourock's Bluesy Rock Maverick", img:'images/djs/dj_blue.jpg', bio:`From the seaside charm of Gourock...` }
    ]
};

const app = {
    bgIndex: 0,

    init: function() {
        this.initClock();
        this.initTicker();
        this.initAudioPlayer();
        this.initSignals();
        this.setBackground();
    },

    initClock: function() {
        const clockEl = document.getElementById('clock');
        setInterval(() => {
            const now = new Date();
            clockEl.innerText = now.toLocaleTimeString('en-GB');
        }, 1000);
    },

    initTicker: function() {
        const tickerMsg = `<span class="ticker-item">Rock.Scot</span>
            <span class="ticker-item ticker-brand">Across Scotland</span>`;
        document.getElementById('ticker-out').innerHTML = tickerMsg.repeat(10);
    },

    initAudioPlayer: function() {
        const container = document.getElementById('player-container');
        container.innerHTML = `<iframe src="${STATION_CONFIG.meta.streamUrl}" frameborder="0" allow="autoplay" style="width:100%;height:200px;"></iframe>`;
    },

    initSignals: function() {
        const sigEl = document.getElementById('sig-list');
        sigEl.innerHTML = STATION_CONFIG.signals.map(s => 
            `<div style="padding:5px 0;"><span style="color:#0f0;">●</span> ${s}: PEAK</div>`).join('');
    },

    setBackground: function() {
        document.body.style.backgroundImage = `url('${STATION_CONFIG.newsImages[this.bgIndex]}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    },

    switchTab: function(tabId, event) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('v-' + tabId).classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        event.currentTarget.classList.add('active');

        // Cycle background
        this.bgIndex = (this.bgIndex + 1) % STATION_CONFIG.newsImages.length;
        this.setBackground();

        if(tabId === 'crew') this.loadCrew();
        if(tabId === 'wire') this.loadWire();
    },

    loadCrew: function() {
        const roller = document.getElementById('crew-roller');
        roller.innerHTML = STATION_CONFIG.djs.map(d =>
            `<div class="crew-card" onclick="app.showBio('${d.id}')">
                <img src="${d.img}" alt="${d.name}">
                <div class="crew-info">
                    <h3>${d.name}</h3>
                    <p>${d.title}</p>
                </div>
            </div>`).join('');
    },

    showBio: function(id) {
        const dj = STATION_CONFIG.djs.find(d => d.id === id);
        if(!dj) return;
        alert(`${dj.name}\n${dj.title}\n\n${dj.bio}`); // temporary simple modal
    },

    loadWire: function() {
        const wire = document.getElementById('wire-grid');
        wire.innerHTML = `<p style="color:#ff5500;">WIRE feed coming soon...</p>`;
    },

    openAdModal: function() {
        alert("Advertising Portal Launched");
    },

    openSubmitModal: function() {
        alert("Upload Track Portal Opened");
    }
};

// INIT APP
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
