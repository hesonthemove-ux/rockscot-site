// player.js
// Persistent audio player module for Rock.Scot

import { STATION_CONFIG } from './config.js';

class Player {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.audio = null;
    this.init();
  }

  init() {
    // Create audio element if not already present
    if (!this.audio) {
      this.audio = document.createElement('audio');
      this.audio.src = STATION_CONFIG.meta.streamUrl;
      this.audio.controls = true;
      this.audio.autoplay = true;
      this.audio.loop = true;
      this.audio.preload = "auto";
      this.audio.style.width = "100%";
      this.audio.setAttribute('id', 'persistent-audio');

      // Chrome / mobile requires user gesture to start, fallback button
      this.audio.addEventListener('play', () => {
        console.log('Audio is playing');
      });

      // Append to container
      this.container.appendChild(this.audio);
    }
  }

  play() {
    this.audio.play().catch(e => {
      console.warn("Playback blocked (user interaction required)", e);
    });
  }

  pause() {
    this.audio.pause();
  }

  toggle() {
    if (this.audio.paused) this.play();
    else this.pause();
  }

  setVolume(value) {
    this.audio.volume = Math.min(Math.max(value, 0), 1); // clamp 0–1
  }

  isPlaying() {
    return !this.audio.paused;
  }
}

// Singleton pattern
let playerInstance = null;

export function getPlayer(containerId = 'player-container') {
  if (!playerInstance) {
    playerInstance = new Player(containerId);
  }
  return playerInstance;
}

