// app.js
import { crewData } from './crew.js';
import { wireData } from './wire.js';
import { modals } from './modals.js';
import { player } from './player.js';
import { ui } from './ui.js';
import { state } from './state.js';
import { views } from './views.js';

// --- Background Slideshow ---
const backgrounds = [
  'assets/images/background/background1.jpg',
  'assets/images/background/background2.jpg',
  'assets/images/background/background3.jpg',
  'assets/images/background/background4.jpg',
  'assets/images/background/background5.jpg',
  'assets/images/background/background6.jpg',
  'assets/images/background/background7.jpg'
];

let bgIndex = 0;
const bgEl = document.getElementById('background-slideshow');

function nextBackground() {
  bgEl.style.backgroundImage = `url('${backgrounds[bgIndex]}')`;
  bgIndex = (bgIndex + 1) % backgrounds.length;
}
nextBackground();
setInterval(nextBackground, 15000);

// --- Clock ---
const clockEl = document.getElementById('clock');
function updateClock() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// --- Audio Stream ---
const audioEl = document.createElement('audio');
audioEl.id = 'stream';
audioEl.controls = true;
audioEl.src = 'https://player.broadcast.radio/caledondia-tx-ltd';
audioEl.preload = 'none';
document.getElementById('player-container').appendChild(audioEl);

// --- Navigation & View Switching ---
const navBtns = document.querySelectorAll('.nav-btn');
const viewsEls = document.querySelectorAll('.view');

window.app = {
  switchTab(tabId, event) {
    viewsEls.forEach(v => v.classList.remove('active'));
    document.getElementById(`v-${tabId}`).classList.add('active');
    navBtns.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
  },
  openAdModal() { modals.open('ad'); },
  openSubmitModal() { modals.open('submit'); }
};

// --- Departure Board ---
const depBoardEl = document.getElementById('departure-board');

// Example dynamic RSS headlines (simulate fetch)
let departureItems = [
  'Biffy Clyro announce new Scottish tour!',
  'Franz Ferdinand headline at Barrowland Ballroom!',
  'Nazareth vinyl reissue now available!',
  'AC/DC tribute night in Port Glasgow this Friday!',
  'Mogwai surprise show at Òran Mór!'
];

let depIndex = 0;
function updateDepartureBoard() {
  depBoardEl.textContent = departureItems[depIndex];
  depIndex = (depIndex + 1) % departureItems.length;
}
updateDepartureBoard();
setInterval(updateDepartureBoard, 8000);

// --- Crew Carousel ---
const crewEl = document.getElementById('crew-roller');
crewData.forEach(dj => {
  const div = document.createElement('div');
  div.className = 'crew-member';
  div.innerHTML = `
    <img src="assets/images/crew/${dj.img}" alt="${dj.name}">
    <h3>${dj.name}</h3>
    <p>${dj.bio}</p>
  `;
  crewEl.appendChild(div);
});

// --- Wire Section ---
const wireEl = document.getElementById('wire-grid');
wireData.forEach(item => {
  const p = document.createElement('p');
  p.textContent = item;
  wireEl.appendChild(p);
});

// --- Signal Section (Live) ---
const sigEl = document.getElementById('sig-list');
const signals = ['Inverclyde', 'South Lanarkshire', 'North Ayrshire'];
signals.forEach(s => {
  const li = document.createElement('div');
  li.textContent = `${s}: GOOD`;
  sigEl.appendChild(li);
});
