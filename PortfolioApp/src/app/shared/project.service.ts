import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {AppConfig} from '../config/app.config';

import {Project} from './project.model';
import {throwError, Observable, map, tap, catchError} from 'rxjs';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable()
export class ProjectService {
  private headers: HttpHeaders;
  private projectsUrl: string;
  private translations: any;

  private async handleError(error: any) {
    if (error instanceof Response) {
        var json = await error.json();
        return throwError(() => json.error || 'api error');
    }
        return throwError(() => json.error || 'api error');
  }

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
    this.projectsUrl = AppConfig.endpoints.projects;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl).pipe(
        map(x => x)
    );
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(this.projectsUrl + '/' + projectId);
  }

  showSnackBar(name: string): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(this.translations[name], 'OK', config);
  }
}
