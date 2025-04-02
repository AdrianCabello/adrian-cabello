import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoomPreventionService {
  private lastTouchEnd = 0;

  constructor() {
    this.preventZoom();
  }

  private preventZoom(): void {
    document.addEventListener('touchmove', (event) => {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('touchend', (event) => {
      const now = Date.now();
      if (now - this.lastTouchEnd <= 300) {
        event.preventDefault();
      }
      this.lastTouchEnd = now;
    }, { passive: false });

    document.addEventListener('gesturestart', (event) => {
      event.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturechange', (event) => {
      event.preventDefault();
    }, { passive: false });

    document.addEventListener('gestureend', (event) => {
      event.preventDefault();
    }, { passive: false });
  }
} 