import { createReducer, on } from '@ngrx/store';
import { projectAdapter, initialProjectState } from './project.state';
import * as ProjectActions from './project.actions';

export const projectReducer = createReducer(
  initialProjectState,
  
  on(ProjectActions.loadProjects, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ProjectActions.loadProjectsSuccess, (state, { projects }) => 
    projectAdapter.setAll(projects, {
      ...state,
      loading: false
    })
  ),
  
  on(ProjectActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(ProjectActions.selectProject, (state, { projectId }) => ({
    ...state,
    selectedProjectId: projectId
  })),
  
  on(ProjectActions.loadProject, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ProjectActions.loadProjectSuccess, (state, { project }) =>
    projectAdapter.upsertOne(project, {
      ...state,
      loading: false
    })
  ),
  
  on(ProjectActions.loadProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);