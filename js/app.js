const app = {
    bgIdx:0,
    backgrounds:[
        'assets/images/background/background1.jpg',
        'assets/images/background/background2.jpg',
        'assets/images/background/background3.jpg',
        'assets/images/background/background4.jpg',
        'assets/images/background/background5.jpg',
        'assets/images/background/background6.jpg',
        'assets/images/background/background7.jpg'
    ],
    djs:[
        {id:'alex', name:'ALEX', img:'assets/images/crew/dj_alex.jpg', bio:'Johnstone Vinyl Viking...'},
        {id:'andy', name:'ANDY', img:'assets/images/crew/dj_andy.jpg', bio:'East Kilbride Rock Rebel...'}
        // add rest
    ],
    init:function(){
        this.startClock();
        this.initBackground();
        this.initPlayer();
        this.initArrivalBoard();
        this.loadCrew();
    },
    startClock:function(){
        const c=document.getElementById('clock');
        setInterval(()=>{let d=new Date(); c.innerText=d.toTimeString().split(' ')[0];},1000);
    },
    initBackground:function(){
        const body=document.body;
        setInterval(()=>{
            this.bgIdx=(this.bgIdx+1)%this.backgrounds.length;
            body.style.backgroundImage=`url('${this.backgrounds[this.bgIdx]}')`;
        },15000);
        body.style.backgroundImage=`url('${this.backgrounds[0]}')`;
    },
    initPlayer:function(){
        const container=document.getElementById('player-container');
        container.innerHTML=`<iframe src="https://player.broadcast.radio/caledonia-tx-ltd" allow="autoplay" style="width:100%;height:80px;border:none;"></iframe>`;
    },
    switchTab:function(id,e){
        document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
        document.getElementById('v-'+id).classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
        e.currentTarget.classList.add('active');
    },
    initArrivalBoard:function(){
        const board=document.getElementById('arrival-board');
        const signals=['LANARKSHIRE','INVERCLYDE','AYRSHIRE'];
        board.innerHTML=signals.map(s=>`<div>${s} PEAK</div>`).join('');
    },
    loadCrew:function(){
        const trk=document.getElementById('crew-rolodex');
        trk.innerHTML=this.djs.map(d=>`
            <div class="crew-card" onclick="alert('${d.bio}')">
                <img src="${d.img}">
                <h4>${d.name}</h4>
            </div>`).join('');
    },
    openAdModal:function(){ alert('Advertising Portal'); },
    openSubmitModal:function(){ alert('Submit Track'); }
};

window.addEventListener('DOMContentLoaded',()=>{app.init();});
