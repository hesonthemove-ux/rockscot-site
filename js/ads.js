/* =====================================================
   Rock.Scot SPA – ads.js
   Commercial Pricing Engine • Surcharges • Admin Hooks
   ===================================================== */

/* ================= BASE PRICING (ADMIN OVERRIDABLE) ================= */

let PRICING = {
  regional: 299,
  multi: 449,
  production: 195
};

/* ================= DOM ELEMENTS ================= */

const form = document.getElementById('ad-form');
const packageSelect = document.getElementById('package');
const durationInput = document.getElementById('duration');
const productionCheckbox = document.getElementById('production');
const priceOutput = document.getElementById('price-output');

/* ================= PRICE CALCULATION ================= */

function calculatePrice() {
  if (!packageSelect || !durationInput || !priceOutput) return;

  const pkg = packageSelect.value;
  const days = parseInt(durationInput.value, 10) || 0;
  const wantsProduction = productionCheckbox && productionCheckbox.checked;

  let basePrice = PRICING[pkg] || 0;
  let total = basePrice;

  // Short-run surcharge: 27 days or fewer
  if (days > 0 && days <= 27) {
    total *= 1.3;
  }

  // Production fee (one-off)
  if (wantsProduction) {
    total += PRICING.production;
  }

  priceOutput.textContent = `£${total.toFixed(2)}`;
}

/* ================= EVENT BINDINGS ================= */

if (form) {
  ['change', 'input'].forEach(evt => {
    form.addEventListener(evt, calculatePrice);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    calculatePrice();

    // Placeholder for lead capture / backend hook
    alert('Thank you. A member of the Rock.Scot commercial team will contact you shortly.');
  });
}

calculatePrice();

/* ================= ADMIN PRICING HOOK ================= */

// Allows admin.js to update pricing live without reload
window.updateAdPricing = function (newPricing) {
  PRICING = { ...PRICING, ...newPricing };
  calculatePrice();
};
