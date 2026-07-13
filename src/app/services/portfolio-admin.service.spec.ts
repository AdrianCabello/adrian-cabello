import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ADRIAN_CLIENT_ID } from './api-url';
import {
  PortfolioAdminService,
  PortfolioProjectPayload,
} from './portfolio-admin.service';

describe('PortfolioAdminService', () => {
  let service: PortfolioAdminService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PortfolioAdminService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PortfolioAdminService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('loads projects for Adrian client', () => {
    service.listProjects().subscribe();

    const request = httpTesting.expectOne(
      `http://localhost:3000/api/projects/client/${ADRIAN_CLIENT_ID}?limit=50`
    );
    expect(request.request.method).toBe('GET');
    request.flush({ data: [] });
  });

  it('includes the Adrian client id when creating a project', () => {
    const payload: PortfolioProjectPayload = {
      name: 'EventLoop',
      status: 'PUBLISHED',
      type: 'CUSTOM',
      category: 'SITIO_WEB',
      technologies: 'Angular, Go',
      order: 0,
    };

    service.createProject(payload).subscribe();

    const request = httpTesting.expectOne('http://localhost:3000/api/projects');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.clientId).toBe(ADRIAN_CLIENT_ID);
    request.flush({ id: 'project-id', ...payload });
  });

  it('uploads gallery files through the project gallery endpoint', () => {
    const file = new File(['image'], 'eventloop.webp', {
      type: 'image/webp',
    });

    service.uploadGalleryImage('project-id', file).subscribe();

    const request = httpTesting.expectOne(
      'http://localhost:3000/api/projects/project-id/gallery/upload'
    );
    expect(request.request.method).toBe('POST');
    expect(request.request.body instanceof FormData).toBeTrue();
    request.flush({
      id: 'image-id',
      url: 'https://cdn.example/eventloop.webp',
      order: 0,
    });
  });
});
