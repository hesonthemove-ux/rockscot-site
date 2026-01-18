// ========================
// Crew Module
// ========================

export function loadCrew(STATION_CONFIG) {
    const trk = document.getElementById('crew-roller');
    if (!trk) return;

    trk.innerHTML = STATION_CONFIG.djs.map(d => `
        <div class="crew-card" onclick="window.app.openBio('${d.id}')">
            <img src="${d.img}" alt="${d.name}">
            <div class="crew-info">
                <h3 style="font-family:'Bebas Neue'; font-size:2rem;">${d.name}</h3>
                <p style="font-size:0.8rem; color:#aaa;">${d.title}</p>
            </div>
        </div>
    `).join('');
}

export function openBio(id, STATION_CONFIG) {
    const p = STATION_CONFIG.djs.find(x => x.id === id);
    if (!p) return;

    const modalTitle = document.getElementById('gen-title');
    const modalBody = document.getElementById('gen-body');
    const modal = document.getElementById('gen-modal');

    if (modalTitle) modalTitle.innerText = p.name;
    if (modalBody) modalBody.innerText = p.bio;
    if (modal) modal.classList.add('open');
}
