import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { style, transition } from '@angular/animations';
import { trigger } from '@angular/animations';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  standalone: true,
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class ExperienceComponent {
  readonly experiences = signal([
    {
      title: 'Senior Frontend Developer',
      company: 'Scanntech',
      period: 'May 2024 - January 2025',
      isOpen: false,
      logoUrl: '../../../../assets/logos/scanntech.jpeg',
      description: `Developed an advanced analytics dashboard designed to transform raw data into actionable insights, optimizing decision-making and business profitability. The platform leverages real-time data processing and visualization tools to enhance operational efficiency and strategic planning.`,
      responsibilities: [
        'Designed and built a high-performance dashboard with Angular 19, utilizing its latest features.',
        'Implemented Signals API for state management, improving reactivity and performance.',
        'Leveraged deferred loading and hydration to optimize rendering and resource consumption.',
        'Developed interactive data visualizations to help users interpret key business metrics.',
        'Created dynamic and reusable UI components, ensuring scalability and maintainability.',
        'Integrated RESTful services for seamless data fetching and synchronization.',
        'Ensured high accessibility and responsiveness, adapting to various devices.',
        'Tech stack: Angular 19, TypeScript, RxJS, Signals API, HTML5, CSS3, SASS.',
      ],
      projects: [],
    },
    {
      title: 'Senior Frontend Developer',
      company: 'Halo Media LLC',
      period: 'Jun 2022 – Apr 2024',
      logoUrl: '../../../../assets/logos/halo.jpeg',
      isOpen: false,
      description: `Worked on multiple AI-powered and investment-oriented web platforms for Mercer, including RFP, Mercer Mind, Catalytic Investment Exchange, and the Mercer homepage. Focused on building scalable, testable, and responsive frontend solutions using Angular and RxJS.`,
      projects: [
        {
          name: 'Mercer | RFP',
          summary:
            'Developed an AI-powered platform that allows users to upload files with questions and receive AI-generated responses.',
          responsibilities: [
            'Led the front-end team and built the application from scratch.',
            'Developed a file upload system and integrated real-time AI responses.',
            'Ensured 80%+ unit test coverage for stability.',
            'Tech stack: Angular 17, TypeScript, RxJS, HTML5, CSS3, SASS.',
          ],
        },
        {
          name: 'Mercer | Mercer Mind',
          summary:
            'Created an AI chatbot that enables customers to interact with a virtual assistant trained on company data.',
          responsibilities: [
            'Developed a real-time chat interface with AI-driven responses.',
            'Used RxJS for state management and secured authentication.',
            'Maintained 80%+ unit test coverage for reliability.',
            'Tech stack: Angular 16, TypeScript, RxJS, HTML5, CSS3, SASS.',
          ],
        },
        {
          name: 'Mercer | Catalytic Investment Exchange',
          summary:
            'An online platform connecting investors and dealmakers for investment opportunities.',
          responsibilities: [
            'Designed and built the UI from scratch, optimizing user workflows.',
            'Implemented real-time messaging, notifications, and secure authentication.',
            '80%+ unit test coverage for code stability.',
            'Tech stack: Angular 14, TypeScript, RxJS, HTML5, CSS3, SASS.',
          ],
        },
        {
          name: 'Mercer | Homepage',
          summary: `Developed Mercer's homepage and landing page, showcasing its services and mission.`,
          responsibilities: [
            'Led front-end development, ensuring responsiveness and performance.',
            'Built dynamic content sections and improved SEO.',
            '80%+ unit test coverage for maintainability.',
            'Tech stack: Angular 12, TypeScript, HTML5, CSS3, SASS.',
          ],
        },
      ],
    },
    {
      title: 'Senior Frontend Developer',
      company: 'Cognizant Softvision',
      period: 'Mar 2021 - Jun 2022',
      logoUrl: '../../../../assets/logos/softvision.jpeg',
      isOpen: false,
      description: `Worked on the EY Global Tax Platform (GTP), an end-to-end solution designed to streamline tax operations for multinational organizations. The platform enables real-time access to global tax data, helping clients identify opportunities, meet obligations, and mitigate risks.`,
      responsibilities: [
        'Developed and implemented new features to enhance platform functionality and user experience.',
        'Refactored and optimized existing code, improving performance, scalability, and maintainability.',
        'Built dynamic and reusable components to improve code efficiency and facilitate future development.',
        'Developed and integrated API consumption services, ensuring seamless data communication between the front-end and back-end.',
        'Implemented state management solutions using Redux to handle complex application states effectively.',
        'Created interactive UI components and modals, improving workflow efficiency.',
        'Maintained 80%+ unit test coverage for new and refactored functionalities using Jasmine.',
        'Resolved bugs and performance issues, enhancing overall platform stability.',
        'Tech stack: Angular 11, Redux, HTML5, CSS3, SASS, RESTful services, and Jasmine.',
      ],
    },
    {
      title: 'Semi-Sr Frontend Developer',
      company: 'ProKarma',
      period: 'Jun 2019 - Mar 2021',
      logoUrl: '../../../../assets/logos/prokarma.jpeg',
      isOpen: false,
      description: `Symplr is a leading provider of healthcare governance, risk management, and compliance (GRC) solutions, delivering tailored software that enhances operational efficiency and ensures regulatory compliance.`,
      responsibilities: [
        'Developed and optimized new features to enhance platform functionality and user experience.',
        'Designed and implemented administrative forms for managing users, supplies, events, and providers.',
        'Created summary profile views, improving accessibility and usability.',
        'Built modals and interactive UI components to streamline workflows and boost efficiency.',
        'Worked extensively with Redux and Store for state management, ensuring optimal data flow and application performance.',
        'Ensured 80%+ unit test coverage on new and refactored code using Jasmine, improving software reliability.',
        'Collaborated within a cross-functional team of over 100 developers, designers, and product managers, following Agile methodologies.',
        'Worked with a modern tech stack: Angular 9, Redux, Store, HTML5, CSS3, SASS, and RESTful APIs.',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'gA Argentina (Grupo Assa)',
      period: 'Dec 2016 - Jun 2019',
      isOpen: false,
      logoUrl: '../../../../assets/logos/grupoassa.jpeg',
      description: `Worked on web platforms for clients in the finance and retail sectors, building scalable and secure systems that streamlined loan processing and customer engagement.`,
      projects: [
        {
          name: 'Client: Commodity Finance',
          summary:
            'Built a secure inventory loan processing system that connects lenders and merchants through digital documentation, streamlining the origination, servicing, and distribution of commodity inventory financing.',
          responsibilities: [
            'Implemented authentication using Redux & LocalStorage.',
            'Developed user registration and account management features.',
            'Created dynamic navigation with Angular Router and lazy loading.',
            'Designed a responsive UI with Angular Material.',
            'Developed modals and role-based access control.',
            'Built a user summary and profile editing system.',
            'Created an item list with filtering and pagination.',
            'Developed dynamic forms generated from JSON.',
            'Built negotiation forms (Create, Update, Delete).',
            'Implemented a real-time chat system for intercompany communication.',
            'Integrated Google Analytics for usage tracking.',
            'Maintained 80%+ unit test coverage on new and refactored code.',
            'Tech stack: Angular 7, Jasmine, HTML5, CSS3, SASS, RESTful services.',
          ],
        },
        {
          name: 'Client: OCP',
          summary:
            'Developed a platform to better understand customers, measure in-store traffic, manage the sales force, and execute personalized promotions—all in one tool.',
          responsibilities: [
            'Implemented authentication using LocalStorage.',
            'Developed user registration and authentication features.',
            'Designed and built a fully responsive UI.',
            'Created and optimized modals for seamless interactions.',
            'Implemented store and region management functionalities.',
            'Developed an item listing system with filtering and pagination.',
            'Integrated a role-based access control system.',
            'Tech stack: Angular 4, HTML5, CSS3, SASS, RESTful services.',
          ],
        },
      ],
    },
  ]);

  toggle(index: number) {
    const updated = [...this.experiences()];
    updated[index].isOpen = !updated[index].isOpen;
    this.experiences.set(updated);
  }

  trackByTitle = (_: number, exp: { title: string }) => exp.title;
}
