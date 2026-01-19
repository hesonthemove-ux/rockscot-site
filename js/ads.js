/* =====================
   AD PACKAGES / CALCULATOR / CONTRACT
===================== */
const ROCKSCOT_PACKAGES = [
  { name: "Starter", spots: 10, basePrice: 100 },
  { name: "Amplifier", spots: 25, basePrice: 225 },
  { name: "Headliner", spots: 50, basePrice: 400 }
];

let selectedPackage = null;
let calculatedTotal = 0;

/* Populate Packages */
const packageSelection = document.getElementById('packageSelection');
ROCKSCOT_PACKAGES.forEach((pkg, i) => {
  const btn = document.createElement('button');
  btn.textContent = `${pkg.name} - £${pkg.basePrice}`;
  btn.addEventListener('click', () => {
    selectedPackage = pkg;
    calculateTotal();
  });
  packageSelection.appendChild(btn);
});

/* Simple Calculator */
function calculateTotal() {
  if (!selectedPackage) return;
  const spots = selectedPackage.spots;
  const base = selectedPackage.basePrice;
  calculatedTotal = base;
  const calcDiv = document.getElementById('calculator');
  calcDiv.innerHTML = `<p>Package: ${selectedPackage.name}</p>
                       <p>Estimated Cost: £${calculatedTotal}</p>`;
}

/* Launch Portal -> Contract */
document.getElementById('launchPortal').addEventListener('click', () => {
  if (!selectedPackage) {
    alert("Please select a package first");
    return;
  }

  const contractView = document.getElementById('contract');
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  contractView.classList.add('active');

  const contractContent = document.getElementById('contractContent');
  contractContent.innerHTML = `
    <h2>Advertising Pre-Contract Agreement</h2>
    <p><strong>Broadcaster:</strong> Caledonia TX Ltd t/a Rock.Scot</p>
    <p><strong>Advertiser:</strong> [Business / Sole Trader]</p>
    <p><strong>Package Selected:</strong> ${selectedPackage.name}</p>
    <p><strong>Total Estimated Cost:</strong> £${calculatedTotal}</p>
    <h3>Campaign Details</h3>
    <ul>
      <li>Spots Scheduled: ${selectedPackage.spots}</li>
      <li>Start Date: [To be filled]</li>
      <li>End Date: [To be filled]</li>
      <li>Frequency: [To be filled]</li>
    </ul>
    <h3>Terms & Conditions</h3>
    <p>All advertising is subject to Rock.Scot approval, compliance with UK broadcast laws, and payment in full prior to broadcast.</p>
    <p>Advertiser agrees to content, scheduling, and indemnifies Rock.Scot for any claims arising from the advertising content.</p>
    <p>Cancellation must be submitted in writing and may incur charges as per package terms.</p>
    <p>Signature: ____________________ &nbsp;&nbsp; Date: ____________</p>
  `;
});
