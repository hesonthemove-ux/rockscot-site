const STATION_CONFIG = {
  meta: { streamUrl:"https://player.broadcast.radio/caledondia-tx-ltd" },
  signals:["LANARKSHIRE","INVERCLYDE","AYRSHIRE"],
  news:{ feed:"https://api.rss2json.com/v1/api.json?rss_url=https://snackmag.co.uk/category/music/feed" },
  djs:[
    { id:'andy', name:'Andy', title:"East Kilbride's Rock Rebel", img:'assets/images/crew/dj_andy.jpg', bio:'Hailing from East Kilbride...'},
    { id:'alex', name:'Alex', title:"Johnstone's Vinyl Viking", img:'assets/images/crew/dj_alex.jpg', bio:'Born and bred in Johnstone...'},
    { id:'stevie', name:'Stevie', title:"Port Glasgow Headbanger", img:'assets/images/crew/dj_stevie.jpg', bio:'From Port Glasgow...'},
    { id:'mhairi', name:'Mhairi', title:"Hamilton's Hard Rock Queen", img:'assets/images/crew/dj_mhairi.jpg', bio:'Hamilton in South Lanarkshire...'},
    { id:'jude', name:'Jude', title:"Irvine's Indie Rock Icon", img:'assets/images/crew/dj_jude.jpg', bio:'North Ayrshire\'s Irvine...'},
    { id:'chris', name:'Chris', title:"Greenock's Guitar Guru", img:'assets/images/crew/dj_chris.jpg', bio:'Greenock in Inverclyde...'},
    { id:'cal', name:'Cal', title:"Kilmarnock's Classic Rocker", img:'assets/images/crew/dj_cal.jpg', bio:'Straight out of Kilmarnock...'},
    { id:'blue', name:'Blue', title:"Gourock's Bluesy Maverick", img:'assets/images/crew/dj_blue.jpg', bio:'From Gourock...'}
  ]
};

const app = {
  audio:null,
  bgIdx:0,
  init:function(){
    const clockEl=document.getElementById('clock');
    setInterval(()=>{ const d=new Date(); clockEl.innerText=d.toTimeString().split(' ')[0]; },1000);

    // Signals
    document.getElementById('sig-list').innerHTML=STATION_CONFIG.signals.map(s=>`<div>${s}</div>`).join('');

    // Crew
    const crewRoll=document.getElementById('crew-roller');
    STATION_CONFIG.djs.forEach(d=>{
      const div=document.createElement('div'); div.className='crew-card';
      div.innerHTML=`<img src="${d.img}"><div class="crew-info"><h3>${d.name}</h3><p>${d.title}</p></div>`;
      crewRoll.appendChild(div);
    });

    // Departure board
    this.loadDepartureBoard();

    // Audio click to start
    document.getElementById('btn-play').addEventListener('click',()=>{
      if(!this.audio){
        this.audio=new Audio(STATION_CONFIG.meta.streamUrl);
        this.audio.play();
      }
    });
  },
  switchTab:function(id,e){
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.getElementById('v-'+id).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    e.currentTarget.classList.add('active');
  },
  loadDepartureBoard:function(){
    const board=document.getElementById('departure-board');
    fetch(STATION_CONFIG.news.feed)
      .then(r=>r.json())
      .then(data=>{
        const items=data.items;
        let idx=0;
        setInterval(()=>{
          if(items.length===0) return;
          board.innerText=items[idx].title;
          idx=(idx+1)%items.length;
        },15000);
      }).catch(e=>{ board.innerText='No news available'; });
  }
};

window.addEventListener('DOMContentLoaded',()=>app.init());
