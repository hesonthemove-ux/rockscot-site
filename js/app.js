export const app = {
    bgIdx:0,
    init:function(){
        this.initClock();
        this.initAudio();
        this.initCrew();
        this.initArrivalBoard();
        this.switchTab('live');
    },

    initClock:function(){
        const clock = document.getElementById('clock');
        setInterval(()=> {
            const d = new Date();
            clock.innerText = d.toTimeString().split(' ')[0];
        },1000);
    },

    initAudio:function(){
        const radioStream = document.getElementById('radio-stream');
        const startBtn = document.getElementById('start-stream');
        radioStream.play().catch(()=>{
            startBtn.style.display = 'inline-block';
            startBtn.addEventListener('click',()=>{
                radioStream.play();
                startBtn.style.display = 'none';
            });
        });
    },

    initCrew:function(){
        const crewData=[
            {name:'Andy', img:'assets/images/crew/dj_andy.jpg'},
            {name:'Alex', img:'assets/images/crew/dj_alex.jpg'},
            {name:'Stevie', img:'assets/images/crew/dj_stevie.jpg'},
            {name:'Mhairi', img:'assets/images/crew/dj_mhairi.jpg'},
            {name:'Jude', img:'assets/images/crew/dj_jude.jpg'},
            {name:'Chris', img:'assets/images/crew/dj_chris.jpg'},
            {name:'Cal', img:'assets/images/crew/dj_cal.jpg'},
            {name:'Blue', img:'assets/images/crew/dj_blue.jpg'}
        ];
        const track = document.getElementById('crew-roller');
        track.innerHTML=crewData.map(c=>`
            <div class="crew-card">
                <img src="${c.img}">
                <div class="crew-info"><h3>${c.name}</h3></div>
            </div>
        `).join('');

        // Optional: simple vertical scroll / rolodex rotation
        let idx=0;
        setInterval(()=>{
            idx=(idx+1)%crewData.length;
            const angle = idx*-45;
            track.style.transform=`rotateX(${angle}deg)`;
        },3500);
    },

    initArrivalBoard:function(){
        const board=document.getElementById('arrival-board');
        const messages=[
            "Rock.Scot on air – East Kilbride",
            "Andy live – 7pm-9pm",
            "Next: Alex – Vinyl Viking",
            "Traffic: clear",
            "Weather: Storm warning"
        ];
        let i=0;
        function updateBoard(){
            board.innerHTML='';
            for(let j=0;j<3;j++){
                const div=document.createElement('div');
                div.innerText=messages[(i+j)%messages.length];
                board.appendChild(div);
            }
            i=(i+1)%messages.length;
        }
        setInterval(updateBoard,3000);
        updateBoard();
    },

    switchTab:function(id){
        document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
        document.getElementById('v-'+id).classList.add('active');
        document.querySelectorAll('.main-menu button').forEach(b=>b.classList.remove('active'));
        document.querySelector(`.main-menu button[onclick="app.switchTab('${id}')"]`).classList.add('active');
    },

    openAdModal:function(){ alert("Portal coming soon"); },
    openSubmitModal:function(){ alert("Upload coming soon"); }
};

app.init();
