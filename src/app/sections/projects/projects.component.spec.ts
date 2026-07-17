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
    expect(gallery?.querySelectorAll('figure').length).toBe(2);
    expect(gallery?.textContent).toContain('Event page & ticketing');
    expect(gallery?.textContent).not.toContain('Producer website · markama.ar');
    expect(gallery?.textContent).not.toContain('Artist website · adricted.com');
  });

  it('should include the EventLoop custom-domain websites as projects', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Adricted');
    expect(text).toContain('Markama');
    expect(text).toContain('Custom domain · Content managed inside EventLoop');
  });

  it('should include the Haircut & Chill and Leonela Cabello client websites', () => {
    const element = fixture.nativeElement as HTMLElement;
    const text = element.textContent ?? '';
    const websiteLinks = Array.from(
      element.querySelectorAll<HTMLAnchorElement>(
        '[data-testid="project-website-link"]'
      )
    ).map(link => link.href);

    expect(text).toContain('Haircut & Chill');
    expect(text).toContain('Leonela Cabello');
    expect(websiteLinks).toContain('https://hcpeluqueria.com/');
    expect(websiteLinks).toContain('https://leonelacabello.com/');
  });
});
