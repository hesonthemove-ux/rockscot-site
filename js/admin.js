/* =====================================================
   Rock.Scot SPA – admin.js
   Master Control • PIN Security • Live Overrides
   ===================================================== */

/* ================= CONFIG ================= */

const DEFAULT_PIN_HASH = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';
// SHA-256 hash of "1234" – change in production

/* ================= DOM ELEMENTS ================= */

const pinInput = document.getElementById('admin-pin');
const unlockBtn = document.getElementById('unlock-admin');
const adminControls = document.getElementById('admin-controls');

const glassSlider = document.getElementById('glass-slider');
const tickerEditor = document.getElementById('ticker-editor');
const saveBtn = document.getElementById('save-admin');

const tickerText = document.getElementById('ticker-text');

/* ================= UTILS ================= */

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/* ================= PIN AUTH ================= */

if (unlockBtn && pinInput) {
  unlockBtn.addEventListener('click', async () => {
    const entered = pinInput.value;
    const hash = await sha256(entered);

    if (hash === DEFAULT_PIN_HASH) {
      adminControls.hidden = false;
      pinInput.value = '';
    } else {
      alert('Invalid PIN');
      pinInput.value = '';
    }
  });
}

/* ================= LOAD SAVED SETTINGS ================= */

const savedGlass = localStorage.getItem('rockscot_glass');
const savedTicker = localStorage.getItem('rockscot_ticker');
const savedPricing = localStorage.getItem('rockscot_pricing');

if (savedGlass && glassSlider) {
  glassSlider.value = savedGlass;
  document.documentElement.style.setProperty('--glass-tint', savedGlass);
}

if (savedTicker && tickerText) {
  tickerText.textContent = savedTicker;
  if (tickerEditor) tickerEditor.value = savedTicker;
}

if (savedPricing && window.updateAdPricing) {
  try {
    const pricing = JSON.parse(savedPricing);
    window.updateAdPricing(pricing);
  } catch (e) {
    console.warn('Invalid saved pricing');
  }
}

/* ================= LIVE CONTROLS ================= */

if (glassSlider) {
  glassSlider.addEventListener('input', e => {
    const value = e.target.value;
    document.documentElement.style.setProperty('--glass-tint', value);
  });
}

/* ================= SAVE SETTINGS ================= */

if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    // Save glass tint
    if (glassSlider) {
      localStorage.setItem('rockscot_glass', glassSlider.value);
    }

    // Save ticker
    if (tickerEditor && tickerText) {
      localStorage.setItem('rockscot_ticker', tickerEditor.value);
      tickerText.textContent = tickerEditor.value;
    }

    // Save pricing (if admin UI expanded later)
    // Example: localStorage.setItem('rockscot_pricing', JSON.stringify({ regional: 349 }))

    alert('Settings saved');
  });
}
