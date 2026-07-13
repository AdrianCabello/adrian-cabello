import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADRIAN_CLIENT_ID, getApiBaseUrl } from './api-url';

export type PortfolioProjectStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED';

export interface PortfolioGalleryItem {
  id: string;
  url: string;
  title?: string | null;
  description?: string | null;
  order: number;
}

export interface PortfolioProjectRecord {
  id: string;
  name: string;
  description?: string | null;
  longDescription?: string | null;
  status: PortfolioProjectStatus;
  type?: string | null;
  category?: string | null;
  url?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  technologies?: string[] | null;
  order: number;
  coverImageId?: string | null;
  coverImage?: PortfolioGalleryItem | null;
  gallery?: PortfolioGalleryItem[];
}

export interface PortfolioProjectPayload {
  name: string;
  description?: string;
  longDescription?: string;
  status: PortfolioProjectStatus;
  type: string;
  category: string;
  url?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string;
  order: number;
  coverImageId?: string | null;
}

interface PaginatedProjects {
  data: PortfolioProjectRecord[];
}

@Injectable({ providedIn: 'root' })
export class PortfolioAdminService {
  private readonly apiBaseUrl = getApiBaseUrl();

  constructor(private readonly http: HttpClient) {}

  listProjects(): Observable<PaginatedProjects> {
    return this.http.get<PaginatedProjects>(
      `${this.apiBaseUrl}/projects/client/${ADRIAN_CLIENT_ID}?limit=50`
    );
  }

  createProject(
    payload: PortfolioProjectPayload
  ): Observable<PortfolioProjectRecord> {
    return this.http.post<PortfolioProjectRecord>(
      `${this.apiBaseUrl}/projects`,
      { ...payload, clientId: ADRIAN_CLIENT_ID }
    );
  }

  updateProject(
    id: string,
    payload: Partial<PortfolioProjectPayload>
  ): Observable<PortfolioProjectRecord> {
    return this.http.patch<PortfolioProjectRecord>(
      `${this.apiBaseUrl}/projects/${id}`,
      payload
    );
  }

  deleteProject(id: string): Observable<PortfolioProjectRecord> {
    return this.http.delete<PortfolioProjectRecord>(
      `${this.apiBaseUrl}/projects/${id}`
    );
  }

  uploadGalleryImage(
    projectId: string,
    file: File
  ): Observable<PortfolioGalleryItem> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name.replace(/\.[^.]+$/, ''));

    return this.http.post<PortfolioGalleryItem>(
      `${this.apiBaseUrl}/projects/${projectId}/gallery/upload`,
      formData
    );
  }

  deleteGalleryImage(
    projectId: string,
    imageId: string
  ): Observable<PortfolioGalleryItem> {
    return this.http.delete<PortfolioGalleryItem>(
      `${this.apiBaseUrl}/projects/${projectId}/gallery/${imageId}`
    );
  }
}
