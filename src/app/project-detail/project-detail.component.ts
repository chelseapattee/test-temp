import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../shared/project.model';
import { loadProject } from '../store/project.actions';
import { selectSelectedProject, selectProjectLoading, selectProjectError } from '../store/project.selectors';
import { ProjectHeaderComponent } from '../project-header/project-header.component';
import { ProjectSectionNotesComponent } from '../project-section-notes/project-section-notes.component';
import { ProjectSectionCenteredQuoteComponent } from '../project-section-centered-quote/project-section-centered-quote.component';
import { ProjectCalloutComponent } from '../project-callout/project-callout.component';
import { ProjectSectionCenteredTextComponent } from '../project-section-centered-text/project-section-centered-text.component';
import { ProjectSectionTwoImagesComponent } from '../project-section-two-images/project-section-two-images.component';
import { ProjectSectionImageTextComponent } from '../project-section-image-text/project-section-image-text.component';
import { ProjectSectionImageFullComponent } from '../project-section-image-full/project-section-image-full.component';
import { ProjectSectionImageFiftyComponent } from '../project-section-image-fifty/project-section-image-fifty.component';
import { ProjectSectionImageTextRightComponent } from '../project-section-image-text-right/project-section-image-text-right.component';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'project-detail',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    ProjectHeaderComponent,
    ProjectSectionNotesComponent,
    ProjectSectionCenteredQuoteComponent,
    ProjectCalloutComponent,
    ProjectSectionCenteredTextComponent,
    ProjectSectionTwoImagesComponent,
    ProjectSectionImageTextComponent,
    ProjectSectionImageFullComponent,
    ProjectSectionImageFiftyComponent,
    ProjectSectionImageTextRightComponent
  ],
  template: `
    <app-loading-spinner [loading]="loading$ | async"></app-loading-spinner>

    <div *ngIf="project$ | async as project" class="project-container">
      <div role="main">
        <project-header [project]="project"></project-header>

        <div *ngFor="let section of project.sections; let last = last;">
          <project-section-notes 
            *ngIf="section.type === 'notes'"
            [image]="asset(section.attributes.image)"
            [content]="asset(section.attributes.content)"
            [overview]="section.attributes.overview">
          </project-section-notes>

          <div [ngSwitch]="section.type" class="section-container">
            <project-section-image-text 
              *ngSwitchCase="'image-text'"
              [header]="section.attributes.header"
              [image]="asset(section.attributes.image)"
              [paragraphs]="section.attributes.paragraphs">
            </project-section-image-text>

            <project-section-image-text-right 
              *ngSwitchCase="'image-text-right'"
              [header]="section.attributes.header"
              [content]="asset(section.attributes.content)"
              [image]="asset(section.attributes.image)">
            </project-section-image-text-right>

            <project-section-centered-text 
              *ngSwitchCase="'centered-text'"
              [content]="asset(section.attributes.content)">
            </project-section-centered-text>

            <project-section-centered-quote 
              *ngSwitchCase="'centered-quote'"
              [content]="section.attributes.content">
            </project-section-centered-quote>

            <project-section-two-images 
              *ngSwitchCase="'two-images'"
              [left]="asset(section.attributes.left)"
              [captionLT]="section.attributes.captionLT"
              [right]="asset(section.attributes.right)"
              [captionRT]="section.attributes.captionRT"
              [leftB]="asset(section.attributes.leftB)"
              [captionLB]="section.attributes.captionLB"
              [rightB]="asset(section.attributes.rightB)"
              [captionRB]="section.attributes.captionRB">
            </project-section-two-images>

            <project-section-image-fifty 
              *ngSwitchCase="'image-fifty'"
              [header]="section.attributes.header"
              [image]="asset(section.attributes.image)">
            </project-section-image-fifty>

            <project-section-image-full 
              *ngSwitchCase="'image-full'"
              [header]="section.attributes.header"
              [content]="section.attributes.content ? asset(section.attributes.content) : undefined"
              [image]="asset(section.attributes.image)">
            </project-section-image-full>
          </div>
          <br *ngIf="last">
        </div>

        <project-callout [projects]="relatedProjects$ | async"></project-callout>
      </div>
    </div>
  `,
  styles: [`
    .project-container {
      margin-top: 20px;
    }
    .section-container {
      margin: 20px 0;
      animation: fadeIn 0.5s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project$: Observable<Project | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  relatedProjects$: Observable<Project[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private snackBar: MatSnackBar
  ) {
    this.project$ = this.store.select(selectSelectedProject);
    this.loading$ = this.store.select(selectProjectLoading);
    this.error$ = this.store.select(selectProjectError);
    this.relatedProjects$ = this.store.select(selectAllProjects).pipe(
      map(projects => projects.filter(p => p.id !== this.route.snapshot.params['id']).slice(0, 3))
    );
  }

  ngOnInit() {
    const projectId = this.route.snapshot.params['id'];
    if (projectId) {
      this.store.dispatch(loadProject({ projectId }));
    }

    this.error$.pipe(
      filter(error => !!error)
    ).subscribe(error => {
      this.snackBar.open(
        error || 'An error occurred while loading the project',
        'Close',
        { duration: 5000 }
      );
    });
  }

  asset(name?: string): string | null {
    if (!name) return null;
    const projectId = this.route.snapshot.params['id'];
    return `${environment.apiUrl}/projects/${projectId}/assets/${name.replaceAll('@', '')}`;
  }
}