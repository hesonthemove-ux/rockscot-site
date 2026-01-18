// ========================
// Wire/News Module
// ========================

export async function loadWire(STATION_CONFIG) {
    const grid = document.getElementById('wire-grid');
    if (!grid) return;

    grid.innerHTML = '<h3>TUNING...</h3>';

    try {
        const res = await fetch(STATION_CONFIG.news.feed);
        const data = await res.json();

        grid.innerHTML = data.items.map(i => {
            const titleSafe = i.title.replace(/'/g, "");
            const descEscaped = encodeURIComponent(i.description);
            return `
                <div class="uniform-card" onclick="window.app.openNews('${titleSafe}', '${descEscaped}')">
                    <h4 style="color:var(--authority-orange); font-family:'Oswald';">${i.title}</h4>
                    <p style="font-size:0.8rem; margin-top:10px;">Tap to read</p>
                </div>
            `;
        }).join('');

    } catch (e) {
        grid.innerHTML = '<h3>WIRE OFFLINE</h3>';
        console.error("Wire load error:", e);
    }
}
