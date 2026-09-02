import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ACTIVE_TRANSLATIONS, APP_LANGUAGE } from '../../i18n/language.tokens';
import { PomodoroTimerComponent } from './pomodoro-timer.component';

describe('PomodoroTimerComponent', () => {
  let fixture: ComponentFixture<PomodoroTimerComponent>;

  beforeEach(async () => {
    localStorage.removeItem('angular-senior-guide-pomodoro');
    await TestBed.configureTestingModule({
      imports: [PomodoroTimerComponent],
      providers: [
        { provide: APP_LANGUAGE, useValue: 'es' },
        { provide: ACTIVE_TRANSLATIONS, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PomodoroTimerComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    localStorage.removeItem('angular-senior-guide-pomodoro');
  });

  it('starts with the classic focus duration', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.pomodoro-time')?.textContent?.trim()).toBe(
      '25:00'
    );
  });

  it('switches to the deep-work duration while stopped', () => {
    const element = fixture.nativeElement as HTMLElement;
    const deepPreset = element.querySelector<HTMLButtonElement>(
      '[data-testid="pomodoro-preset-deep"]'
    );
    deepPreset?.click();
    fixture.detectChanges();

    expect(element.querySelector('.pomodoro-time')?.textContent?.trim()).toBe(
      '50:00'
    );
    expect(deepPreset?.getAttribute('aria-pressed')).toBe('true');
  });

  it('persists an absolute end time when started', () => {
    const element = fixture.nativeElement as HTMLElement;
    element
      .querySelector<HTMLButtonElement>('[data-testid="pomodoro-toggle"]')
      ?.click();
    fixture.detectChanges();

    const stored = JSON.parse(
      localStorage.getItem('angular-senior-guide-pomodoro') ?? '{}'
    );
    expect(stored.running).toBeTrue();
    expect(stored.endAt).toBeGreaterThan(Date.now());
    expect(
      element
        .querySelector('[data-testid="pomodoro-toggle"]')
        ?.textContent?.trim()
    ).toBe('Pausar');
  });

  it('moves the widget on desktop and persists its position', async () => {
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const launcher = host.querySelector<HTMLButtonElement>(
      '[data-testid="pomodoro-launcher"]'
    );
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
    } as MediaQueryList);
    spyOn(host, 'getBoundingClientRect').and.returnValue(
      DOMRect.fromRect({ x: 100, y: 20, width: 116, height: 44 })
    );

    launcher?.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientX: 110,
        clientY: 30,
      })
    );
    window.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 310,
        clientY: 180,
      })
    );
    window.dispatchEvent(new PointerEvent('pointerup'));
    fixture.detectChanges();

    const stored = JSON.parse(
      localStorage.getItem('angular-senior-guide-pomodoro') ?? '{}'
    );
    expect(host.classList).toContain('pomodoro-custom-position');
    expect(host.style.transform).toContain('translate3d');
    expect(stored.position).toEqual({ x: 300, y: 170 });
  });

  it('adds completed focus sessions to the study history', () => {
    const component = fixture.componentInstance as unknown as {
      completePhase(): void;
    };
    component.completePhase();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    element
      .querySelector<HTMLButtonElement>(
        '[data-testid="pomodoro-history-toggle"]'
      )
      ?.click();
    fixture.detectChanges();

    const stored = JSON.parse(
      localStorage.getItem('angular-senior-guide-pomodoro') ?? '{}'
    );
    expect(stored.history.length).toBe(1);
    expect(stored.history[0].durationMinutes).toBe(25);
    expect(
      element.querySelectorAll('[data-testid="pomodoro-history-list"] li')
        .length
    ).toBe(1);
  });
});
