// ================================
// Rock.Scot Main App JS
// ================================

export const app = {
    bgIdx: 0,

    config: {
        streamUrl: "https://player.broadcast.radio/caledonia-tx-ltd",
        signals: ["LANARKSHIRE", "INVERCLYDE", "AYRSHIRE"],
        backgrounds: [
            "assets/images/background/background1.jpg",
            "assets/images/background/background2.jpg",
            "assets/images/background/background3.jpg",
            "assets/images/background/background4.jpg",
            "assets/images/background/background5.jpg",
            "assets/images/background/background6.jpg",
            "assets/images/background/background7.jpg"
        ],
        djs: [
            {
                id: 'andy',
                name: "Andy",
                title: "East Kilbride's Rock Rebel",
                img: "assets/images/djs/dj_andy.jpg",
                bio: "Hailing from East Kilbride in South Lanarkshire, Andy grew up blasting Biffy Clyro anthems..."
            },
            {
                id: 'alex',
                name: "Alex",
                title: "Johnstone's Vinyl Viking",
                img: "assets/images/djs/dj_alex.jpg",
                bio: "Born and bred in Johnstone, Alex discovered rock digging through his uncle's record collection..."
            },
            {
                id: 'stevie',
                name: "Stevie",
                title: "Port Glasgow's Headbanger",
                img: "assets/images/djs/dj_stevie.jpg",
                bio: "From Port Glasgow in Inverclyde, Stevie was raised on tales of Clyde rockers..."
            },
            {
                id: 'mhairi',
                name: "Mhairi",
                title: "Hamilton's Hard Rock Queen",
                img: "assets/images/djs/dj_mhairi.jpg",
                bio: "Hamilton in South Lanarkshire gave Mhairi her first taste of live rock at a school battle of the bands..."
            },
            {
                id: 'jude',
                name: "Jude",
                title: "Irvine's Indie Rock Icon",
                img: "assets/images/djs/dj_jude.jpg",
                bio: "North Ayrshire's Irvine is Jude's stomping ground, where beach walks with Travis on headphones sparked a lifelong love for melodic rock..."
            },
            {
                id: 'chris',
                name: "Chris",
                title: "Greenock's Guitar Guru",
                img: "assets/images/djs/dj_chris.jpg",
                bio: "Greenock in Inverclyde bred Chris on tales of shipyard workers rocking out to Primal Scream..."
            },
            {
                id: 'cal',
                name: "Cal",
                title: "Kilmarnock's Classic Rocker",
                img: "assets/images/djs/dj_cal.jpg",
                bio: "Straight out of Kilmarnock in the Ayrshire heartlands, Cal grew up on Biffy Clyro..."
            },
            {
                id: 'blue',
                name: "Blue",
                title: "Gourock's Bluesy Rock Maverick",
                img: "assets/images/djs/dj_blue.jpg",
                bio: "From the seaside charm of Gourock in Inverclyde, Blue got into rock via his grandad's Nazareth and Gerry Rafferty records..."
            }
        ]
    },

    // ================================
    // INIT
    // ================================
    init: function() {
        this.initClock();
        this.initTicker();
        this.initAudioPlayer();
        this.initSignals();
        this.initBackground();
        this.loadCrew();
    },

    initClock: function() {
        const clockEl = document.getElementById('clock');
        setInterval(() => {
            const now = new Date();
            clockEl.textContent = now.toTimeString().split(' ')[0];
        }, 1000);
    },

    initTicker: function() {
        const tickerEl = document.getElementById('ticker-out');
        const msg = `<span class="ticker-item">Rock.Scot</span><span class="ticker-item">Across Scotland</span>`;
        tickerEl.innerHTML = msg.repeat(10);
    },

    initAudioPlayer: function() {
        const playerEl = document.getElementById('player-container');
        playerEl.src = this.config.streamUrl;
    },

    initSignals: function() {
        const sigEl = document.getElementById('sig-list');
        sigEl.innerHTML = this.config.signals.map(s => 
            `<div class="signal-item"><span>●</span> ${s}: PEAK</div>`).join('');
    },

    initBackground: function() {
        document.body.style.backgroundImage = `url('${this.config.backgrounds[0]}')`;
        setInterval(() => {
            this.bgIdx = (this.bgIdx + 1) % this.config.backgrounds.length;
            document.body.style.backgroundImage = `url('${this.config.backgrounds[this.bgIdx]}')`;
        }, 15000);
    },

    // ================================
    // TAB SWITCHING
    // ================================
    switchTab: function(id, event) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`v-${id}`).classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        event.currentTarget.classList.add('active');
    },

    // ================================
    // CREW
    // ================================
    loadCrew: function() {
        const crewEl = document.getElementById('crew-roller');
        crewEl.innerHTML = this.config.djs.map(d => `
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
        const dj = this.config.djs.find(d => d.id === id);
        if (!dj) return;
        document.getElementById('gen-title').textContent = dj.name;
        document.getElementById('gen-body').textContent = dj.bio;
        document.getElementById('gen-modal').classList.add('open');
    },

    closeModals: function() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    },

    openAdModal: function() {
        alert('Advertising portal modal would open here'); // Placeholder for portal
    },

    openSubmitModal: function() {
        alert('Submit track modal would open here'); // Placeholder for upload
    }
};

// ================================
// AUTO INIT
// ================================
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
