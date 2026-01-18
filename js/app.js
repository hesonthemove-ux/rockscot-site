/* =====================================================
   Rock.Scot App JS
   Purpose: light enhancement only
   Safe for GitHub Pages
===================================================== */

/* -----------------------------
   Background rotation (optional)
------------------------------ */

const heroSection = document.querySelector('.hero');

const backgrounds = [
  './assets/images/background/background1.jpg',
  './assets/images/background/background2.jpg',
  './assets/images/background/background3.jpg',
  './assets/images/background/background4.jpg',
  './assets/images/background/background5.jpg',
  './assets/images/background/background6.jpg',
  './assets/images/background/background7.jpg'
];

let bgIndex = 0;

function rotateBackground() {
  if (!heroSection) return;
  bgIndex = (bgIndex + 1) % backgrounds.length;
  heroSection.style.backgroundImage = `url('${backgrounds[bgIndex]}')`;
}

// Rotate every 30 seconds
setInterval(rotateBackground, 30000);

/* -----------------------------
   Smooth scroll for nav links
   (does NOT break anchors)
------------------------------ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/* -----------------------------
   Console sanity check
------------------------------ */

console.log('Rock.Scot app.js loaded successfully');
