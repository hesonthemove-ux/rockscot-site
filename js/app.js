/* CLOCK */
function startClock() {
  const clock = document.getElementById('clock');
  setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString('en-GB');
  }, 1000);
}

/* BACKGROUND ROTATION */
let bgIndex = 0;
function rotateBackground() {
  const bg = document.getElementById('background');
  bg.style.backgroundImage =
    `url(${ROCKSCOT_CONFIG.backgrounds[bgIndex]})`;
  bgIndex = (bgIndex + 1) % ROCKSCOT_CONFIG.backgrounds.length;
}

/* NAVIGATION */
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document
      .querySelectorAll('.view')
      .forEach(v => v.classList.remove('active'));

    document
      .getElementById(link.dataset.view)
      .classList.add('active');
  });
});

/* CREW */
function loadCrew() {
  const grid = document.getElementById('crewGrid');
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

/* INIT */
startClock();
rotateBackground();
setInterval(rotateBackground, 15000);
loadCrew();
