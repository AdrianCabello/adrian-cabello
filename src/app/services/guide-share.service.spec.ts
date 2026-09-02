import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ADRIAN_CLIENT_ID } from './api-url';
import { GuideShareService } from './guide-share.service';

describe('GuideShareService', () => {
  let service: GuideShareService;
  let httpTesting: HttpTestingController;
  const endpoint = `http://localhost:3000/api/public/clients/${ADRIAN_CLIENT_ID}/guides/angular-senior/shares`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GuideShareService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(GuideShareService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('loads the global share count', () => {
    service.getShareCount().subscribe(count => expect(count).toBe(12));

    const request = httpTesting.expectOne(endpoint);
    expect(request.request.method).toBe('GET');
    request.flush({ shareCount: 12 });
  });

  it('increments the global share count', () => {
    service.incrementShareCount().subscribe(count => expect(count).toBe(13));

    const request = httpTesting.expectOne(endpoint);
    expect(request.request.method).toBe('POST');
    request.flush({ shareCount: 13 });
  });

  it('falls back without breaking the guide when the API is unavailable', () => {
    service.getShareCount().subscribe(count => expect(count).toBeNull());

    httpTesting.expectOne(endpoint).flush(null, {
      status: 503,
      statusText: 'Service Unavailable',
    });
  });
});
