import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ADRIAN_CLIENT_ID, getApiBaseUrl } from './api-url';

export interface Project {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  images: string[];
  instagram?: string; // Opcional
  website?: string; // Opcional
  clientName?: string; // Opcional
}

interface BackendGalleryItem {
  id: string;
  url: string;
}

interface BackendProject {
  id: string;
  name: string;
  description?: string | null;
  longDescription?: string | null;
  url?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  technologies?: string[] | null;
  gallery?: BackendGalleryItem[];
  coverImage?: BackendGalleryItem | null;
  client?: {
    name?: string | null;
  };
}

interface PaginatedBackendProjects {
  data: BackendProject[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly apiBaseUrl = getApiBaseUrl();

  private fallbackProjects: Project[] = [
    {
      title: 'Lautaro Vulcano',
      description: 'Personal portfolio for Lautaro Vulcano, a graphic designer specialized in visual content for social media, branding, event flyers, and informative websites. The site reflects his focus on clear and effective communication through design.',
      tech: ['Angular', 'TypeScript', 'Tailwind CSS'],
      link: 'https://lautarovulcano.com',
      images: [
        '../../../assets/images/lautarovulcano.png',
        '../../../assets/images/lautarovulcano-2.png',
        '../../../assets/images/lautarovulcano-3.png'
      ],
      clientName: 'Lautaro Vulcano',
      website: 'https://lautarovulcano.com',
      instagram: 'https://instagram.com/lautarovulcano'
    },
    {
      title: 'Eventloop',
      description: 'EventLoop is a self-managed platform designed to simplify event organization. It allows users to manage everything from event publishing to ticket sales, offering full control, speed, and continuous support.',
      tech: ['Angular 19', 'Tailwind', 'Go', 'PostgreSQL'],
      link: 'https://eventloop.club',
      images: [
        '../../../assets/images/eventloop.png',
        '../../../assets/images/eventloop-2.png',
        '../../../assets/images/eventloop-3.png'
      ],
      clientName: 'Eventloop',
      website: 'https://eventloop.club',
      instagram: 'https://instagram.com/eventloop'
    }
  ];

  // Exponemos los datos como un signal
  projects = signal<Project[]>(this.fallbackProjects);

  constructor(private readonly http: HttpClient) {
    this.loadPublicProjects();
  }

  getProjects() {
    return this.projects.asReadonly();
  }

  private loadPublicProjects(): void {
    this.http
      .get<PaginatedBackendProjects>(
        `${this.apiBaseUrl}/projects/client/${ADRIAN_CLIENT_ID}/public?limit=20`,
      )
      .pipe(
        map((response) => response.data.map((project) => this.mapProject(project))),
        catchError(() => of(this.fallbackProjects)),
      )
      .subscribe((projects) => {
        this.projects.set(projects.length ? projects : this.fallbackProjects);
      });
  }

  private mapProject(project: BackendProject): Project {
    const images = [
      ...(project.coverImage?.url ? [project.coverImage.url] : []),
      ...(project.gallery?.map((item) => item.url) ?? []),
    ].filter((url, index, list) => list.indexOf(url) === index);

    return {
      id: project.id,
      title: project.name,
      description: project.description ?? project.longDescription ?? '',
      tech: Array.isArray(project.technologies) ? project.technologies : [],
      link: project.demoUrl ?? project.url ?? project.githubUrl ?? '#',
      images: images.length ? images : ['../../../assets/images/ghibli.png'],
      clientName: project.client?.name ?? undefined,
      website: project.demoUrl ?? project.url ?? undefined,
    };
  }
}
