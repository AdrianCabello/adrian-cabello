import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LanguageService } from '../../i18n/language.service';

type PomodoroPhase = 'focus' | 'break';
type PomodoroPreset = 'classic' | 'deep';

interface PomodoroPresetConfig {
  readonly focusMinutes: number;
  readonly breakMinutes: number;
}

interface StoredPomodoroState {
  readonly version: 1;
  readonly preset: PomodoroPreset;
  readonly phase: PomodoroPhase;
  readonly running: boolean;
  readonly remainingSeconds: number;
  readonly endAt: number | null;
  readonly completedFocusSessions: number;
  readonly soundEnabled: boolean;
  readonly position?: PomodoroPosition | null;
  readonly history?: readonly PomodoroHistoryEntry[];
}

interface PomodoroHistoryEntry {
  readonly id: string;
  readonly completedAt: number;
  readonly durationMinutes: number;
}

interface PomodoroPosition {
  readonly x: number;
  readonly y: number;
}

interface PomodoroDragOrigin {
  readonly pointerX: number;
  readonly pointerY: number;
  readonly hostX: number;
  readonly hostY: number;
}

const POMODORO_PRESETS: Readonly<Record<PomodoroPreset, PomodoroPresetConfig>> =
  {
    classic: { focusMinutes: 25, breakMinutes: 5 },
    deep: { focusMinutes: 50, breakMinutes: 10 },
  };

