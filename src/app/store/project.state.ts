import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Project } from '../shared/project.model';

export interface ProjectState extends EntityState<Project> {
  selectedProjectId: string | null;
  loading: boolean;
  error: string | null;
}

export const projectAdapter = createEntityAdapter<Project>({
  selectId: (project: Project) => project.id!
});

export const initialProjectState: ProjectState = projectAdapter.getInitialState({
  selectedProjectId: null,
  loading: false,
  error: null
});