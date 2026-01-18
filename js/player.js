// player.js
// Persistent audio player module

import { STATION_CONFIG } from './config.js';

class Player {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.audio = null;
    this.init();
  }

  init() {
    if (!this.audio) {
      this.audio = document.createElement('audio');
      this.audio.src = STATION_CONFIG.meta.streamUrl;
      this.audio.controls = true;
      this.audio.autoplay = true;
      this.audio.loop = true;
      this.audio.preload = "auto";
      this.audio.style.width = "100%";
      this.audio.setAttribute('id', 'persistent-audio');

      this.container.appendChild(this.audio);
    }
  }

  play() { this.audio.play().catch(e => console.warn("Playback blocked", e)); }
  pause() { this.audio.pause(); }
  toggle() { this.audio.paused ? this.play() : this.pause(); }
  setVolume(value) { this.audio.volume = Math.min(Math.max(value,0),1); }
  isPlaying() { return !this.audio.paused; }
}

let playerInstance = null;
export function getPlayer(containerId='player-container') {
  if (!playerInstance) playerInstance = new Player(containerId);
  return playerInstance;
}
