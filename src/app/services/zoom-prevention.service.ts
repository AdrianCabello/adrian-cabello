import { Injectable } from '@angular/core';

interface GestureEvent extends Event {
  scale: number;
}

@Injectable({
  providedIn: 'root'
})
export class ZoomPreventionService {
  private lastTouchEnd = 0;

  constructor() {
    this.preventZoom();
  }

  private preventZoom(): void {
    document.addEventListener('touchmove', (event: TouchEvent) => {
      if ((event as unknown as GestureEvent).scale !== undefined && 
          (event as unknown as GestureEvent).scale !== 1) {
        event.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('touchend', (event: TouchEvent) => {
      const now = Date.now();
      if (now - this.lastTouchEnd <= 300) {
        event.preventDefault();
      }
      this.lastTouchEnd = now;
    }, { passive: false });

    document.addEventListener('gesturestart', (event: Event) => {
      event.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturechange', (event: Event) => {
      event.preventDefault();
    }, { passive: false });

    document.addEventListener('gestureend', (event: Event) => {
      event.preventDefault();
    }, { passive: false });
  }
} 