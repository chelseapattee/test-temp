import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProjectService } from '../shared/project.service';
import * as ProjectActions from './project.actions';

@Injectable()
export class ProjectEffects {
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      mergeMap(() =>
        this.projectService.getAllProjects().pipe(
          map(projects => ProjectActions.loadProjectsSuccess({ projects })),
          catchError(error => of(ProjectActions.loadProjectsFailure({ error: error.message })))
        )
      )
    )
  );

  loadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProject),
      mergeMap(action =>
        this.projectService.getProjectById(action.projectId).pipe(
          map(project => ProjectActions.loadProjectSuccess({ project })),
          catchError(error => of(ProjectActions.loadProjectFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}
}