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
  instagram?: string;
  website?: string;
  clientName?: string;
  role?: string;
  outcomes?: string[];
  featured?: boolean;
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
  providedIn: 'root',
})
export class ProjectsService {
  private readonly apiBaseUrl = getApiBaseUrl();

  private readonly fallbackProjects: Project[] = [
    {
      title: 'EventLoop',
      role: 'Founder & Tech Lead',
      description:
        'A founder-led event operations platform that connects ticketing, point of sale, inventory, product catalogs and multi-location workflows in one product.',
      outcomes: [
        'Own product strategy, UX, frontend architecture and releases.',
        'Built operational workflows across Angular, Go and PostgreSQL.',
      ],
      tech: ['Angular 20', 'TypeScript', 'Go', 'PostgreSQL'],
      link: 'https://eventloop.club',
      images: [
        '../../../assets/images/eventloop.png',
        '../../../assets/images/eventloop-2.png',
        '../../../assets/images/eventloop-3.png',
      ],
      clientName: 'EventLoop',
      website: 'https://eventloop.club',
      instagram: 'https://instagram.com/eventloop',
      featured: true,
    },
    {
      title: 'Lautaro Vulcano',
      role: 'Selected client work',
      description:
        'A focused portfolio for a visual designer, shaped around clear communication, responsive presentation and an easy path from work samples to contact.',
      outcomes: [
        'Designed and delivered the responsive Angular experience.',
        'Created a visual system tailored to the client’s identity.',
      ],
      tech: ['Angular', 'TypeScript', 'Tailwind CSS'],
      link: 'https://lautarovulcano.com',
      images: [
        '../../../assets/images/lautarovulcano.png',
        '../../../assets/images/lautarovulcano-2.png',
        '../../../assets/images/lautarovulcano-3.png',
      ],
      clientName: 'Lautaro Vulcano',
      website: 'https://lautarovulcano.com',
      instagram: 'https://instagram.com/lautarovulcano',
    },
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
        `${this.apiBaseUrl}/projects/client/${ADRIAN_CLIENT_ID}/public?limit=20`
      )
      .pipe(
        map(response =>
          this.curateProjects(
            response.data.map(project => this.mapProject(project))
          )
        ),
        catchError(() => of(this.fallbackProjects))
      )
      .subscribe(projects => {
        this.projects.set(projects.length ? projects : this.fallbackProjects);
      });
  }

  private curateProjects(projects: Project[]): Project[] {
    const curated = this.fallbackProjects.map(fallback => {
      const backendProject = projects.find(
        project => project.title.toLowerCase() === fallback.title.toLowerCase()
      );

      if (!backendProject) {
        return fallback;
      }

      return {
        ...backendProject,
        ...fallback,
        id: backendProject.id,
        images: backendProject.images.length
          ? backendProject.images
          : fallback.images,
        website: backendProject.website ?? fallback.website,
      };
    });

    const curatedTitles = new Set(
      curated.map(project => project.title.toLowerCase())
    );
    return [
      ...curated,
      ...projects.filter(
        project => !curatedTitles.has(project.title.toLowerCase())
      ),
    ];
  }

  private mapProject(project: BackendProject): Project {
    const images = [
      ...(project.coverImage?.url ? [project.coverImage.url] : []),
      ...(project.gallery?.map(item => item.url) ?? []),
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
