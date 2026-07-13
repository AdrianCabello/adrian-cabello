import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present the current AI and automation experience', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(
      element.querySelector('[data-testid="home-ai-experience-summary"]')
        ?.textContent
    ).toContain('two years building practical AI-enabled workflows');
    expect(
      element.querySelector('[data-testid="home-role-summary"]')?.textContent
    ).toContain('9+ years of experience');
  });

  it('should not claim an unsupported Angular version', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('2—20');
    expect(element.textContent).not.toContain('Angular 22');
  });
});
