// ads.js
// Advertising calculator, email, PDF

import { STATION_CONFIG } from './config.js';

class Ads {
  constructor() {
    this.pkgSelect = document.getElementById('pkg-opt');
    this.prodCheckbox = document.getElementById('prod-add');
    this.startDate = document.getElementById('d-start');
    this.endDate = document.getElementById('d-end');
    this.totalEl = document.getElementById('final-price');
    this.surchargeEl = document.getElementById('sur-alert');

    this.initPackages();
    this.attachEvents();
  }

  initPackages() {
    if(!this.pkgSelect) return;
    this.pkgSelect.innerHTML = STATION_CONFIG.prices.packages
      .map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
    const prodPriceDisplay = document.getElementById('prod-price-display');
    if(prodPriceDisplay) prodPriceDisplay.innerText = `£${STATION_CONFIG.prices.productionFee}`;
  }

  attachEvents() {
    if(this.pkgSelect) this.pkgSelect.addEventListener('change',()=>this.calcTotal());
    if(this.prodCheckbox) this.prodCheckbox.addEventListener('change',()=>this.calcTotal());
    if(this.startDate) this.startDate.addEventListener('change',()=>this.calcTotal());
    if(this.endDate) this.endDate.addEventListener('change',()=>this.calcTotal());

    const emailBtn = document.querySelector('.btn-auth:not(.btn-pdf)');
    if(emailBtn) emailBtn.addEventListener('click',()=>this.sendEmail());

    const pdfBtn = document.querySelector('.btn-pdf');
    if(pdfBtn) pdfBtn.addEventListener('click',()=>this.genPDF());
  }

  calcTotal() {
    const base = parseInt(this.pkgSelect.value)||0;
    const prod = this.prodCheckbox.checked ? STATION_CONFIG.prices.productionFee : 0;
    let sur = 1.0;

    const start = new Date(this.startDate.value);
    const end = new Date(this.endDate.value);

    if(start && end && !isNaN(start) && !isNaN(end)) {
      const days = (end-start)/(1000*3600*24);
      if(days>0 && days<STATION_CONFIG.prices.surchargeThreshold) {
        sur=STATION_CONFIG.prices.surchargeRate;
        if(this.surchargeEl) this.surchargeEl.style.display='block';
      } else { if(this.surchargeEl) this.surchargeEl.style.display='none'; }
    }

    const total = Math.round((base*sur)+prod);
    if(this.totalEl) this.totalEl.innerText=`£${total}`;
  }

  sendEmail() {
    const biz = document.getElementById('biz-name')?.value||'CLIENT';
    const tot = this.totalEl?.innerText||'£0';
    window.location.href=`mailto:${STATION_CONFIG.meta.email}?subject=Ad Inquiry: ${biz}&body=Business: ${biz}%0D%0ATotal Est: ${tot}%0D%0AI agree to terms.`;
  }

  genPDF() {
    const pdfEl = document.getElementById('pdf-doc');
    if(!pdfEl) return;
    document.getElementById('p-date').innerText = new Date().toLocaleDateString();
    document.getElementById('p-client').innerText = document.getElementById('biz-name')?.value||'CLIENT';
    document.getElementById('p-total').innerText = this.totalEl?.innerText||'£0';
    pdfEl.style.display='block';
    html2pdf().from(pdfEl).save('RockScot_Contract.pdf').then(()=>{pdfEl.style.display='none';});
  }

  static openAdModal() {
    const modal = document.getElementById('ad-modal');
    if(modal) modal.classList.add('open');
  }
}

let adsInstance=null;
export function getAds(){if(!adsInstance)adsInstance=new Ads();return adsInstance;}
