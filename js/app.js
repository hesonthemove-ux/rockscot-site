const STATION_CONFIG = {
    meta: { email:"sales@rock.scot", streamUrl:"https://player.broadcast.radio/caledondia-tx-ltd" },
    prices: {
        packages:[
            {id:299, name:"Single Region (£299)"},
            {id:449, name:"Multi-Region (£449)"},
            {id:2500, name:"Top-of-Hour Exclusive (£2,500/mo)"}
        ],
        productionFee:195,
        surchargeThreshold:28,
        surchargeRate:1.3
    },
    djs:[
        {id:'alex', name:'ALEX', title:"Johnstone's Vinyl Viking", img:'./assets/images/djs/dj_alex.jpg', bio:'Known as "Johnstone\'s Vinyl Viking", Alex curates deep cuts and prog-rock.'},
        {id:'andy', name:'ANDY', title:"East Kilbride Rebel", img:'./assets/images/djs/dj_andy.jpg', bio:'Andy brings chaotic punk and indie energy to the station.'}
        // Add rest as before
    ],
    news:{ feed:"https://api.rss2json.com/v1/api.json?rss_url=https://snackmag.co.uk/category/music/feed", images:["./assets/images/background/background1.jpg","./assets/images/background/background2.jpg","./assets/images/background/background3.jpg","./assets/images/background/background4.jpg","./assets/images/background/background5.jpg","./assets/images/background/background6.jpg","./assets/images/background/background7.jpg"] },
    signals:["LANARKSHIRE","INVERCLYDE","AYRSHIRE"]
};

const app = {
    bgIdx:0,
    init:function(){
        setInterval(()=>{document.getElementById('clock').innerText=new Date().toTimeString().split(' ')[0];},1000);
        const msg='<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
        document.getElementById('ticker-out').innerHTML=msg.repeat(10);
        const pkgSel=document.getElementById('pkg-opt');
        if(pkgSel) pkgSel.innerHTML=STATION_CONFIG.prices.packages.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
        const sigList=document.getElementById('sig-list');
        if(sigList) sigList.innerHTML=STATION_CONFIG.signals.map(l=>`<div><span style="color:#0f0">●</span> ${l}: PEAK</div>`).join('');
        document.body.style.backgroundImage=`url('${STATION_CONFIG.news.images[0]}')`;
        // Event delegation for nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn=>btn.addEventListener('click',e=>{
            const target=e.currentTarget.dataset.target;
            app.switchTab(target,e.currentTarget);
        }));
    },
    switchTab:function(id,btn){
        document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
        document.getElementById('v-'+id).classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        this.bgIdx=(this.bgIdx+1)%STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage=`url('${STATION_CONFIG.news.images[this.bgIdx]}')`;
        if(id==='wire') this.loadWire();
        if(id==='crew') this.loadCrew();
    },
    loadCrew:function(){
        const trk=document.getElementById('crew-roller');
        if(!trk) return;
        trk.innerHTML=STATION_CONFIG.djs.map(d=>`
            <div class="crew-card" onclick="app.openBio('${d.id}')">
                <img src="${d.img}">
                <div class="crew-info">
                    <h3 style="font-family:'Bebas Neue'; font-size:2rem;">${d.name}</h3>
                    <p style="font-size:0.8rem; color:#aaa;">${d.title}</p>
                </div>
            </div>
        `).join('');
    },
    openBio:function(id){
        const p=STATION_CONFIG.djs.find(x=>x.id===id);
        if(p){
            document.getElementById('gen-title').innerText=p.name;
            document.getElementById('gen-body').innerText=p.bio;
            document.getElementById('gen-modal').classList.add('open');
        }
    },
    loadWire:async function(){
        const g=document.getElementById('wire-grid');
        if(!g) return;
        g.innerHTML='<h3>TUNING...</h3>';
        try{
            const res=await fetch(STATION_CONFIG.news.feed);
            const data=await res.json();
            g.innerHTML=data.items.map(i=>`
                <div class="uniform-card" onclick="app.openNews('${i.title.replace(/'/g,"")}', '${escape(i.description)}')">
                    <h4 style="color:#ff5500; font-family:'Oswald';">${i.title}</h4>
                    <p style="font-size:0.8rem; margin-top:10px;">Tap to read</p>
                </div>
            `).join('');
        }catch(e){ g.innerHTML='<h3>WIRE OFFLINE</h3>'; }
    },
    openNews:function(t,d){
        document.getElementById('gen-title').innerText=t;
        document.getElementById('gen-body').innerHTML=unescape(d);
        document.getElementById('gen-modal').classList.add('open');
    },
    openAdModal:function(){document.getElementById('ad-modal')?.classList.add('open');},
    openSubmitModal:function(){
        document.getElementById('gen-title').innerText="SUBMIT TRACK";
        document.getElementById('gen-body').innerHTML=`<p>Ensure 24/7 Ofcom Compliance.</p><input type="file" class="std-input"><button class="btn-auth" onclick="alert('SENT')">UPLOAD</button>`;
        document.getElementById('gen-modal').classList.add('open');
    },
    closeModals:function(){document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('open'));}
};

app.init();
