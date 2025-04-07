import { Component, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../shared/project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreModule, MediaChange, MediaObserver } from '@angular/flex-layout';
import { AppConfig } from '../config/app.config';
import { ProjectService } from '../shared/project.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { Store } from '@ngrx/store';
import { loadProjects, selectProject } from '../store/project.actions';
import { selectAllProjects, selectProjectLoading } from '../store/project.selectors';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    MatGridListModule, 
    CommonModule, 
    LoadingComponent,
    LoadingSpinnerComponent
  ],
  template: `
  <app-loading-spinner [loading]="(loading$ | async) ?? false"></app-loading-spinner>
    
  <div *ngIf="!(loading$ | async)" class="content" fxLayout="row" fxLayoutAlign="center center">
    <mat-grid-list [cols]="columnNum" rowHeight="fit" gutterSize="3px">
      <mat-grid-tile *ngFor="let project of projects$ | async; trackBy: trackByFn">
        <img [src]="previewURL(project)" [alt]="project.title" (click)="seeProjectDetails(project)" />
        <mat-grid-tile-footer fxHide.xs>{{project.title}}</mat-grid-tile-footer>
      </mat-grid-tile>
    </mat-grid-list>
  </div>
  `,
  providers: [ProjectService]
})
export class ProjectListComponent {
  projects$: Observable<Project[]>;
  loading$: Observable<boolean>;
  columnNum = 2;
  @ViewChild('form') myNgForm = null;

  constructor(
    private store: Store,
    private router: Router,
    private media: MediaObserver
  ) {
    this.store.dispatch(loadProjects());
    this.projects$ = this.store.select(selectAllProjects);
    this.loading$ = this.store.select(selectProjectLoading).pipe(
      map((loading) => loading ?? false) // Ensure a default value of `false`
    );

    media.asObservable()
      .subscribe((changes: MediaChange[]) => {
        for (let change of changes) {
          if (change.mqAlias === 'xs') {
            this.columnNum = 1;
          } else if (change.mqAlias === 'sm') {
            this.columnNum = 2;
          } else {
            this.columnNum = 3;
          }
        }
      });
  }

  trackByFn(index: number, project: Project): string {
    return project.id!;
  }

  previewURL(project: Project): string {
    return Project.previewURL(project);
  }

  seeProjectDetails(project: Project): void {
    this.store.dispatch(selectProject({ projectId: project.id! }));
    this.router.navigate([AppConfig.routes.projects + '/' + project.id]);
  }
}