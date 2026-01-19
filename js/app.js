/* =====================
   CLOCK
===================== */
function startClock() {
  const clock = document.getElementById('clock');
  setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString('en-GB');
  }, 1000);
}

/* =====================
   BACKGROUND ROTATION
===================== */
let bgIndex = 0;
function rotateBackground() {
  const bg = document.getElementById('background');
  bg.style.backgroundImage =
    `url(${ROCKSCOT_CONFIG.backgrounds[bgIndex]})`;
  bgIndex = (bgIndex + 1) % ROCKSCOT_CONFIG.backgrounds.length;
}

/* =====================
   NAVIGATION
===================== */
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.view')
      .forEach(v => v.classList.remove('active'));

    document
      .getElementById(link.dataset.view)
      .classList.add('active');
  });
});

/* =====================
   CREW LOAD
===================== */
function loadCrew() {
  const grid = document.getElementById('crewGrid');
  grid.innerHTML = '';

  ROCKSCOT_CONFIG.crew.forEach(dj => {
    const card = document.createElement('div');
    card.className = 'crew-card';
    card.innerHTML = `
      <img src="${dj.img}" alt="${dj.name}">
      <p>${dj.name}</p>
    `;
    grid.appendChild(card);
  });
}

/* =====================
   WIRE (RSS FEED)
===================== */
async function loadWire() {
  const wire = document.getElementById('wire');

  wire.innerHTML = `
    <h1>The Wire</h1>
    <p>Loading Scottish rock headlines…</p>
  `;

  try {
    const rssUrl =
      'https://feeds.feedburner.com/nme/news';

    const api =
      'https://api.rss2json.com/v1/api.json?rss_url=' +
      encodeURIComponent(rssUrl);

    const res = await fetch(api);
    const data = await res.json();

    const list = document.createElement('ul');
    list.style.marginTop = '20px';

    data.items.slice(0, 8).forEach(item => {
      const li = document.createElement('li');
      li.style.marginBottom = '12px';
      li.innerHTML = `
        <strong>${item.title}</strong><br>
        <span style="font-size:0.85em; opacity:0.8;">
          ${item.pubDate.split(' ')[0]}
        </span>
      `;
      list.appendChild(li);
    });

    wire.appendChild(list);

  } catch (err) {
    wire.innerHTML +=
      '<p>Wire temporarily offline.</p>';
  }
}

/* =====================
   INIT
===================== */
startClock();
rotateBackground();
setInterval(rotateBackground, 15000);
loadCrew();
loadWire();
