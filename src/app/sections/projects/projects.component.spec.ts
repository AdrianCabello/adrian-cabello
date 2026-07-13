import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present EventLoop as the flagship ecosystem', () => {
    const element = fixture.nativeElement as HTMLElement;
    const gallery = element.querySelector(
      '[data-testid="eventloop-ecosystem-gallery"]'
    );

    expect(gallery).toBeTruthy();
    expect(gallery?.querySelectorAll('figure').length).toBe(4);
    expect(gallery?.textContent).toContain('Event page & ticketing');
    expect(gallery?.textContent).toContain('Producer website · markama.ar');
    expect(gallery?.textContent).toContain('Artist website · adricted.com');
  });

  it('should include the EventLoop custom-domain websites as projects', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Adricted');
    expect(text).toContain('Markama');
    expect(text).toContain('Custom domain · Content managed inside EventLoop');
  });
});
