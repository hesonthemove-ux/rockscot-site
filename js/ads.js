// ========================
// Ads Module
// ========================

import { STATION_CONFIG } from './config.js';
import html2pdf from 'html2pdf.js'; // Make sure html2pdf.bundle.min.js is loaded

export function openAdModal() {
    const modal = document.getElementById('ad-modal');
    if (modal) modal.classList.add('open');
}

export function calcTotal() {
    const base = parseInt(document.getElementById('pkg-opt')?.value || 0);
    const prod = document.getElementById('prod-add')?.checked ? STATION_CONFIG.prices.productionFee : 0;

    let start = new Date(document.getElementById('d-start')?.value);
    let end = new Date(document.getElementById('d-end')?.value);
    let surcharge = 1.0;

    if (start && end && !isNaN(start) && !isNaN(end)) {
        const days = (end - start) / (1000 * 3600 * 24);
        if (days > 0 && days < STATION_CONFIG.prices.surchargeThreshold) {
            surcharge = STATION_CONFIG.prices.surchargeRate;
            document.getElementById('sur-alert').style.display = 'block';
        } else {
            document.getElementById('sur-alert').style.display = 'none';
        }
    }

    const total = Math.round((base * surcharge) + prod);
    document.getElementById('final-price').innerText = "£" + total;
}

export function sendEmail() {
    const biz = document.getElementById('biz-name')?.value || "CLIENT";
    const tot = document.getElementById('final-price')?.innerText || "£0";

    window.location.href = `mailto:${STATION_CONFIG.meta.email}?subject=Ad Inquiry: ${biz}&body=Business: ${biz}%0D%0ATotal Est: ${tot}%0D%0AI agree to terms.`;
}

export function genPDF() {
    const pdfDoc = document.getElementById('pdf-doc');
    if (!pdfDoc) return;

    document.getElementById('p-date').innerText = new Date().toLocaleDateString();
    document.getElementById('p-client').innerText = document.getElementById('biz-name')?.value || "CLIENT";
    document.getElementById('p-total').innerText = document.getElementById('final-price')?.innerText || "£0";

    pdfDoc.style.display = 'block';
    html2pdf().from(pdfDoc).save('RockScot_Contract.pdf').then(() => {
        pdfDoc.style.display = 'none';
    });
}
