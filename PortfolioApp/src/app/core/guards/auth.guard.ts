import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectSelectedProject } from '../../store/project.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectSelectedProject).pipe(
      map(project => {
        if (!project) {
          this.router.navigate(['/projects']);
          return false;
        }
        return true;
      })
    );
  }
}