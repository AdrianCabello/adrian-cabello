import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
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
  imageLabels?: string[];
  platformNote?: string;
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
        'The operating system behind event discovery, ticketing, producer operations, artist profiles, point of sale, inventory and branded public websites.',
      outcomes: [
        'Own product strategy, UX, architecture, backend systems and production releases.',
        'Built one platform serving attendees, producers, venues and artists.',
        'Launched productized custom-domain websites powered and managed from EventLoop.',
      ],
      tech: ['Angular 20', 'Go', 'Node.js', 'PostgreSQL'],
      link: 'https://eventloop.ar',
      images: [
        '../../../assets/images/eventloop-discovery.webp',
        '../../../assets/images/eventloop-event.webp',
      ],
      imageLabels: ['Event discovery', 'Event page & ticketing'],
      clientName: 'EventLoop',
      website: 'https://eventloop.ar',
      instagram: 'https://instagram.com/eventloop.ar',
      featured: true,
    },
    {
      title: 'Adricted',
      role: 'Artist website · Powered by EventLoop',
      description:
        'A branded artist website generated from EventLoop and published on adricted.com through the platform’s custom-domain offering.',
      outcomes: [
        'Brings events, music, galleries, biography and verified channels into one profile.',
        'Uses EventLoop as the content platform while the artist owns the public domain.',
      ],
      tech: ['EventLoop', 'Custom domains', 'Angular', 'Media platform'],
      link: 'https://adricted.com',
      images: ['../../../assets/images/eventloop-artist-adricted.webp'],
      imageLabels: ['Live artist profile on adricted.com'],
      clientName: 'Adricted',
      website: 'https://adricted.com',
      instagram: 'https://instagram.com/adricted__',
      platformNote: 'Custom domain · Content managed inside EventLoop',
    },
    {
      title: 'Markama',
      role: 'Producer website · Powered by EventLoop',
      description:
        'A producer website served by EventLoop at markama.ar, turning the organization profile into a branded destination with its own domain.',
      outcomes: [
        'Publishes events, artists, venues, history and contact information from one workspace.',
        'Demonstrates the productized custom-domain offering available to EventLoop producers.',
      ],
      tech: ['EventLoop', 'Custom domains', 'Angular', 'Producer tools'],
      link: 'https://markama.ar',
      images: ['../../../assets/images/eventloop-producer-markama.webp'],
      imageLabels: ['Live producer profile on markama.ar'],
      clientName: 'Markama',
      website: 'https://markama.ar',
      instagram: 'https://www.instagram.com/markamaquinta/',
      platformNote: 'Custom domain · Content managed inside EventLoop',
    },
    {
      title: 'Haircut & Chill',
      role: 'Client website',
      description:
        'A conversion-focused website for JuanSe Favoretti’s hair studio in Tandil, combining a strong editorial identity with clear services, haircut inspiration and direct booking paths.',
      outcomes: [
        'Designed the experience around the studio’s relaxed, craft-led identity.',
        'Connected Calendly, WhatsApp and Instagram so visitors can book through their preferred channel.',
        'Built a filterable haircut catalogue that turns visual inspiration into a useful consultation tool.',
      ],
      tech: ['Angular', 'TypeScript', 'Responsive UX', 'Booking integration'],
      link: 'https://hcpeluqueria.com',
      images: ['../../../assets/images/hcpeluqueria.webp'],
      imageLabels: ['Haircut & Chill website'],
      clientName: 'JuanSe Favoretti',
      website: 'https://hcpeluqueria.com',
      instagram: 'https://www.instagram.com/haircut.andchill/',
    },
    {
      title: 'Leonela Cabello',
      role: 'Client website',
      description:
        'A professional website for an independent lawyer, translating complex legal services into a clear, approachable experience built around trust and easy first contact.',
      outcomes: [
        'Structured six legal service areas so visitors can quickly understand where to start.',
        'Created a confident editorial identity that balances professionalism with a personal presence.',
        'Integrated WhatsApp and Calendly as direct conversion paths for prospective clients.',
      ],
      tech: ['Angular', 'TypeScript', 'Responsive UX', 'SEO'],
      link: 'https://leonelacabello.com',
      images: ['../../../assets/images/leonelacabello.webp'],
      imageLabels: ['Leonela Cabello legal website'],
      clientName: 'Leonela Cabello',
      website: 'https://leonelacabello.com',
      instagram: 'https://www.instagram.com/legalcloser/',
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
        '../../../assets/images/lautarovulcano.webp',
        '../../../assets/images/lautarovulcano-2.webp',
        '../../../assets/images/lautarovulcano-3.webp',
      ],
      clientName: 'Lautaro Vulcano',
      website: 'https://lautarovulcano.com',
      instagram: 'https://instagram.com/lautarovulcano',
    },
  ];

  // Exponemos los datos como un signal
  projects = signal<Project[]>(this.fallbackProjects);

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPublicProjects();
    }
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
        ...fallback,
        ...backendProject,
        id: backendProject.id,
        images: backendProject.images.length
          ? backendProject.images
          : fallback.images,
        role: backendProject.role ?? fallback.role,
        outcomes: backendProject.outcomes?.length
          ? backendProject.outcomes
          : fallback.outcomes,
        website: backendProject.website ?? fallback.website,
        instagram: backendProject.instagram ?? fallback.instagram,
        featured: fallback.featured,
        imageLabels: fallback.imageLabels,
        platformNote: fallback.platformNote,
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
      images: images.length
        ? images
        : ['../../../assets/images/project-placeholder.webp'],
      clientName: project.client?.name ?? undefined,
      website: project.demoUrl ?? project.url ?? undefined,
    };
  }
}
