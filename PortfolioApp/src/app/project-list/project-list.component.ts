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

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [MatGridListModule, CommonModule, LoadingComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  providers: [ProjectService]
})
export class ProjectListComponent {
  projects: Project[] = [];
  newProjectForm: FormGroup;
  showFirst: boolean = false;
  showLast: boolean = false;
  columnNum = 2;
  @ViewChild('form') myNgForm = null; // just to call resetForm method

  constructor(private projectService: ProjectService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder,
              private  mq: BreakpointObserver,
              private media: MediaObserver
            ) {
    this.newProjectForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'alterEgo': ['', [Validators.required]]
    });

    this.projectService.getAllProjects().subscribe((projects: Array<Project>) => {
      this.projects = projects.sort((a, b) => {
        return b.id.localeCompare(a.id);
      });
    });

    media.asObservable()
    .subscribe((changes: MediaChange[]) => {
      for (var i = 0; i < changes.length; i++) {
        const change = changes[i];
        console.log(change.mqAlias);
        if (change.mqAlias == 'xs') {
          this.columnNum = 1;
          this.showFirst = false;
          this.showLast = false;
        } else if (change.mqAlias == 'sm'  ) {
          this.columnNum = 2;
          this.showFirst = false;
          this.showLast = true;
        } else {
          this.columnNum = 3;
          this.showFirst = true;
          this.showLast = true;
        }
      }
    });

  }

  headerURL(project: Project): string {
    return Project.headerURL(project);
  }

  thumbnailURL(project: Project): string {
    return Project.thumbnailURL(project);
  }

  previewURL(project: Project): string {
    return Project.previewURL(project);
  }

  seeProjectDetails(project: Project): void {
      this.router.navigate([AppConfig.routes.projects + '/' + project.id]);
  }
}
