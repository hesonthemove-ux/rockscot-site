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
   CONTRACT PREVIEW + PDF
===================== */
const modal = document.getElementById("contractModal");
const contractPreview = document.getElementById("contractPreview");
const closeModal = document.querySelector(".close");
const form = document.getElementById("customerForm");

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

  contractPreview.innerHTML = `
    <p>I, <strong>${data.fullName}</strong>, am authorised to represent <strong>${data.companyName}</strong>.</p>
    <p>Package: <strong>${data.package.name}</strong></p>
    <p>Spots: <strong>${data.package.spots}</strong></p>
    <p>Total: <strong>£${data.package.basePrice}</strong></p>
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
window.onclick = (event) => { if(event.target==modal) modal.style.display='none'; }

document.getElementById("downloadPDF").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.html(contractPreview, {
    callback: function(pdf){
      pdf.save("RockScot_Contract_A4.pdf");
    },
    x: 15,
    y: 15,
    width: 180
  });
});

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
