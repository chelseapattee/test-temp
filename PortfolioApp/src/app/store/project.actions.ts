import { createAction, props } from '@ngrx/store';
import { Project } from '../shared/project.model';

export const loadProjects = createAction('[Project] Load Projects');

export const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{ projects: Project[] }>()
);

export const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
  props<{ error: string }>()
);

export const selectProject = createAction(
  '[Project] Select Project',
  props<{ projectId: string }>()
);

export const loadProject = createAction(
  '[Project] Load Project',
  props<{ projectId: string }>()
);

export const loadProjectSuccess = createAction(
  '[Project] Load Project Success',
  props<{ project: Project }>()
);

export const loadProjectFailure = createAction(
  '[Project] Load Project Failure',
  props<{ error: string }>()
);