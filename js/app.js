/** ==========================================
 * Phase 4 App.js - Rock.Scot
 * Handles Clock, Tabs, Ticker, Player, Crew, Ads, Modals, DJ Bios
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
        { id:'alex', name:'ALEX', title:"Johnstone's Vinyl Viking", img:'assets/images/crew/dj_alex.jpg', bio:'Born and bred in Johnstone (Renfrewshire), Alex discovered rock digging through his uncle\'s record collection—Nazareth\'s "Hair of the Dog" changed everything. He now rocks the airwaves on Rock.Scot with deep cuts and local shout-outs.' },
        { id:'andy', name:'ANDY', title:"East Kilbride's Rock Rebel", img:'assets/images/crew/dj_andy.jpg', bio:'Hailing from East Kilbride, Andy grew up blasting Biffy Clyro. Started pirate radio in his garage before landing at Rock.Scot, bringing high-energy playlists to listeners across Inverclyde, South Lanarkshire, and North Ayrshire.' },
        { id:'stevie', name:'STEVIE', title:"Port Glasgow's Headbanger", img:'assets/images/crew/dj_stevie.jpg', bio:'From Port Glasgow, Stevie formed a garage band and switched to DJing. Late-night shows keep Inverclyde headbanging from Greenock to Gourock.' },
        { id:'mhairi', name:'MHAIRI', title:"Hamilton's Hard Rock Queen", img:'assets/images/crew/dj_mhairi.jpg', bio:'Hamilton gave Mhairi her first taste of live rock. Witty banter and killer playlists now light up Rock.Scot for Hamilton, East Kilbride, and beyond.' },
        { id:'jude', name:'JUDE', title:"Irvine's Indie Rock Icon", img:'assets/images/crew/dj_jude.jpg', bio:'North Ayrshire\'s Jude champions emerging Scottish acts alongside classics. Lifelong love for melodic rock and coastal vibes.' },
        { id:'chris', name:'CHRIS', title:"Greenock's Guitar Guru", img:'assets/images/crew/dj_chris.jpg', bio:'Greenock bred Chris on Primal Scream. Started as a pub DJ, now blasts rock across the Firth of Clyde on Rock.Scot.' },
        { id:'cal', name:'CAL', title:"Kilmarnock's Classic Rocker", img:'assets/images/crew/dj_cal.jpg', bio:'From Kilmarnock, Cal grew up on Biffy Clyro and The Sensational Alex Harvey Band. Delivers timeless rock to Rock.Scot fans in Kilmarnock, Irvine, and North Ayrshire.' },
        { id:'blue', name:'BLUE', title:"Gourock's Bluesy Maverick", img:'assets/images/crew/dj_blue.jpg', bio:'From Gourock, Blue blends bluesy riffs with rock energy, DJing beach parties before hitting Rock.Scot waves for listeners from Gourock to Wemyss Bay.' }
    ],
    signals:["LANARKSHIRE","INVERCLYDE","AYRSHIRE"],
    news: {
        images:[
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
    bgIdx:0,
    init:function(){
        // Clock
        setInterval(()=> {
            const d = new Date();
            document.getElementById('clock').innerText = d.toTimeString().split(' ')[0];
        },1000);

        // Ticker
        const ticker = document.getElementById('ticker-out');
        const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
        ticker.innerHTML = msg.repeat(10);

        // Player
        document.getElementById('player-container').innerHTML = `<audio controls autoplay loop style="width:100%;"><source src="${STATION_CONFIG.meta.streamUrl}" type="audio/mpeg"></audio>`;

        // Packages for calculator
        const pkgSel = document.getElementById('pkg-opt');
        pkgSel.innerHTML = STATION_CONFIG.prices.packages.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
        document.getElementById('prod-price-display').innerText = `£${STATION_CONFIG.prices.productionFee}`;

        // Signals
        document.getElementById('sig-list').innerHTML = STATION_CONFIG.signals.map(l=>`<div><span>●</span> ${l}: PEAK</div>`).join('');

        // Background
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;
    },
    switchTab:function(id){
        document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
        document.getElementById('v-'+id).classList.add('active');
        event.currentTarget.classList.add('active');

        // Rotate Background
        this.bgIdx = (this.bgIdx+1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;

        if(id==='crew') this.loadCrew();
    },
    loadCrew:function(){
        const trk = document.getElementById('crew-roller');
        trk.innerHTML = STATION_CONFIG.djs.map(d=>`
            <div class="crew-card" onclick="app.openBio('${d.id}')">
                <img src="${d.img}">
                <div class="crew-info">
                    <h3>${d.name}</h3>
                    <p>${d.title}</p>
                </div>
            </div>
        `).join('');
    },
    openBio:function(id){
        const dj = STATION_CONFIG.djs.find(d=>d.id===id);
        if(dj){
            document.getElementById('gen-title').innerText = dj.name;
            document.getElementById('gen-body').innerText = dj.bio;
            document.getElementById('gen-modal').classList.add('open');
        }
    },
    openAdModal:function(){document.getElementById('ad-modal').classList.add('open');},
    calcTotal:function(){
        let base = parseInt(document.getElementById('pkg-opt').value);
        let prod = document.getElementById('prod-add').checked ? STATION_CONFIG.prices.productionFee : 0;
        let start = new Date(document.getElementById('d-start').value);
        let end = new Date(document.getElementById('d-end').value);
        let sur = 1.0;
        if(start && end && !isNaN(start) && !isNaN(end)){
            const days = (end-start)/(1000*3600*24);
            if(days>0 && days<STATION_CONFIG.prices.surchargeThreshold){
                sur=STATION_CONFIG.prices.surchargeRate;
                document.getElementById('sur-alert').style.display='block';
            } else {document.getElementById('sur-alert').style.display='none';}
        }
        let total = Math.round((base*sur)+prod);
        document.getElementById('final-price').innerText = "£"+total;
    },
    sendEmail:function(){
        const biz = document.getElementById('biz-name').value;
        const tot = document.getElementById('final-price').innerText;
        window.location.href=`mailto:${STATION_CONFIG.meta.email}?subject=Ad Inquiry: ${biz}&body=Business: ${biz}%0D%0ATotal Est: ${tot}%0D%0AI agree to terms.`;
    },
    genPDF:function(){
        document.getElementById('p-date').innerText = new Date().toLocaleDateString();
        document.getElementById('p-client').innerText = document.getElementById('biz-name').value || "CLIENT";
        document.getElementById('p-total').innerText = document.getElementById('final-price').innerText;
        const el = document.getElementById('pdf-doc');
        el.style.display='block';
        html2pdf().from(el).save('RockScot_Contract.pdf').then(()=>{el.style.display='none';});
    },
    openSubmitModal:function(){
        document.getElementById('gen-title').innerText="SUBMIT TRACK";
        document.getElementById('gen-body').innerHTML=`<p>Ensure 24/7 OFCOM Compliance.</p><input type="file" class="std-input"><button class="btn-auth" onclick="alert('SENT')">UPLOAD</button>`;
        document.getElementById('gen-modal').classList.add('open');
    },
    closeModals:function(){document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('open'));}
};

// Initialize App
app.init();
