import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectsService } from '../../services/projects.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  protected projects = this.projectsService.getProjects();
  protected activeProject = signal<Project | null>(null);
  protected activeImageIndex = signal(0);

  protected openImage(
    project: Project,
    index: number,
    dialog: HTMLDialogElement
  ): void {
    this.activeProject.set(project);
    this.activeImageIndex.set(index);
    dialog.showModal();
  }

  protected closeImage(): void {
    this.activeProject.set(null);
  }

  protected stepImage(direction: -1 | 1): void {
    const count = this.activeProject()?.images.length ?? 0;
    if (count < 2) return;
    this.activeImageIndex.update(index => (index + direction + count) % count);
  }

  protected onLightboxKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.stepImage(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.stepImage(1);
    }
  }

  protected imageSrcSet(image: string): string | null {
    if (!image.includes('assets/images/') || !image.endsWith('.webp')) {
      return null;
    }

    return `${image.replace(/\.webp$/, '-480.webp')} 480w, ${image.replace(/\.webp$/, '-768.webp')} 768w, ${image} 1200w`;
  }

  protected scrollGallery(gallery: HTMLElement, direction: -1 | 1): void {
    const firstSlide = gallery.querySelector<HTMLElement>(
      '.project-gallery-slide'
    );
    if (!firstSlide) return;

    const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
    const slideStep = firstSlide.offsetWidth + gap;
    const visibleSlides = Math.max(
      1,
      Math.round((gallery.clientWidth + gap) / slideStep)
    );
    gallery.scrollBy({
      left: direction * visibleSlides * slideStep,
      behavior: 'smooth',
    });
  }
}
