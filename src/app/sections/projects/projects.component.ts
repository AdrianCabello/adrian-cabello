import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  protected projects = this.projectsService.getProjects();

  protected imageSrcSet(image: string): string | null {
    if (!image.includes('assets/images/') || !image.endsWith('.webp')) {
      return null;
    }

    return `${image.replace(/\.webp$/, '-480.webp')} 480w, ${image} 1200w`;
  }
}
