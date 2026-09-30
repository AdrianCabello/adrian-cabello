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
    expect(
      element
        .querySelector('[data-testid="featured-project-card"]')
        ?.classList.contains('project-card--featured')
    ).toBeTrue();
    expect(gallery?.querySelectorAll('figure').length).toBe(8);
    expect(gallery?.textContent).toContain('Current EventLoop home');
    expect(gallery?.textContent).toContain('Producer setup form');
    expect(gallery?.textContent).toContain('Operations dashboard · Demo data');
    expect(gallery?.textContent).toContain('Ticket purchase flow');
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
    expect(
      element.querySelectorAll('[data-testid="project-gallery"]').length
    ).toBe(5);
    element
      .querySelectorAll('[data-testid="project-gallery"]')
      .forEach(gallery => {
        expect(gallery.querySelectorAll('figure').length).toBeGreaterThan(1);
      });
  });

  it('should use the same content order for every project', () => {
    const cards = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>(
      '[data-testid="featured-project-card"], [data-testid="project-card"]'
    );

    expect(cards.length).toBe(6);
    cards.forEach(card => {
      const title = card.querySelector('h3');
      const gallery = card.querySelector(
        '[data-testid="eventloop-ecosystem-gallery"], [data-testid="project-gallery"]'
      );
      const technologies = card.querySelector(
        '[aria-label="Technologies used"]'
      );

      expect(title).toBeTruthy();
      expect(gallery).toBeTruthy();
      expect(technologies).toBeTruthy();
      expect(
        !!(
          title &&
          gallery &&
          title.compareDocumentPosition(gallery) &
            Node.DOCUMENT_POSITION_FOLLOWING
        )
      ).toBeTrue();
      expect(
        !!(
          gallery &&
          technologies &&
          gallery.compareDocumentPosition(technologies) &
            Node.DOCUMENT_POSITION_FOLLOWING
        )
      ).toBeTrue();
    });
  });

  it('should open the selected screenshot in a modal and navigate its gallery', () => {
    const element = fixture.nativeElement as HTMLElement;
    const lautaroCard = Array.from(
      element.querySelectorAll<HTMLElement>('[data-testid="project-card"]')
    ).find(
      card =>
        card.querySelector('h3')?.textContent?.trim() === 'Lautaro Vulcano'
    );
    const slides = lautaroCard?.querySelectorAll<HTMLButtonElement>(
      '.project-gallery-slide button'
    );
    const dialog = element.querySelector<HTMLDialogElement>(
      '[data-testid="project-lightbox"]'
    );

    expect(slides?.length).toBe(5);
    expect(dialog).toBeTruthy();
    slides?.[2].click();
    fixture.detectChanges();
    expect(dialog?.open).toBeTrue();
    expect(dialog?.querySelector('img')?.getAttribute('src')).toContain(
      'lautarovulcano-3.webp'
    );

    dialog
      ?.querySelector<HTMLButtonElement>('[aria-label="Next images"]')
      ?.click();
    fixture.detectChanges();
    expect(dialog?.querySelector('img')?.getAttribute('src')).toContain(
      'lautarovulcano-4.webp'
    );

    dialog?.close();
    fixture.detectChanges();
    expect(dialog?.open).toBeFalse();
  });
});
