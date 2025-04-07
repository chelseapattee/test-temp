import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailComponent } from './project-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../shared/project.model';
import { loadProject } from '../store/project.actions';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let store: jasmine.SpyObj<Store>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockProject: Project = {
    id: '1',
    title: 'Test Project',
    sections: []
  };

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    storeSpy.select.and.returnValue(of(mockProject));

    await TestBed.configureTestingModule({
      imports: [ProjectDetailComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProject action on init', () => {
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(
      loadProject({ projectId: '1' })
    );
  });

  it('should show error message when error occurs', () => {
    store.select.and.returnValue(of('Error loading project'));
    fixture.detectChanges();
    expect(snackBar.open).toHaveBeenCalled();
  });

  it('should generate correct asset URL', () => {
    const url = component.asset('test.jpg');
    expect(url).toContain('/projects/1/assets/test.jpg');
  });
});