import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageScrollService {
  private readonly document = inject(DOCUMENT);
  private pendingPosition?: [number, number];

  savePosition(): void {
    const browserWindow = this.document.defaultView;
    if (browserWindow) {
      this.pendingPosition = [browserWindow.scrollX, browserWindow.scrollY];
    }
  }

  get hasPendingPosition(): boolean {
    return this.pendingPosition !== undefined;
  }

  restorePositionAfterRender(): void {
    const browserWindow = this.document.defaultView;
    const position = this.pendingPosition;
    this.pendingPosition = undefined;
    if (!browserWindow || !position) {
      return;
    }

    browserWindow.setTimeout(() => {
      browserWindow.scrollTo({
        left: position[0],
        top: position[1],
        behavior: 'instant',
      });
    });
  }
}
