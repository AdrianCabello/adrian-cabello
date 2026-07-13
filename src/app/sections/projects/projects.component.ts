import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [CommonModule],
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
