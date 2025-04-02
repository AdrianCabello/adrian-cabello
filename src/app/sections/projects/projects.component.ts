import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Eventloop',
      description: 'EventLoop is a self-managed platform designed to simplify event organization. It allows users to manage everything from event publishing to ticket sales, offering full control, speed, and continuous support.',
      tech: ['Angular 19', 'Tailwind', 'Go', 'PostgreSQL'],
      link: 'https://eventloop.club',
      image: '../../../assets/images/eventloop.png'
    },

  ];
}
