/* =====================
   PACKAGES / CALCULATOR
===================== */
const ROCKSCOT_PACKAGES = [
  { name: "Starter", spots: 10, basePrice: 100 },
  { name: "Amplifier", spots: 25, basePrice: 225 },
  { name: "Headliner", spots: 50, basePrice: 400 }
];

let selectedPackage = null;
const packageSelection = document.getElementById('packageSelection');
ROCKSCOT_PACKAGES.forEach((pkg) => {
  const btn = document.createElement('button');
  btn.textContent = `${pkg.name} - £${pkg.basePrice}`;
  btn.addEventListener('click', () => {
    selectedPackage = pkg;
  });
  packageSelection.appendChild(btn);
});

/* =====================
   POSTCODE LOOKUP (UK)
===================== */
const postcodeInput = document.createElement('input');
postcodeInput.placeholder = "Enter Postcode to auto-fill address";
postcodeInput.id = "postcode";
postcodeInput.style.margin = "5px 0";
const form = document.getElementById("customerForm");
form.insertBefore(postcodeInput, document.getElementById("companyAddress"));

postcodeInput.addEventListener("change", async () => {
  const postcode = postcodeInput.value.trim();
  if (!postcode) return;
  try {
    const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    const data = await res.json();
    if (data.status === 200) {
      document.getElementById("companyAddress").value = `${data.result.admin_district}, ${data.result.region}`;
    }
  } catch (err) {
    console.warn("Postcode lookup failed", err);
  }
});

/* =====================
   CONTRACT PREVIEW + PDF
===================== */
const modal = document.getElementById("contractModal");
const contractPreview = document.getElementById("contractPreview");
const closeModal = document.querySelector(".close");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!selectedPackage) { alert("Please select a package first"); return; }

  const data = {
    fullName: document.getElementById("fullName").value,
    position: document.getElementById("position").value,
    companyName: document.getElementById("companyName").value,
    companyAddress: document.getElementById("companyAddress").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    package: selectedPackage
  };

  // Preview modal
  contractPreview.innerHTML = `
    <p>I, <strong>${data.fullName}</strong>, am authorised to represent <strong>${data.companyName}</strong>.</p>
    <p>Package: <strong>${data.package.name}</strong> | Spots: <strong>${data.package.spots}</strong> | Total: <strong>£${data.package.basePrice}</strong></p>
    <p>Campaign Dates: <strong>${data.startDate}</strong> to <strong>${data.endDate}</strong></p>
    <p>Company Address: ${data.companyAddress}</p>
    <p>Phone: ${data.phone} | Email: ${data.email}</p>
    <h3>Terms & Conditions</h3>
    <p>All advertising is subject to Rock.Scot approval, compliance with UK broadcast laws, and payment in full prior to broadcast.</p>
    <p>Advertiser agrees to content, scheduling, and indemnifies Rock.Scot for any claims arising from the advertising content.</p>
    <p>Cancellation must be submitted in writing and may incur charges as per package terms.</p>
  `;
  modal.style.display = "block";
});

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if(event.target===modal) modal.style.display='none'; }

/* =====================
   DOWNLOAD PDF
===================== */
document.getElementById("downloadPDF").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const lineHeight = 7;
  let y = 15;

  const addLine = (text, bold=false) => {
    if(bold) doc.setFont(undefined, "bold");
    doc.text(text, 15, y);
    y += lineHeight;
    doc.setFont(undefined, "normal");
  };

  addLine(`Advertising Pre-Contract Agreement`, true);
  addLine(``);
  addLine(`I, ${document.getElementById("fullName").value}, am authorised to represent ${document.getElementById("companyName").value}.`);
  addLine(``);
  addLine(`Package: ${selectedPackage.name} | Spots: ${selectedPackage.spots} | Total: £${selectedPackage.basePrice}`);
  addLine(`Campaign Dates: ${document.getElementById("startDate").value} to ${document.getElementById("endDate").value}`);
  addLine(`Company Address: ${document.getElementById("companyAddress").value}`);
  addLine(`Phone: ${document.getElementById("phone").value} | Email: ${document.getElementById("email").value}`);
  addLine(``);
  addLine(`Terms & Conditions`, true);
  addLine(`All advertising is subject to Rock.Scot approval, compliance with UK broadcast laws, and payment in full prior to broadcast.`);
  addLine(`Advertiser agrees to content, scheduling, and indemnifies Rock.Scot for any claims arising from the advertising content.`);
  addLine(`Cancellation must be submitted in writing and may incur charges as per package terms.`);

  doc.save("RockScot_Contract_A4.pdf");
});

/* =====================
   PRINT CONTRACT
===================== */
document.getElementById("printPDF").addEventListener("click", () => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Contract</title>');
  printWindow.document.write('<link rel="stylesheet" href="css/styles.css">');
  printWindow.document.write('</head><body>');
  printWindow.document.write(contractPreview.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
});
