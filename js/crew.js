/* =====================================================
   Rock.Scot SPA – crew.js
   3D Rolodex Carousel • Touch Swipe • Focus Logic
   ===================================================== */

/* ================= CONFIG ================= */

const carousel = document.getElementById('crew-carousel');

// Example DJ data – replace with real data or API later
const CREW = [
  { name: 'DJ One', img: 'assets/crew/dj1.jpg' },
  { name: 'DJ Two', img: 'assets/crew/dj2.jpg' },
  { name: 'DJ Three', img: 'assets/crew/dj3.jpg' },
  { name: 'DJ Four', img: 'assets/crew/dj4.jpg' },
  { name: 'DJ Five', img: 'assets/crew/dj5.jpg' }
];

let currentIndex = 0;
let startY = 0;
let isDragging = false;

/* ================= BUILD CARDS ================= */

function buildCarousel() {
  if (!carousel) return;

  carousel.innerHTML = '';

  CREW.forEach((dj, i) => {
    const card = document.createElement('div');
    card.className = 'crew-card';

    const img = document.createElement('img');
    img.src = dj.img;
    img.alt = dj.name;

    card.appendChild(img);
    carousel.appendChild(card);
  });

  updateCarousel();
}

/* ================= POSITIONING LOGIC ================= */

function updateCarousel() {
  const cards = document.querySelectorAll('.crew-card');

  cards.forEach((card, i) => {
    const offset = i - currentIndex;

    const rotateY = offset * 25;
    const translateZ = -Math.abs(offset) * 120;
    const translateY = offset * 12;

    card.style.transform = `
      translateY(${translateY}px)
      translateZ(${translateZ}px)
      rotateY(${rotateY}deg)
    `;

    if (offset === 0) {
      card.classList.add('focus');
      card.classList.remove('blur');
    } else {
      card.classList.remove('focus');
      card.classList.add('blur');
    }
  });
}

/* ================= TOUCH / SWIPE ================= */

function onTouchStart(e) {
  startY = e.touches[0].clientY;
  isDragging = true;
}

function onTouchMove(e) {
  if (!isDragging) return;

  const deltaY = e.touches[0].clientY - startY;

  if (Math.abs(deltaY) > 60) {
    if (deltaY > 0) {
      movePrev();
    } else {
      moveNext();
    }
    isDragging = false;
  }
}

function onTouchEnd() {
  isDragging = false;
}

/* ================= NAVIGATION ================= */

function moveNext() {
  if (currentIndex < CREW.length - 1) {
    currentIndex++;
    updateCarousel();
  }
}

function movePrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

/* ================= INIT ================= */

if (carousel) {
  buildCarousel();

  carousel.addEventListener('touchstart', onTouchStart, { passive: true });
  carousel.addEventListener('touchmove', onTouchMove, { passive: true });
  carousel.addEventListener('touchend', onTouchEnd);

  // Desktop fallback
  carousel.addEventListener('wheel', e => {
    if (e.deltaY > 0) moveNext();
    else movePrev();
  });
}
