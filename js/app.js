/** CONFIG IMPORTED FROM config.js */
const STATION_CONFIG = {
    meta: {
        email: "sales@rock.scot",
        streamUrl: "https://player.broadcast.radio/caledondia-tx-ltd"
    },
    prices: {
        packages: [
            { id: 299, name: "Single Region (£299)" },
            { id: 449, name: "Multi-Region (£449)" },
            { id: 2500, name: "Top-of-Hour Exclusive (£2,500/mo)" }
        ],
        productionFee: 195,
        surchargeThreshold: 28, // days
        surchargeRate: 1.3 // 30% add-on
    },
    djs: [
        { id:'alex', name:'ALEX', title:"Johnstone's Vinyl Viking", img:'assets/images/crew/dj_alex.jpg', bio:`Born and bred in Johnstone...` },
        { id:'andy', name:'ANDY', title:"East Kilbride's Rock Rebel", img:'assets/images/crew/dj_andy.jpg', bio:`Hailing from East Kilbride...` },
        { id:'stevie', name:'STEVIE', title:"Port Glasgow's Headbanger", img:'assets/images/crew/dj_stevie.jpg', bio:`From the shipbuilding heart...` },
        { id:'mhairi', name:'MHAIRI', title:"Hamilton's Hard Rock Queen", img:'assets/images/crew/dj_mhairi.jpg', bio:`Hamilton in South Lanarkshire...` },
        { id:'jude', name:'JUDE', title:"Irvine's Indie Rock Icon", img:'assets/images/crew/dj_jude.jpg', bio:`North Ayrshire's Irvine is Jude's stomping ground...` },
        { id:'chris', name:'CHRIS', title:"Greenock's Guitar Guru", img:'assets/images/crew/dj_chris.jpg', bio:`Greenock in Inverclyde bred Chris...` },
        { id:'cal', name:'CAL', title:"Kilmarnock's Classic Rocker", img:'assets/images/crew/dj_cal.jpg', bio:`Straight out of Kilmarnock...` },
        { id:'blue', name:'BLUE', title:"Gourock's Bluesy Rock Maverick", img:'assets/images/crew/dj_blue.jpg', bio:`From the seaside charm of Gourock...` }
    ],
    signals: ["LANARKSHIRE", "INVERCLYDE", "AYRSHIRE"],
    news: {
        feed: "https://api.rss2json.com/v1/api.json?rss_url=https://snackmag.co.uk/category/music/feed",
        images: [
            "assets/images/background/background1.jpg",
            "assets/images/background/background2.jpg",
            "assets/images/background/background3.jpg",
            "assets/images/background/background4.jpg",
            "assets/images/background/background5.jpg",
            "assets/images/background/background6.jpg",
            "assets/images/background/background7.jpg"
        ]
    }
};

const app = {
    currentView: 'live',
    bgIndex: 0,
    audioEl: null,

    init: function(){
        this.audioEl = document.getElementById('live-stream');

        // Clock
        setInterval(() => {
            const d = new Date();
            document.getElementById('clock').innerText = d.toTimeString().split(' ')[0];
        }, 1000);

        // Ticker
        const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
        document.getElementById('ticker-out').innerHTML = msg.repeat(10);

        // Signal List
        document.getElementById('sig-list').innerHTML = STATION_CONFIG.signals.map(l =>
            `<div style="padding:5px 0; border-bottom:1px solid #333;"><span style="color:#0f0">●</span> ${l}: PEAK</div>`
        ).join('');

        // Initial Background
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIndex]}')`;

        // Load initial Crew
        this.loadCrew();
    },

    switchTab: function(viewId, btnEl){
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('v-'+viewId).classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
        this.currentView = viewId;

        // Rotate Background
        this.bgIndex = (this.bgIndex + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIndex]}')`;

        if(viewId==='wire') this.loadWire();
        if(viewId==='crew') this.loadCrew();
    },

    loadCrew: function(){
        const trk = document.getElementById('crew-roller');
        trk.innerHTML = STATION_CONFIG.djs.map(d => `
            <div class="crew-card" onclick="app.openBio('${d.id}')">
                <img src="${d.img}" alt="${d.name}">
                <div class="crew-info">
                    <h3 style="font-family:'Bebas Neue'; font-size:1.8rem;">${d.name}</h3>
                    <p style="font-size:0.8rem; color:#aaa;">${d.title}</p>
                </div>
            </div>
        `).join('');
    },

    openBio: function(id){
        const dj = STATION_CONFIG.djs.find(d => d.id===id);
        if(dj){
            document.getElementById('gen-title').innerText = dj.name;
            document.getElementById('gen-body').innerText = dj.bio;
            document.getElementById('gen-modal').classList.add('open');
        }
    },

    loadWire: async function(){
        const grid = document.getElementById('wire-grid');
        grid.innerHTML = '<h3>TUNING...</h3>';
        try {
            const res = await fetch(STATION_CONFIG.news.feed);
            const data = await res.json();
            grid.innerHTML = data.items.map(i => `
                <div class="uniform-card" onclick="app.openNews('${i.title.replace(/'/g,"")}', '${escape(i.description)}')">
                    <h4 style="color:#ff5500; font-family:Oswald;">${i.title}</h4>
                    <p style="font-size:0.8rem;">Tap to read</p>
                </div>
            `).join('');
        } catch(e){
            grid.innerHTML = '<h3>WIRE OFFLINE</h3>';
        }
    },

    openNews: function(title, desc){
        document.getElementById('gen-title').innerText = title;
        document.getElementById('gen-body').innerHTML = unescape(desc);
        document.getElementById('gen-modal').classList.add('open');
    },

    openAdModal: function(){ document.getElementById('ad-modal').classList.add('open'); },
    openSubmitModal: function(){
        document.getElementById('gen-title').innerText="SUBMIT TRACK";
        document.getElementById('gen-body').innerHTML=`<p>Ensure 24/7 Ofcom Compliance.</p>
        <input type="file" class="std-input">
        <button class="btn-auth" onclick="alert('SENT')">UPLOAD</button>`;
        document.getElementById('gen-modal').classList.add('open');
    },

    closeModals: function(){ document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('open')); }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => app.init());
