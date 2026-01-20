/* =====================================================
   Rock.Scot SPA – core.js
   SPA Routing • Studio Clock • Admin Trigger
   ===================================================== */

/* ================= SPA TAB MANAGEMENT ================= */

const tabs = document.querySelectorAll('nav button');
const views = document.querySelectorAll('.view');

function switchTab(tab) {
  tabs.forEach(btn => btn.classList.remove('active'));
  views.forEach(view => view.classList.remove('active'));

  tab.classList.add('active');
  const target = tab.dataset.tab;
  document.getElementById(`view-${target}`).classList.add('active');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab));
});

// Default active tab
if (tabs.length) {
  tabs[0].classList.add('active');
}

/* ================= STUDIO CLOCK ================= */

const hoursEl = document.getElementById('clock-hours');
const minsEl = document.getElementById('clock-mins');

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');

  if (hoursEl && minsEl) {
    hoursEl.textContent = hours;
    minsEl.textContent = mins;
  }
}

updateClock();
setInterval(updateClock, 1000 * 30); // update every 30s

/* ================= DOUBLE-TAP ADMIN TRIGGER ================= */

const logo = document.querySelector('[data-admin-trigger]');
let lastTap = 0;

if (logo) {
  logo.addEventListener('touchend', e => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 400 && tapLength > 0) {
      openAdmin();
    }
    lastTap = currentTime;
  });

  // Desktop fallback
  logo.addEventListener('dblclick', openAdmin);
}

/* ================= ADMIN OVERLAY ================= */

const adminOverlay = document.getElementById('admin-overlay');

function openAdmin() {
  if (adminOverlay) {
    adminOverlay.hidden = false;
  }
}

function closeAdmin() {
  if (adminOverlay) {
    adminOverlay.hidden = true;
  }
}

// Close on background tap
if (adminOverlay) {
  adminOverlay.addEventListener('click', e => {
    if (e.target === adminOverlay) {
      closeAdmin();
    }
  });
}

/* ================= SAFETY ================= */

window.addEventListener('error', err => {
  console.warn('Rock.Scot SPA error:', err.message);
});
