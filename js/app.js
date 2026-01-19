const STATION_CONFIG = {
    meta:{ streamUrl:'https://player.broadcast.radio/caledondia-tx-ltd' },
    news:{ feed:'https://api.rss2json.com/v1/api.json?rss_url=https://snackmag.co.uk/category/music/feed' },
    djs:[
        {id:'alex',name:'Alex',img:'assets/images/crew/dj_alex.jpg',bio:'Johnstone\'s Vinyl Viking. Favorite: Nazareth.'},
        {id:'andy',name:'Andy',img:'assets/images/crew/dj_andy.jpg',bio:'East Kilbride Rock Rebel. Favorite: Biffy Clyro.'},
        {id:'stevie',name:'Stevie',img:'assets/images/crew/dj_stevie.jpg',bio:'Port Glasgow Headbanger. Favorite: Big Country.'},
        {id:'mhairi',name:'Mhairi',img:'assets/images/crew/dj_mhairi.jpg',bio:'Hamilton Hard Rock Queen. Favorite: The Jesus and Mary Chain.'},
        {id:'jude',name:'Jude',img:'assets/images/crew/dj_jude.jpg',bio:'Irvine Indie Rock Icon. Favorite: Travis.'},
        {id:'chris',name:'Chris',img:'assets/images/crew/dj_chris.jpg',bio:'Greenock Guitar Guru. Favorite: Primal Scream.'},
        {id:'cal',name:'Cal',img:'assets/images/crew/dj_cal.jpg',bio:'Kilmarnock Classic Rocker. Favorite: Biffy Clyro.'},
        {id:'blue',name:'Blue',img:'assets/images/crew/dj_blue.jpg',bio:'Gourock Bluesy Maverick. Favorite: Nazareth.'}
    ]
};

const app = {
    bgIdx:0,
    init:function(){
        // Clock
        setInterval(()=>{ document.getElementById('clock').innerText=new Date().toLocaleTimeString(); },1000);
        // Background rotate
        this.rotateBackground();
        setInterval(()=>{ this.rotateBackground(); },15000);
        // Crew
        this.loadCrew();
        // Nav events
        document.querySelectorAll('.nav-btn').forEach(btn=>{
            btn.addEventListener('click',()=>{ this.switchTab(btn.dataset.tab,btn); });
        });
        // Audio
        document.getElementById('play-stream').addEventListener('click',()=>{
            const audio=document.getElementById('audio-player');
            audio.play();
        });
        // Departure board
        this.loadDepartureBoard();
        setInterval(()=>{ this.loadDepartureBoard(); },20000);
    },
    rotateBackground:function(){
        const bgs=['assets/images/background/background1.jpg','assets/images/background/background2.jpg','assets/images/background/background3.jpg','assets/images/background/background4.jpg','assets/images/background/background5.jpg','assets/images/background/background6.jpg','assets/images/background/background7.jpg'];
        this.bgIdx=(this.bgIdx+1)%bgs.length;
        document.body.style.backgroundImage=`url('${bgs[this.bgIdx]}')`;
        document.body.style.backgroundSize='cover';
        document.body.style.backgroundPosition='center';
    },
    switchTab:function(tab,btn){
        document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
        document.getElementById('v-'+tab).classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
    },
    loadCrew:function(){
        const trk=document.getElementById('crew-roller');
        trk.innerHTML=STATION_CONFIG.djs.map(d=>`
            <div class="crew-card" onclick="alert('${d.bio}')">
                <img src="${d.img}" alt="${d.name}">
                <div class="crew-info"><strong>${d.name}</strong><br>${d.bio.split('.')[0]}</div>
            </div>
        `).join('');
    },
    loadDepartureBoard:function(){
        fetch(STATION_CONFIG.news.feed).then(res=>res.json()).then(data=>{
            const board=document.getElementById('departure-board');
            const items=data.items.sort(()=>0.5-Math.random()).slice(0,6);
            board.innerHTML=items.map(i=>`<li>${i.title}</li>`).join('');
        }).catch(e=>console.log(e));
    }
};

document.addEventListener('DOMContentLoaded',()=>{ app.init(); });
