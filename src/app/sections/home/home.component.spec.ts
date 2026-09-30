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
    ).toContain('LLMs, MCP and automation');
    expect(
      element.querySelector('[data-testid="home-role-summary"]')?.textContent
    ).toContain('9+ years of experience');
  });

  it('should position Adrian as a senior Angular frontend engineer', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Senior Frontend Engineer');
    expect(element.textContent).toContain('Angular 22');
    expect(element.textContent).toContain('Signals / RxJS');
    expect(element.textContent).not.toContain('Go + Node');
  });

  it('should present the current Ionic and Angular migration experience', () => {
    const element: HTMLElement = fixture.nativeElement;
    const summary = element.querySelector(
      '[data-testid="home-ai-experience-summary"]'
    )?.textContent;

    expect(element.textContent).toContain('Mobile');
    expect(element.textContent).toContain('Ionic');
    expect(summary).toContain('Coca-Cola and Unilever');
    expect(summary).toContain(
      'migrated a large enterprise Angular application'
    );
  });

  it('should not claim an unsupported Angular version', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Angular 22');
    expect(element.textContent).not.toContain('migrated to Angular 22');
  });
});
