import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const FONT_SIZE = 14;
const CELL_W = 9;
const CELL_H = 19;
const LEVELS = 8;
const FRAME_MS = 70;
const MUTATION_RATE = 0.02;

/**
 * Animated field of random monospace glyphs whose brightness drifts in soft
 * waves. Rendered on a canvas, client-only, paused while the tab is hidden.
 */
@Component({
  selector: 'app-glyph-field',
  standalone: true,
  template: `<canvas #canvas class="block h-full w-full"></canvas>`,
  host: { class: 'block', 'aria-hidden': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlyphFieldComponent {
  private readonly canvasRef =
    viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const randomGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
    const colors = Array.from({ length: LEVELS }, (_, i) => {
      const t = i / (LEVELS - 1);
      return `rgba(${Math.round(56 + t * 70)}, ${Math.round(
        110 + t * 90
      )}, ${Math.round(190 + t * 50)}, ${(0.04 + t * 0.3).toFixed(3)})`;
    });

    let cols = 0;
    let rows = 0;
    let cells: string[] = [];
    let buckets: number[][] = [];
    let frameId = 0;
    let lastFrame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = 'top';
      cols = Math.ceil(width / CELL_W);
      rows = Math.ceil(height / CELL_H);
      cells = Array.from({ length: cols * rows }, randomGlyph);
      draw(performance.now());
    };

    const brightness = (x: number, y: number, t: number) => {
      const a =
        Math.sin(x * 0.045 + t * 0.00021) * Math.sin(y * 0.11 - t * 0.00017);
      const b = Math.sin((x * 0.6 + y) * 0.06 - t * 0.00012);
      const c = Math.sin(x * 0.013 - y * 0.02 + t * 0.00009);
      const v = (a * 0.5 + b * 0.3 + c * 0.4 + 1.2) / 2.4;
      return Math.max(0, Math.min(1, v * v * 1.15));
    };

    const draw = (t: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      buckets = Array.from({ length: LEVELS }, () => []);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const level = Math.min(
            LEVELS - 1,
            Math.floor(brightness(x, y, t) * LEVELS)
          );
          buckets[level].push(y * cols + x);
        }
      }
      for (let level = 0; level < LEVELS; level++) {
        ctx.fillStyle = colors[level];
        for (const i of buckets[level]) {
          ctx.fillText(
            cells[i],
            (i % cols) * CELL_W,
            ((i / cols) | 0) * CELL_H
          );
        }
      }
    };

    const tick = (t: number) => {
      frameId = requestAnimationFrame(tick);
      if (t - lastFrame < FRAME_MS) return;
      lastFrame = t;
      const mutations = (cells.length * MUTATION_RATE) | 0;
      for (let i = 0; i < mutations; i++) {
        cells[(Math.random() * cells.length) | 0] = randomGlyph();
      }
      draw(t);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frameId);
      if (!document.hidden && !reducedMotion)
        frameId = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    resize();
    onVisibility();

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    });
  }
}
