import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService, type Project } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  protected projects = this.projectsService.getProjects();
}
