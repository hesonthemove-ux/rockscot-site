// modals.js
// Generic modal system

class Modals {
  constructor() {
    this.modals = document.querySelectorAll('.modal-overlay');
    this.attachClose();
  }

  attachClose() {
    this.modals.forEach(modal => {
      modal.addEventListener('click', () => modal.classList.remove('open'));
      const inner = modal.querySelector('.mag-layout');
      if(inner) inner.addEventListener('click', e => e.stopPropagation());
    });
  }

  open(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('open');
  }

  close(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('open');
  }

  closeAll() {
    this.modals.forEach(m => m.classList.remove('open'));
  }
}

// Singleton
let modalsInstance = null;
export function getModals() {
  if (!modalsInstance) modalsInstance = new Modals();
  return modalsInstance;
}
