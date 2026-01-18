// ========================
// Modals Module
// ========================

export function openSubmitModal() {
    const modalTitle = document.getElementById('gen-title');
    const modalBody = document.getElementById('gen-body');
    const modal = document.getElementById('gen-modal');

    if (!modal || !modalTitle || !modalBody) return;

    modalTitle.innerText = "SUBMIT TRACK";
    modalBody.innerHTML = `
        <p>Ensure 24/7 OFCOM Compliance. Max 25MB.</p>
        <input type="file" class="std-input">
        <button class="btn-auth" onclick="alert('SENT')">UPLOAD</button>
    `;

    modal.classList.add('open');
}

export function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
}
