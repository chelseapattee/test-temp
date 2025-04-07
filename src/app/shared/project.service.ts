import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Project } from './project.model';
import { CachingService } from './services/caching.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly CACHE_KEY_ALL = 'all_projects';
  private readonly CACHE_KEY_PREFIX = 'project_';

  constructor(
    private http: HttpClient,
    private cachingService: CachingService
  ) {}

  getAllProjects(): Observable<Project[]> {
    const cached = this.cachingService.get<Project[]>(this.CACHE_KEY_ALL);
    if (cached) {
      return of(cached);
    }

    return this.http.get<Project[]>(`${environment.apiUrl}/projects`).pipe(
      tap(projects => this.cachingService.set(this.CACHE_KEY_ALL, projects)),
      catchError(error => {
        console.error('Error fetching projects:', error);
        throw error;
      })
    );
  }

  getProjectById(id: string): Observable<Project> {
    const cacheKey = `${this.CACHE_KEY_PREFIX}${id}`;
    const cached = this.cachingService.get<Project>(cacheKey);
    if (cached) {
      return of(cached);
    }

    return this.http.get<Project>(`${environment.apiUrl}/projects/${id}`).pipe(
      tap(project => this.cachingService.set(cacheKey, project)),
      catchError(error => {
        console.error(`Error fetching project ${id}:`, error);
        throw error;
      })
    );
  }
}