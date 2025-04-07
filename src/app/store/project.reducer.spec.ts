import { projectReducer } from './project.reducer';
import { initialProjectState } from './project.state';
import * as ProjectActions from './project.actions';

describe('Project Reducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const state = projectReducer(undefined, action);

    expect(state).toBe(initialProjectState);
  });

  it('should set loading to true while loading projects', () => {
    const action = ProjectActions.loadProjects();
    const state = projectReducer(initialProjectState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should update state with projects on successful load', () => {
    const projects = [
      { id: '1', title: 'Project 1' },
      { id: '2', title: 'Project 2' }
    ];
    const action = ProjectActions.loadProjectsSuccess({ projects });
    const state = projectReducer(initialProjectState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ids.length).toBe(2);
  });

  it('should set error on failed load', () => {
    const error = 'Failed to load projects';
    const action = ProjectActions.loadProjectsFailure({ error });
    const state = projectReducer(initialProjectState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});