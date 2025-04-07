import { Injectable, signal } from '@angular/core';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsData: Project[] = [
    {
      title: 'Eventloop',
      description: 'EventLoop is a self-managed platform designed to simplify event organization. It allows users to manage everything from event publishing to ticket sales, offering full control, speed, and continuous support.',
      tech: ['Angular 19', 'Tailwind', 'Go', 'PostgreSQL'],
      link: 'https://eventloop.club',
      image: '../../../assets/images/eventloop.png'
    }
  ];

  // Exponemos los datos como un signal
  projects = signal<Project[]>(this.projectsData);

  // También exponemos un método para obtener los datos directamente
  getProjects(): Project[] {
    return this.projectsData;
  }
} 