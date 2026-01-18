/* ==========================================
   Rock.Scot Phase 6 App Controller
   ========================================== */

const app = (() => {

  /* ------------------------------
     CONFIG (MATCHES YOUR STRUCTURE)
  ------------------------------ */
  const STREAM_URL = "https://player.broadcast.radio/caledondia-tx-ltd";

  const BACKGROUNDS = [
    "assets/images/background/background1.jpg",
    "assets/images/background/background2.jpg",
    "assets/images/background/background3.jpg",
    "assets/images/background/background4.jpg",
    "assets/images/background/background5.jpg",
    "assets/images/background/background6.jpg",
    "assets/images/background/background7.jpg"
  ];

  const TICKER_MESSAGES = [
    "ROCK.SCOT – CENTRAL SCOTLAND'S ROCK AUTHORITY",
    "SERVING SOUTH LANARKSHIRE • INVERCLYDE • NORTH AYRSHIRE",
    "LISTEN LIVE 24/7 • ROCK • INDIE • CLASSICS",
    "ADVERTISE YOUR BUSINESS ON ROCK.SCOT",
    "SUPPORTING SCOTTISH ROCK MUSIC"
  ];

  const CREW = [
    { name: "Andy", img: "assets/images/crew/dj_andy.jpg", role: "East Kilbride's Rock Rebel" },
    { name: "Alex", img: "assets/images/crew/dj_alex.jpg", role: "Johnstone's Vinyl Viking" },
    { name: "Stevie", img: "assets/images/crew/dj_stevie.jpg", role: "Port Glasgow's Headbanger" },
    { name: "Mhairi", img: "assets/images/crew/dj_mhairi.jpg", role: "Hamilton's Hard Rock Queen" },
    { name: "Jude", img: "assets/images/crew/dj_jude.jpg", role: "Irvine's Indie Icon" },
    { name: "Chris", img: "assets/images/crew/dj_chris.jpg", role: "Greenock's Guitar Guru" },
    { name: "Cal", img: "assets/images/crew/dj_cal.jpg", role: "Kilmarnock's Classic Rocker" },
    { name: "Blue", img: "assets/images/crew/dj_blue.jpg", role: "Gourock's Blues Maverick" }
  ];

  let bgIndex = 0;
  let audioEl = null;

  /* ------------------------------
     INIT
  ------------------------------ */
  function init() {
    startClock();
    startBackgrounds();
    buildTicker();
    buildPlayer();
    buildCrew();
    showView("live");
  }

  /* ------------------------------
     CLOCK
  ------------------------------ */
  function startClock() {
    const clockEl = document.getElementById("clock");
    if (!clockEl) return;

    setInterval(() => {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }, 1000);
  }

  /* ------------------------------
     BACKGROUND ROTATION
  ------------------------------ */
  function startBackgrounds() {
    document.body.style.backgroundImage = `url('${BACKGROUNDS[0]}')`;

    setInterval(() => {
      bgIndex = (bgIndex + 1) % BACKGROUNDS.length;
      document.body.style.backgroundImage = `url('${BACKGROUNDS[bgIndex]}')`;
    }, 15000);
  }

  /* ------------------------------
     TICKER
  ------------------------------ */
  function buildTicker() {
    const ticker = document.getElementById("ticker-out");
    if (!ticker) return;

    ticker.innerHTML = "";

    TICKER_MESSAGES.concat(TICKER_MESSAGES).forEach(text => {
      const span = document.createElement("div");
      span.className = "ticker-item";
      span.textContent = text;
      ticker.appendChild(span);
    });
  }

  /* ------------------------------
     AUDIO PLAYER
  ------------------------------ */
  function buildPlayer() {
    const container = document.getElementById("player-container");
    if (!container) return;

    if (!audioEl) {
      audioEl = document.createElement("audio");
      audioEl.src = STREAM_URL;
      audioEl.controls = true;
      audioEl.autoplay = false;
    }

    container.innerHTML = "";
    container.appendChild(audioEl);
  }

  /* ------------------------------
     NAVIGATION
  ------------------------------ */
  function showView(view) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

    document.getElementById(`v-${view}`)?.classList.add("active");
  }

  function switchTab(view, evt) {
    if (evt) {
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
      evt.target.classList.add("active");
    }
    showView(view);
  }

  /* ------------------------------
     CREW GRID
  ------------------------------ */
  function buildCrew() {
    const track = document.getElementById("crew-roller");
    if (!track) return;

    track.innerHTML = "";

    CREW.forEach(dj => {
      const card = document.createElement("div");
      card.className = "crew-card";
      card.innerHTML = `
        <img src="${dj.img}" alt="${dj.name}">
        <div class="crew-info">
          <h3>${dj.name}</h3>
          <p>${dj.role}</p>
        </div>
      `;
      track.appendChild(card);
    });
  }

  /* ------------------------------
     MODALS
  ------------------------------ */
  function openAdModal() {
    document.getElementById("ad-modal")?.classList.add("open");
  }

  function openSubmitModal() {
    document.getElementById("gen-modal")?.classList.add("open");
    document.getElementById("gen-title").textContent = "SUBMIT YOUR MUSIC";
    document.getElementById("gen-body").innerHTML =
      "<p>Email your track to <strong>music@rock.scot</strong><br>Max 25MB • OFCOM compliant</p>";
  }

  function closeModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open"));
  }

  /* ------------------------------
     PUBLIC API
  ------------------------------ */
  return {
    init,
    switchTab,
    openAdModal,
    openSubmitModal,
    closeModals
  };

})();

/* ------------------------------
   START APP
------------------------------ */
document.addEventListener("DOMContentLoaded", app.init);
