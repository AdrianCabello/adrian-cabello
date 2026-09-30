import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './experience.component.html',
  standalone: true,
})
export class ExperienceComponent {
  readonly experiences = signal([
    {
      title: 'Senior Frontend Engineer',
      company: 'CLARA Analytics',
      period: 'Jun 2025 - Sep 2026',
      isOpen: false,
      description: `Built production Angular features for data-rich and AI-enabled workflows in a cross-functional product environment.`,
      projects: [
        {
          name: 'Studies and recruitment',
          summary: 'Brought study administration and participant recruitment into cohesive backoffice workflows.',
          responsibilities: [
            'Built study lists and detail views with filters, pagination, notes, quotas, exports and deep links.',
            'Connected screener authoring and results, invitation configuration and candidate selection, including partial failure feedback.',
            'Added a moderated study calendar, booking context, recorder management and recruitment links.',
          ],
        },
        {
          name: 'Results and review',
          summary: 'Made participant results easier for operations teams to inspect and act on.',
          responsibilities: [
            'Built result detail and review flows with status history, screener answers, participant results, ratings and edit actions.',
            'Integrated video review controls and improved loading, retry and partial error states.',
            'Preserved permissions and legacy behavior while moving these workflows into the Angular backoffice.',
          ],
        },
        {
          name: 'Payments and administration',
          summary: 'Connected financial and administrative workflows to production data and permissions.',
          responsibilities: [
            'Delivered payment filters, metrics, detail views, CSV exports and permission-aware bulk actions.',
            'Built account, client and administrator management with search, navigation and access controls.',
            'Contributed supporting API contracts for study context, quotas, calendars and client filters.',
          ],
        },
        {
          name: 'Frontend quality and delivery',
          summary: 'Improved consistency and reliability across a large Angular application.',
          responsibilities: [
            'Used Angular, TypeScript and shared UI components to standardize responsive and accessible interactions.',
            'Added unit and end-to-end coverage and resolved regressions found during migration and review.',
            'Stabilized CI checks and production builds while working with product, backend, design and QA.',
          ],
        },
      ],
    },
    {
      title: 'Founder & Tech Lead',
      company: 'EventLoop',
      period: 'Dec 2023 - Present',
      isOpen: false,
      description: `Founded and lead an end-to-end platform for live events, connecting discovery, ticket sales, payments and access with the tools producers use to run venues, teams, inventory and commerce. I own product direction, UX, architecture and delivery across the public web, operations dashboard, backend and production releases.`,
      projects: [
        {
          name: 'Product, identity and public experiences',
          summary: 'Turned a multi-sided event idea into a connected product for attendees, producers, venues and artists.',
          responsibilities: [
            'Defined product flows and built Angular and TypeScript experiences for event discovery, event pages, producer onboarding, branded profiles and management dashboards.',
            'Connected events, artists, teams and content to public producer and artist websites, including sites managed in EventLoop and served on custom domains.',
            'Led UX, responsive design, frontend architecture and iteration from early web versions through the current Angular platform.',
          ],
        },
        {
          name: 'Ticketing, payments and access',
          summary: 'Connected the attendee purchase journey to the financial and on-site workflows behind every event.',
          responsibilities: [
            'Built ticket setup, checkout, invitations, order and payment views, refunds, and event-level sales reporting.',
            'Integrated payment and subscription flows with Mercado Pago, including account connection, payment status synchronization and payment history.',
            'Developed role-aware team and access workflows, ticket scanning and live sales updates for event operations.',
          ],
        },
        {
          name: 'On-site operations and commerce',
          summary: 'Brought sales, stock and purchasing into the same operational system as events and venues.',
          responsibilities: [
            'Built point-of-sale, cash register, product catalog, expense and multi-location workflows for producers and venues.',
            'Implemented inventory flows with purchases, transfers, receipt OCR imports, recipe-linked consumption and stock synchronization.',
            'Extended the platform with organization stores, supplier and order workflows, connecting commerce to stock and payment plans.',
          ],
        },
        {
          name: 'Backend, data and integrations',
          summary: 'Worked beyond the interface to make cross-product workflows reliable and maintainable.',
          responsibilities: [
            'Built and integrated Go services, REST APIs and PostgreSQL models for payments, subscriptions, permissions, artists, domains and operational data.',
            'Connected external services and automation for payments, notifications, email and CRM workflows.',
            'Designed authorization and organization-level data boundaries so teams can operate across events and locations with appropriate access.',
          ],
        },
        {
          name: 'Quality, leadership and delivery',
          summary: 'Owned the path from technical decision to a working release.',
          responsibilities: [
            'Led technical decisions, coordinated frontend and backend work, reviewed integrations and resolved production issues.',
            'Expanded automated coverage with unit, integration and Playwright end-to-end tests for critical purchase and operations flows.',
            'Managed CI, migrations, deployment and release verification across the web and backend services.',
          ],
        },
      ],
    },
    {
      title: 'Senior Frontend Developer',
      company: 'Scanntech',
      period: 'May 2024 - January 2025',
      isOpen: false,
      logoUrl: '../../../../assets/logos/scanntech.jpeg',
      description: `Worked on two connected challenges at Scanntech: helping field sellers place and track orders from a mobile app, and modernizing a large Angular platform used to analyze those operations.`,
      projects: [
        {
          name: 'Field sales and ordering',
          summary: 'The mobile app supported sellers during store visits, including work with limited connectivity and customer-specific product information.',
          responsibilities: [
            'Built an Ionic and Angular mobile ordering app for field sales and distribution teams supporting Coca-Cola and Unilever programs.',
            'Delivered visit planning, customer-specific catalogs, order and return capture, offline sync, delivery tracking, and geolocated seller routes.',
          ],
        },
        {
          name: 'Enterprise platform modernization',
          summary: 'Updated the web platform while adding analytics workflows that made operational information easier to use.',
          responsibilities: [
            'Migrated a large enterprise application to Angular 19 and developed new analytics features with Signals.',
            'Used deferred loading, hydration, reusable components, and REST integrations to improve performance and scalability.',
          ],
        },
      ],
    },
    {
      title: 'Senior Frontend Developer / Frontend Lead',
      company: 'Halo Media · Mercer',
      period: 'Jun 2022 – Apr 2024',
      logoUrl: '../../../../assets/logos/halo.jpeg',
      isOpen: false,
      description: `Led and built frontend experiences across four Mercer products: AI-assisted document responses, a conversational assistant, an investment exchange and the corporate website. My work spanned new application architecture, real-time interactions, responsive interfaces and automated tests.`,
      projects: [
        {
          name: 'Mercer | RFP',
          summary:
            'Helped teams prepare responses to document-based questions by combining file uploads, AI-generated drafts and human review in one workflow.',
          responsibilities: [
            'Led the front-end team and built the application from scratch.',
            'Developed a file upload system and integrated real-time AI responses.',
            'Designed AI-assisted workflows for document analysis, answer generation, and user review loops.',
            'Ensured 80%+ unit test coverage for stability.',
            'Tech stack: Angular 17, TypeScript, RxJS, HTML5, CSS3, SASS.',
          ],
        },
        {
          name: 'Mercer | Mercer Mind',
          summary:
            'Built a conversational interface that let customers ask questions and receive contextual answers drawn from company knowledge.',
          responsibilities: [
            'Developed a real-time chat interface with AI-driven responses.',
            'Used RxJS for state management and secured authentication.',
            'Worked with AI interaction patterns including prompt flows, contextual responses, and automated knowledge retrieval.',
            'Maintained 80%+ unit test coverage for reliability.',
            'Tech stack: Angular 16, TypeScript, RxJS, HTML5, CSS3, SASS.',
          ],
        },
        {
          name: 'Mercer | Catalytic Investment Exchange',
          summary:
            'Built the interface for a platform where investors and dealmakers could discover opportunities and communicate securely.',
          responsibilities: [
            'Designed and built the UI from scratch, optimizing user workflows.',
            'Implemented real-time messaging, notifications, and secure authentication.',
            '80%+ unit test coverage for code stability.',
            'Tech stack: Angular 14, TypeScript, RxJS, HTML5, CSS3, SASS.',
          ],
        },
        {
          name: 'Mercer | Homepage',
          summary: `Worked on the public website that introduces Mercer's services, with attention to responsive presentation, performance and search visibility.`,
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
      description: `Developed Angular features for EY Global Tax Platform, a system that helps multinational teams work with tax information and obligations across countries. I focused on making complex data workflows usable, predictable and easier to maintain.`,
      projects: [
        {
          name: 'Tax platform workflows',
          summary: 'Connected the interface to backend data so teams could navigate and act on information within the tax platform.',
          responsibilities: [
            'Developed and implemented new features to enhance platform functionality and user experience.',
            'Developed and integrated API consumption services, ensuring seamless data communication between the front-end and back-end.',
            'Implemented state management solutions using Redux to handle complex application states effectively.',
            'Created interactive UI components and modals, improving workflow efficiency.',
          ],
        },
        {
          name: 'Frontend architecture and reliability',
          summary: 'Improved the codebase behind those workflows so new features could be developed and tested more consistently.',
          responsibilities: [
            'Refactored and optimized existing code, improving performance, scalability, and maintainability.',
            'Built dynamic and reusable components to improve code efficiency and facilitate future development.',
            'Maintained 80%+ unit test coverage for new and refactored functionalities using Jasmine.',
            'Resolved bugs and performance issues, enhancing overall platform stability.',
          ],
        },
      ],
    },
    {
      title: 'Semi-Sr Frontend Developer',
      company: 'ProKarma',
      period: 'Jun 2019 - Mar 2021',
      logoUrl: '../../../../assets/logos/prokarma.jpeg',
      isOpen: false,
      description: `Built frontend features for Symplr's healthcare governance and compliance platform. The work centered on administrative tasks with many related records and forms, where clear interfaces and reliable state handling mattered.`,
      projects: [
        {
          name: 'Healthcare administration',
          summary: 'Made everyday record management easier for teams working with users, supplies, events and providers.',
          responsibilities: [
            'Developed and optimized new features to enhance platform functionality and user experience.',
            'Designed and implemented administrative forms for managing users, supplies, events, and providers.',
            'Created summary profile views, improving accessibility and usability.',
            'Built modals and interactive UI components to streamline workflows and boost efficiency.',
          ],
        },
        {
          name: 'State management and quality',
          summary: 'Kept complex screens consistent and maintainable while contributing within a large cross-functional team.',
          responsibilities: [
            'Worked extensively with Redux and Store for state management, ensuring optimal data flow and application performance.',
            'Ensured 80%+ unit test coverage on new and refactored code using Jasmine, improving software reliability.',
            'Collaborated within a cross-functional team of over 100 developers, designers, and product managers, following Agile methodologies.',
          ],
        },
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'gA Argentina (Grupo Assa)',
      period: 'Dec 2016 - Jun 2019',
      isOpen: false,
      logoUrl: '../../../../assets/logos/grupoassa.jpeg',
      description: `Built Angular applications for finance and retail clients. At Commodity Finance, the work supported inventory-backed loan processes; at OCP, it helped teams manage stores, customer information and promotions.`,
      projects: [
        {
          name: 'Client: Commodity Finance',
          summary:
            'Built interfaces for an inventory-backed lending platform where lenders and merchants managed accounts, documents, negotiations and financing records.',
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
            'Built a retail operations interface for managing stores and regions while bringing customer information, sales activity and promotions into one place.',
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
