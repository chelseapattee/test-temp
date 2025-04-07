import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProjectEffects } from './project.effects';
import { ProjectService } from '../shared/project.service';
import * as ProjectActions from './project.actions';

describe('Project Effects', () => {
  let effects: ProjectEffects;
  let actions$: Observable<any>;
  let projectService: jasmine.SpyObj<ProjectService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProjectService', ['getAllProjects', 'getProjectById']);
    TestBed.configureTestingModule({
      providers: [
        ProjectEffects,
        provideMockActions(() => actions$),
        { provide: ProjectService, useValue: spy }
      ]
    });

    effects = TestBed.inject(ProjectEffects);
    projectService = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
  });

  it('should load projects successfully', (done) => {
    const projects = [{ id: '1', title: 'Project 1' }];
    projectService.getAllProjects.and.returnValue(of(projects));
    actions$ = of(ProjectActions.loadProjects());

    effects.loadProjects$.subscribe(action => {
      expect(action).toEqual(ProjectActions.loadProjectsSuccess({ projects }));
      done();
    });
  });

  it('should handle load projects error', (done) => {
    const error = new Error('Failed to load');
    projectService.getAllProjects.and.returnValue(throwError(() => error));
    actions$ = of(ProjectActions.loadProjects());

    effects.loadProjects$.subscribe(action => {
      expect(action).toEqual(ProjectActions.loadProjectsFailure({ error: error.message }));
      done();
    });
  });
});