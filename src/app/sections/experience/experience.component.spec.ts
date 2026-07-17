import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should lead with the current CLARA and EventLoop roles', () => {
    const [claraExperience, eventLoopExperience] = component.experiences();

    expect(claraExperience.company).toBe('CLARA Analytics');
    expect(claraExperience.period).toBe('Jun 2025 - Present');
    expect(eventLoopExperience.title).toBe('Founder & Tech Lead');
    expect(eventLoopExperience.company).toBe('EventLoop');
  });

  it('should expose expanded state to assistive technology', () => {
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="experience-toggle-0"]'
    );

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('should include the current Scanntech mobile and migration experience', () => {
    const scanntechExperience = component
      .experiences()
      .find(experience => experience.company === 'Scanntech');
    const responsibilities =
      scanntechExperience?.responsibilities?.join(' ') ?? '';

    expect(scanntechExperience?.description).toContain('Ionic');
    expect(responsibilities).toContain('Coca-Cola and Unilever');
    expect(responsibilities).toContain('Angular 19');
    expect(responsibilities).toContain('Signals');
  });
});