@Component({
  selector: 'app-pomodoro-timer',
  standalone: true,
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.scss',
  host: {
    '[class.pomodoro-custom-position]': 'customPosition() !== null',
    '[class.pomodoro-dragging]': 'dragging()',
    '[style.transform]': 'positionTransform()',
  },
})
export class PomodoroTimerComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly languageService = inject(LanguageService);
  private readonly storageKey = 'angular-senior-guide-pomodoro';
  private intervalId?: number;
  private endAt: number | null = null;
  private audioContext?: AudioContext;
  private dragOrigin: PomodoroDragOrigin | null = null;
  private suppressNextLauncherClick = false;
  private readonly handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.panelOpen()) {
      this.closePanel();
    }
  };
  private readonly handlePointerMove = (event: PointerEvent): void => {
    if (!this.dragOrigin) {
      return;
    }
    const deltaX = event.clientX - this.dragOrigin.pointerX;
    const deltaY = event.clientY - this.dragOrigin.pointerY;
    if (!this.dragging() && Math.hypot(deltaX, deltaY) < 4) {
      return;
    }
    event.preventDefault();
    this.dragging.set(true);
    this.suppressNextLauncherClick = true;
    this.customPosition.set(
      this.constrainPosition({
        x: this.dragOrigin.hostX + deltaX,
        y: this.dragOrigin.hostY + deltaY,
      })
    );
  };
  private readonly handlePointerUp = (): void => {
    if (!this.dragOrigin) {
      return;
    }
    const moved = this.dragging();
    this.dragOrigin = null;
    this.dragging.set(false);
    if (moved) {
      this.persistState();
      this.browserWindow?.setTimeout(() => {
        this.suppressNextLauncherClick = false;
      });
    }
  };
  private readonly handleViewportResize = (): void => {
    const position = this.customPosition();
    if (position && this.canDrag()) {
      this.customPosition.set(this.constrainPosition(position));
      this.persistState();
    }
  };

  protected readonly panelOpen = signal(false);
  protected readonly preset = signal<PomodoroPreset>('classic');
  protected readonly phase = signal<PomodoroPhase>('focus');
  protected readonly running = signal(false);
  protected readonly remainingSeconds = signal(25 * 60);
  protected readonly completedFocusSessions = signal(0);
  protected readonly soundEnabled = signal(false);
  protected readonly announcement = signal('');
  protected readonly customPosition = signal<PomodoroPosition | null>(null);
  protected readonly history = signal<readonly PomodoroHistoryEntry[]>([]);
  protected readonly historyOpen = signal(false);
  protected readonly dragging = signal(false);
  protected readonly positionTransform = computed(() => {
    const position = this.customPosition();
    return position ? `translate3d(${position.x}px, ${position.y}px, 0)` : null;
  });

  protected readonly formattedTime = computed(() => {
    const minutes = Math.floor(this.remainingSeconds() / 60);
    const seconds = this.remainingSeconds() % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  });

  protected readonly phaseLabel = computed(() =>
    this.translate(this.phase() === 'focus' ? 'Foco' : 'Descanso')
  );

  protected readonly timerActionLabel = computed(() =>
    this.translate(this.running() ? 'Pausar' : 'Iniciar')
  );

  protected readonly launcherLabel = computed(
    () =>
      `${this.translate('Pomodoro')}: ${this.phaseLabel()}, ${this.formattedTime()}. ${this.translate(
        this.running() ? 'Pausar temporizador' : 'Abrir temporizador'
      )}`
  );

  protected readonly sessionLabel = computed(() => {
    const sessions = this.completedFocusSessions();
    return `${sessions} ${this.translate(sessions === 1 ? 'sesión' : 'sesiones')}`;
  });

  protected readonly todayHistory = computed(() => {
    const today = new Date();
    return this.history().filter(entry => {
      const completedAt = new Date(entry.completedAt);
      return (
        completedAt.getFullYear() === today.getFullYear() &&
        completedAt.getMonth() === today.getMonth() &&
        completedAt.getDate() === today.getDate()
      );
    });
  });

  protected readonly todayStudyMinutes = computed(() =>
    this.todayHistory().reduce(
      (total, entry) => total + entry.durationMinutes,
      0
    )
  );

  protected readonly recentHistory = computed(() => this.history().slice(0, 5));

  constructor() {
    afterNextRender(() => {
      this.restoreState();
      this.syncWithClock();
      this.startClock();
      this.browserWindow?.addEventListener('keydown', this.handleKeydown);
      this.browserWindow?.addEventListener(
        'pointermove',
        this.handlePointerMove,
        { passive: false }
      );
      this.browserWindow?.addEventListener('pointerup', this.handlePointerUp);
      this.browserWindow?.addEventListener(
        'pointercancel',
        this.handlePointerUp
      );
      this.browserWindow?.addEventListener(
        'resize',
        this.handleViewportResize,
        { passive: true }
      );
      this.browserWindow?.requestAnimationFrame(() =>
        this.handleViewportResize()
      );
    });

    this.destroyRef.onDestroy(() => {
      const browserWindow = this.browserWindow;
      if (browserWindow && this.intervalId !== undefined) {
        browserWindow.clearInterval(this.intervalId);
      }
      browserWindow?.removeEventListener('keydown', this.handleKeydown);
      browserWindow?.removeEventListener('pointermove', this.handlePointerMove);
      browserWindow?.removeEventListener('pointerup', this.handlePointerUp);
      browserWindow?.removeEventListener('pointercancel', this.handlePointerUp);
      browserWindow?.removeEventListener('resize', this.handleViewportResize);
      void this.audioContext?.close();
    });
  }

  protected translate(value: string): string {
    return this.languageService.translate(value);
  }

  protected togglePanel(): void {
    if (this.suppressNextLauncherClick) {
      return;
    }
    this.panelOpen.update(isOpen => !isOpen);
  }

  protected startDrag(event: PointerEvent): void {
    if (!this.canDrag() || event.button !== 0) {
      return;
    }
    const bounds = this.hostElement.nativeElement.getBoundingClientRect();
    this.dragOrigin = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      hostX: bounds.left,
      hostY: bounds.top,
    };
  }

  protected resetPosition(): void {
    this.customPosition.set(null);
    this.announcement.set(this.translate('Posición restaurada'));
    this.persistState();
  }

  protected toggleHistory(): void {
    this.historyOpen.update(isOpen => !isOpen);
    this.browserWindow?.requestAnimationFrame(() =>
      this.handleViewportResize()
    );
  }

  protected formatHistoryDate(completedAt: number): string {
    return new Intl.DateTimeFormat(this.languageService.language(), {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(completedAt));
  }

  protected formatHistoryDateTime(completedAt: number): string {
    return new Date(completedAt).toISOString();
  }

  protected closePanel(): void {
    this.panelOpen.set(false);
  }

  protected toggleTimer(): void {
    if (this.running()) {
      this.pauseTimer();
      return;
    }
    this.startTimer();
  }

  protected resetTimer(): void {
    this.running.set(false);
    this.endAt = null;
    this.remainingSeconds.set(this.phaseDurationSeconds(this.phase()));
    this.announcement.set(this.translate('Temporizador reiniciado'));
    this.persistState();
  }

  protected selectPhase(phase: PomodoroPhase): void {
    if (this.running() || phase === this.phase()) {
      return;
    }
    this.phase.set(phase);
    this.remainingSeconds.set(this.phaseDurationSeconds(phase));
    this.announcement.set(
      `${this.translate('Modo seleccionado')}: ${this.phaseLabel()}`
    );
    this.persistState();
  }

  protected selectPreset(preset: PomodoroPreset): void {
    if (this.running() || preset === this.preset()) {
      return;
    }
    this.preset.set(preset);
    this.remainingSeconds.set(this.phaseDurationSeconds(this.phase()));
    this.persistState();
  }

  protected toggleSound(): void {
    this.soundEnabled.update(enabled => !enabled);
    if (this.soundEnabled()) {
      void this.ensureAudioContext()?.resume();
    }
    this.persistState();
  }

  private startTimer(): void {
    if (this.remainingSeconds() <= 0) {
      this.remainingSeconds.set(this.phaseDurationSeconds(this.phase()));
    }
    this.endAt = Date.now() + this.remainingSeconds() * 1000;
    this.running.set(true);
    this.announcement.set(`${this.phaseLabel()} ${this.translate('iniciado')}`);
    this.persistState();
  }

  private pauseTimer(): void {
    this.syncWithClock();
    this.running.set(false);
    this.endAt = null;
    this.announcement.set(this.translate('Temporizador pausado'));
    this.persistState();
  }

  private startClock(): void {
    const browserWindow = this.browserWindow;
    if (!browserWindow || this.intervalId !== undefined) {
      return;
    }
    this.intervalId = browserWindow.setInterval(
      () => this.syncWithClock(),
      250
    );
  }

  private syncWithClock(): void {
    if (!this.running() || this.endAt === null) {
      return;
    }
    const remaining = Math.max(0, Math.ceil((this.endAt - Date.now()) / 1000));
    this.remainingSeconds.set(remaining);
    if (remaining === 0) {
      this.completePhase();
    }
  }

  private completePhase(): void {
    const completedPhase = this.phase();
    const nextPhase: PomodoroPhase =
      completedPhase === 'focus' ? 'break' : 'focus';
    if (completedPhase === 'focus') {
      this.completedFocusSessions.update(count => count + 1);
      const completedAt = Date.now();
      this.history.update(history =>
        [
          {
            id: `${completedAt}-${this.completedFocusSessions()}`,
            completedAt,
            durationMinutes: POMODORO_PRESETS[this.preset()].focusMinutes,
          },
          ...history,
        ].slice(0, 100)
      );
    }
    this.running.set(false);
    this.endAt = null;
    this.phase.set(nextPhase);
    this.remainingSeconds.set(this.phaseDurationSeconds(nextPhase));
    this.panelOpen.set(true);
    this.announcement.set(
      completedPhase === 'focus'
        ? this.translate('Foco terminado. Es momento de descansar.')
        : this.translate('Descanso terminado. Volvé cuando estés listo.')
    );
    this.persistState();
    this.playCompletionTone();
  }

  private phaseDurationSeconds(phase: PomodoroPhase): number {
    const config = POMODORO_PRESETS[this.preset()];
    return (phase === 'focus' ? config.focusMinutes : config.breakMinutes) * 60;
  }

  private restoreState(): void {
    const browserWindow = this.browserWindow;
    if (!browserWindow) {
      return;
    }
    try {
      const parsed: unknown = JSON.parse(
        browserWindow.localStorage.getItem(this.storageKey) ?? 'null'
      );
      if (!this.isStoredState(parsed)) {
        return;
      }
      this.preset.set(parsed.preset);
      this.phase.set(parsed.phase);
      this.running.set(parsed.running);
      this.remainingSeconds.set(parsed.remainingSeconds);
      this.completedFocusSessions.set(parsed.completedFocusSessions);
      this.soundEnabled.set(parsed.soundEnabled);
      this.customPosition.set(parsed.position ?? null);
      this.history.set((parsed.history ?? []).slice(0, 100));
      this.endAt = parsed.running ? parsed.endAt : null;
    } catch {
      this.resetTimer();
    }
  }

  private isStoredState(value: unknown): value is StoredPomodoroState {
    if (!value || typeof value !== 'object') {
      return false;
    }
    const state = value as Partial<StoredPomodoroState>;
    return (
      state.version === 1 &&
      (state.preset === 'classic' || state.preset === 'deep') &&
      (state.phase === 'focus' || state.phase === 'break') &&
      typeof state.running === 'boolean' &&
      typeof state.remainingSeconds === 'number' &&
      Number.isFinite(state.remainingSeconds) &&
      state.remainingSeconds >= 0 &&
      (state.endAt === null ||
        (typeof state.endAt === 'number' && Number.isFinite(state.endAt))) &&
      (!state.running || typeof state.endAt === 'number') &&
      typeof state.completedFocusSessions === 'number' &&
      Number.isInteger(state.completedFocusSessions) &&
      state.completedFocusSessions >= 0 &&
      typeof state.soundEnabled === 'boolean' &&
      (state.position === undefined ||
        state.position === null ||
        (typeof state.position === 'object' &&
          typeof state.position.x === 'number' &&
          Number.isFinite(state.position.x) &&
          typeof state.position.y === 'number' &&
          Number.isFinite(state.position.y))) &&
      (state.history === undefined ||
        (Array.isArray(state.history) &&
          state.history.every(entry => this.isHistoryEntry(entry))))
    );
  }

  private isHistoryEntry(value: unknown): value is PomodoroHistoryEntry {
    if (!value || typeof value !== 'object') {
      return false;
    }
    const entry = value as Partial<PomodoroHistoryEntry>;
    return (
      typeof entry.id === 'string' &&
      typeof entry.completedAt === 'number' &&
      Number.isFinite(entry.completedAt) &&
      typeof entry.durationMinutes === 'number' &&
      Number.isFinite(entry.durationMinutes) &&
      entry.durationMinutes > 0
    );
  }

  private persistState(): void {
    const browserWindow = this.browserWindow;
    if (!browserWindow) {
      return;
    }
    const state: StoredPomodoroState = {
      version: 1,
      preset: this.preset(),
      phase: this.phase(),
      running: this.running(),
      remainingSeconds: this.remainingSeconds(),
      endAt: this.endAt,
      completedFocusSessions: this.completedFocusSessions(),
      soundEnabled: this.soundEnabled(),
      position: this.customPosition(),
      history: this.history(),
    };
    browserWindow.localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  private ensureAudioContext(): AudioContext | undefined {
    if (!this.browserWindow || typeof AudioContext === 'undefined') {
      return undefined;
    }
    this.audioContext ??= new AudioContext();
    return this.audioContext;
  }

  private playCompletionTone(): void {
    if (!this.soundEnabled()) {
      return;
    }
    const audioContext = this.ensureAudioContext();
    if (!audioContext) {
      return;
    }
    void audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(660, now);
    oscillator.frequency.setValueAtTime(880, now + 0.16);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.14, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.44);
  }

  private canDrag(): boolean {
    return Boolean(
      this.browserWindow?.matchMedia('(min-width: 1024px)').matches
    );
  }

  private constrainPosition(position: PomodoroPosition): PomodoroPosition {
    const browserWindow = this.browserWindow;
    if (!browserWindow) {
      return position;
    }
    const host = this.hostElement.nativeElement;
    const launcher = host.querySelector<HTMLElement>('.pomodoro-launcher');
    const panel = host.querySelector<HTMLElement>('.pomodoro-panel');
    const launcherWidth =
      launcher?.getBoundingClientRect().width ?? host.offsetWidth;
    const launcherHeight = launcher?.getBoundingClientRect().height ?? 44;
    const panelBounds = panel?.getBoundingClientRect();
    const panelWidth = panelBounds?.width ?? 0;
    const panelHeight = panelBounds?.height ?? 0;
    const isRail = browserWindow.matchMedia('(min-width: 2000px)').matches;
    const leftOverflow =
      !isRail && this.panelOpen() ? Math.max(0, panelWidth - launcherWidth) : 0;
    const occupiedHeight = isRail
      ? Math.max(host.getBoundingClientRect().height, panelHeight)
      : launcherHeight + (this.panelOpen() ? panelHeight + 12 : 0);
    const minimumX = 8 + leftOverflow;
    const maximumX = Math.max(
      minimumX,
      browserWindow.innerWidth -
        Math.max(launcherWidth, isRail ? panelWidth : 0) -
        8
    );
    const maximumY = Math.max(
      8,
      browserWindow.innerHeight - occupiedHeight - 8
    );
    return {
      x: Math.min(maximumX, Math.max(minimumX, position.x)),
      y: Math.min(maximumY, Math.max(8, position.y)),
    };
  }

  private get browserWindow(): Window | null {
    return isPlatformBrowser(this.platformId) ? window : null;
  }
}
