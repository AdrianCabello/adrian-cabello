import { Component, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-academic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './academic.component.html',

  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s 0.7s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class AcademicComponent {
  isEducationOpen = signal(false);

  educationList = [
    {
      title: 'University Technician in Computer Applications',
      institution: 'UNICEN - Tandil, Argentina',
      date: '2015 - 2018 (Graduated)',
      description:
        'Development focused program with practical applications in computer science.',
      color: 'green',
    },
    {
      title: 'Software Engineering',
      institution: 'UNICEN - Tandil, Argentina',
      date: '2012 - 2015',
      description:
        'Foundational studies in software engineering principles and practices.',
      color: 'green',
    },
    {
      title: 'Professional & Personal Computer Technician',
      institution: 'School of Technical Education Nº3 - Necochea, Argentina',
      date: 'Graduated 2011',
      description:
        'Technical education focused on computer systems and maintenance.',
      color: 'green',
    },
  ];

  certifications = [
    {
      title: 'Angular Pro: Lleva tus bases al siguiente nivel',
      institution: 'Udemy',
      date: 'Mar 2025',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/udemy_logo.jpeg',
      url: 'https://www.udemy.com/certificate/UC-95e114aa-2735-413c-ac2f-d1d6ba49689a/',
    },
    {
      title: 'Unit Testing in Angular 12',
      institution: 'Pluralsight',
      date: 'May 2023',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/pluralsight_logo.jpeg',
      url: 'https://app.pluralsight.com/achievements/share/ba68f930-ce1f-4fb2-b25a-0752f52ef830',
    },
    {
      title: 'Angular (Basic) Certificate',
      institution: 'HackerRank',
      date: 'May 2022',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/hackerrank_logo.jpeg',
      url: 'https://www.hackerrank.com/certificates/bb6b48540cb5',
    },
    {
      title: 'Angular (Intermediate) Certificate',
      institution: 'HackerRank',
      date: 'Apr 2022',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/hackerrank_logo.jpeg',
      url: 'https://www.hackerrank.com/certificates/c031726c8383',
    },
    {
      title: 'JavaScript (Basic) Certificate',
      institution: 'HackerRank',
      date: 'Apr 2022',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/hackerrank_logo.jpeg',
      url: 'https://www.hackerrank.com/certificates/7b2739f9465f',
    },
    {
      title: 'JavaScript (Intermediate) Certificate',
      institution: 'HackerRank',
      date: 'Apr 2022',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/hackerrank_logo.jpeg',
      url: 'https://www.hackerrank.com/certificates/23bd77144f87',
    },
    {
      title: 'REDUX en Angular con NGRX: Desde las bases hasta la práctica',
      institution: 'Udemy',
      date: 'Nov 2021',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/udemy_logo.jpeg',
      url: 'https://www.udemy.com/certificate/UC-2c8b15ff-1815-484f-b9f8-0d8c5d311bbf', // ← Agregá el link real si lo tenés
    },
    {
      title: 'Node: De cero a experto',
      institution: 'Udemy',
      date: 'Jan 2020',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/udemy_logo.jpeg',
      url: 'https://www.udemy.com/certificate/UC-KQF79AVF/',
    },
    {
      title: 'Curso de Angular 6 avanzado: MEAN, JWT, Módulos, Animaciones',
      institution: 'Udemy',
      date: 'Jun 2018',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/udemy_logo.jpeg',
      url: 'https://www.udemy.com/certificate/UC-Q19NMEKH/',
    },
    {
      title: 'Angular Avanzado: Lleva tus bases al siguiente nivel - MEAN',
      institution: 'Udemy',
      date: 'Apr 2018',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/udemy_logo.jpeg',
      url: 'https://www.udemy.com/certificate/UC-MLTEPW2P', // ← si tenés el ID de la credencial, avisame y lo agrego
    },
    {
      title: 'Redux in Angular (2 and 4+)',
      institution: 'Udemy',
      date: 'Mar 2018',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/udemy_logo.jpeg',
      url: 'https://www.udemy.com/certificate/UC-VYPPNXH4/',
    },
    {
      title: 'Angular: De cero a experto creando aplicaciones (Angular 5+)',
      institution: 'Udemy',
      date: 'Nov 2017',
      badge: 'Ver credencial',
      color: 'green',
      logo: '../../../assets/logos/udemy_logo.jpeg',
      url: 'https://www.udemy.com/certificate/UC-X1AZGGM5', // Si tenés el ID, te lo agrego al final
    },
  ];
}
