// app.js
import { crewData } from './crew.js';
import { wireData } from './wire.js';

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

// Clock
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  document.getElementById('clock').textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// Audio
const audio = document.getElementById('stream');
audio.src = 'https://player.broadcast.radio/caledondia-tx-ltd';
audio.controls = true;

// Crew Carousel
const crewCarousel = document.getElementById('crew-carousel');
crewData.forEach(dj => {
  const div = document.createElement('div');
  div.className = 'crew-member';
  div.innerHTML = `
    <img src="assets/images/crew/${dj.img}" alt="${dj.name}">
    <h3>${dj.name}</h3>
    <p>${dj.bio}</p>
  `;
  crewCarousel.appendChild(div);
});

// Wire Section
const wireEl = document.getElementById('wire-content');
wireData.forEach(item => {
  const p = document.createElement('p');
  p.textContent = item;
  wireEl.appendChild(p);
});

// Rates Portal
document.getElementById('launch-portal').addEventListener('click', () => {
  window.open('https://rock.scot/portal', '_blank');
});

// Departure Board Simulation
const depBoard = document.getElementById('departure-board');
const newsItems = [
  'Biffy Clyro announce new Scottish tour dates!',
  'Nazareth vinyl reissue now available.',
  'Franz Ferdinand headline Barrowland Ballroom tonight.',
  'Mogwai surprise show at Òran Mór this Friday.',
  'AC/DC tribute night at Port Glasgow community hall.'
];
let newsIndex = 0;
function updateDepartureBoard() {
  depBoard.textContent = newsItems[newsIndex];
  newsIndex = (newsIndex + 1) % newsItems.length;
}
updateDepartureBoard();
setInterval(updateDepartureBoard, 8000);
