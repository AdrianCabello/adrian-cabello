import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should lead with CLARA and the current EventLoop role', () => {
    const [claraExperience, eventLoopExperience] = component.experiences();

    expect(claraExperience.company).toBe('CLARA Analytics');
    expect(claraExperience.period).toBe('Jun 2025 - Sep 2026');
    expect(eventLoopExperience.title).toBe('Founder & Tech Lead');
    expect(eventLoopExperience.company).toBe('EventLoop');
  });

  it('should show and hide details while exposing expanded state', () => {
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="experience-toggle-0"]'
    );

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    const details = fixture.nativeElement.querySelector('#experience-details-0');
    expect(details?.textContent).toContain('Studies and recruitment');
    expect(details?.textContent).toContain('Payments and administration');

    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('#experience-details-0')).toBeNull();
  });

  it('should include the current Scanntech mobile and migration experience', () => {
    const scanntechExperience = component
      .experiences()
      .find(experience => experience.company === 'Scanntech');
    const projects = scanntechExperience?.projects ?? [];
    const responsibilities = projects
      .flatMap(project => project.responsibilities)
      .join(' ');

    expect(projects.map(project => project.name)).toEqual([
      'Field sales and ordering',
      'Enterprise platform modernization',
    ]);
    expect(scanntechExperience?.description).toContain('mobile app');
    expect(responsibilities).toContain('Coca-Cola and Unilever');
    expect(responsibilities).toContain('Angular 19');
    expect(responsibilities).toContain('Signals');
  });
});
