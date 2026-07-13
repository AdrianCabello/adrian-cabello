import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, Observable, switchMap } from 'rxjs';
import {
  PortfolioAdminService,
  PortfolioProjectPayload,
  PortfolioProjectRecord,
  PortfolioProjectStatus,
} from '../../services/portfolio-admin.service';

interface ProjectFormModel {
  name: string;
  description: string;
  longDescription: string;
  status: PortfolioProjectStatus;
  url: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string;
  order: number;
}

@Component({
  selector: 'app-portfolio-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './portfolio-projects.component.html',
})
export class PortfolioProjectsComponent implements OnInit {
  private readonly portfolioAdmin = inject(PortfolioAdminService);

  protected readonly projects = signal<PortfolioProjectRecord[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly isSaving = signal(false);
  protected readonly message = signal('');
  protected readonly error = signal('');
  protected readonly editingProjectId = signal<string | null>(null);
  protected readonly pendingDeleteId = signal<string | null>(null);
  protected form = this.emptyForm();

  ngOnInit(): void {
    this.loadProjects();
  }

  protected loadProjects(): void {
    this.isLoading.set(true);
    this.error.set('');
    this.portfolioAdmin
      .listProjects()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: response => {
          this.projects.set(response.data);
          if (!this.editingProjectId()) {
            this.form.order = this.nextOrder(response.data);
          }
        },
        error: () =>
          this.error.set(
            'No pude cargar los proyectos. Revisá la sesión o la API de Rakium.'
          ),
      });
  }

  protected saveProject(): void {
    const name = this.form.name.trim();
    if (!name || this.isSaving()) {
      return;
    }

    this.isSaving.set(true);
    this.message.set('');
    this.error.set('');
    const id = this.editingProjectId();
    const request = id
      ? this.portfolioAdmin.updateProject(id, this.toPayload())
      : this.portfolioAdmin.createProject(this.toPayload());

    request.pipe(finalize(() => this.isSaving.set(false))).subscribe({
      next: () => {
        this.message.set(id ? 'Proyecto actualizado.' : 'Proyecto creado.');
        this.cancelEdit();
        this.loadProjects();
      },
      error: () =>
        this.error.set(
          'No pude guardar el proyecto. Revisá los campos y el orden elegido.'
        ),
    });
  }

  protected editProject(project: PortfolioProjectRecord): void {
    this.editingProjectId.set(project.id);
    this.form = {
      name: project.name,
      description: project.description ?? '',
      longDescription: project.longDescription ?? '',
      status: project.status,
      url: project.url ?? '',
      demoUrl: project.demoUrl ?? '',
      githubUrl: project.githubUrl ?? '',
      technologies: project.technologies?.join(', ') ?? '',
      order: project.order,
    };
    this.message.set('');
    this.error.set('');
  }

  protected cancelEdit(): void {
    this.editingProjectId.set(null);
    this.form = this.emptyForm(this.nextOrder(this.projects()));
  }

  protected requestDelete(id: string): void {
    this.pendingDeleteId.set(id);
  }

  protected cancelDelete(): void {
    this.pendingDeleteId.set(null);
  }

  protected confirmDelete(id: string): void {
    this.portfolioAdmin.deleteProject(id).subscribe({
      next: () => {
        this.pendingDeleteId.set(null);
        this.message.set('Proyecto eliminado.');
        this.loadProjects();
      },
      error: () => this.error.set('No pude eliminar el proyecto.'),
    });
  }

  protected uploadImage(project: PortfolioProjectRecord, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.message.set('');
    this.error.set('');
    const upload = this.portfolioAdmin.uploadGalleryImage(project.id, file);
    const request: Observable<unknown> = project.coverImageId
      ? upload
      : upload.pipe(
          switchMap(image =>
            this.portfolioAdmin.updateProject(project.id, {
              coverImageId: image.id,
            })
          )
        );

    request.subscribe({
      next: () => {
        input.value = '';
        this.message.set('Imagen subida y optimizada por Rakium.');
        this.loadProjects();
      },
      error: () => this.error.set('No pude subir la imagen del proyecto.'),
    });
  }

  protected deleteImage(projectId: string, imageId: string): void {
    this.portfolioAdmin.deleteGalleryImage(projectId, imageId).subscribe({
      next: () => {
        this.message.set('Imagen eliminada.');
        this.loadProjects();
      },
      error: () => this.error.set('No pude eliminar la imagen.'),
    });
  }

  private toPayload(): PortfolioProjectPayload {
    return {
      name: this.form.name.trim(),
      description: this.form.description.trim() || undefined,
      longDescription: this.form.longDescription.trim() || undefined,
      status: this.form.status,
      type: 'CUSTOM',
      category: 'SITIO_WEB',
      url: this.form.url.trim() || undefined,
      demoUrl: this.form.demoUrl.trim() || undefined,
      githubUrl: this.form.githubUrl.trim() || undefined,
      technologies: this.form.technologies.trim() || undefined,
      order: Number(this.form.order) || 0,
    };
  }

  private emptyForm(order = 0): ProjectFormModel {
    return {
      name: '',
      description: '',
      longDescription: '',
      status: 'DRAFT',
      url: '',
      demoUrl: '',
      githubUrl: '',
      technologies: '',
      order,
    };
  }

  private nextOrder(projects: PortfolioProjectRecord[]): number {
    return projects.length
      ? Math.max(...projects.map(project => project.order)) + 1
      : 0;
  }
}
