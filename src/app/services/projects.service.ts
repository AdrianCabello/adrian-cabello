import { Injectable, signal } from '@angular/core';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  images: string[];
  instagram?: string; // Opcional
  website?: string; // Opcional
  clientName?: string; // Opcional
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsData: Project[] = [
    {
      title: 'Lautaro Vulcano',
      description: 'Personal portfolio website for Lautaro Vulcano, a talented developer. The site features a modern design with smooth animations and responsive layout.',
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
  projects = signal<Project[]>(this.projectsData);

  // También exponemos un método para obtener los datos directamente
  getProjects(): Project[] {
    return this.projectsData;
  }
} 