// ========================
// Player Module
// ========================

let audioPlayer = null;

export function initPlayer(streamUrl) {
    // If already initialized, do nothing
    if (audioPlayer) return;

    // Create audio element
    audioPlayer = document.createElement('audio');
    audioPlayer.src = streamUrl;
    audioPlayer.controls = true;
    audioPlayer.autoplay = true;
    audioPlayer.loop = true;
    audioPlayer.style.width = '100%';

    // Inject into the live player container
    const container = document.getElementById('player-container');
    if (container) container.appendChild(audioPlayer);

    // Keep player alive across view switches
    window.addEventListener('beforeunload', () => {
        if (audioPlayer) audioPlayer.pause();
    });
}

// Optional: expose controls for later
export function play() {
    if (audioPlayer) audioPlayer.play();
}

export function pause() {
    if (audioPlayer) audioPlayer.pause();
}

export function setVolume(level) {
    if (audioPlayer) audioPlayer.volume = Math.min(Math.max(level, 0), 1);
}
