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

  it('should present Adrian’s experience in the hero', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(
      element.querySelector('[data-testid="home-role-summary"]')?.textContent
    ).toContain('9+ years of experience');
  });

  it('should position Adrian as a senior Angular frontend engineer', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Senior Frontend Engineer');
    expect(element.textContent).toContain('Angular 22');
    expect(element.textContent).toContain('Signals / RxJS');
    expect(element.textContent).toContain('Ionic');
    expect(element.textContent).not.toContain('Go + Node');
    expect(element.textContent).not.toContain('Golang/Node');
  });

  it('should present the Ionic, Angular migration and AI experience', () => {
    const element: HTMLElement = fixture.nativeElement;
    const summary = element.querySelector(
      '[data-testid="home-ai-experience-summary"]'
    )?.textContent;

    expect(summary).toContain('Coca-Cola and Unilever');
    expect(summary).toContain('migrated a large enterprise Angular application');
  });

  it('should show the current Angular major without rewriting the historical migration', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Angular 22');
    expect(element.textContent).not.toContain('migrated to Angular 22');
  });
});
