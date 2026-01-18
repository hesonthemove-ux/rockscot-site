// ========================
// UI Module
// ========================

export function initUI(app) {
    // Attach event listeners to nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            if (tab) app.switchTab(tab);
        });
    });
}

export function switchTab(id, app) {
    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    // Show the selected view
    const view = document.getElementById(`v-${id}`);
    if (view) view.classList.add('active');

    // Update nav button active state
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.nav-btn[data-tab="${id}"]`);
    if (btn) btn.classList.add('active');
}
