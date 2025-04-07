import { CommonModule, UpperCasePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConfig } from '../config/app.config';
import { Project } from '../shared/project.model';
import { selectAllProjects } from '../store/project.selectors';
import { selectProject } from '../store/project.actions';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    UpperCasePipe,
    FlexLayoutModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <header [class.hidden]="state === 'hide'" [class.transparent]="isHome">
      <nav *ngIf="!isHome">
        <div fxFlex fxLayout="row" fxLayoutAlign="center center">
          <div fxFlex class="home-link" (click)="routeHome()">
            <h1 id="glow" class="navbar-brand">
              <img src="assets/images/logo-white.svg" alt="Logo">
              <span fxHide.xs>CHELSEA PATTEE</span>
            </h1>
          </div>

          <div *ngIf="!isProjectDetail" fxFlex class="text-right">
            <button mat-button fxShow fxHide.xs (click)="seeProjects()">
              PROJECTS
            </button>
            <a mat-button fxShow fxHide.xs *ngFor="let item of menuItems" [routerLink]="item.link">
              {{item.name | uppercase}}
            </a>
            <button fxShow.xs fxHide.gt-xs mat-icon-button [matMenuTriggerFor]="mainMenu">
              <mat-icon>menu</mat-icon>
            </button>
          </div>

          <div *ngIf="isProjectDetail" fxFlex class="text-right">
            <button mat-button (click)="seeProjects()">PROJECTS</button>
            <button mat-icon-button [matMenuTriggerFor]="projectMenu">
              <mat-icon>keyboard_arrow_down</mat-icon>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <mat-menu #mainMenu="matMenu">
      <button mat-menu-item (click)="seeProjects()">PROJECTS</button>
      <button *ngFor="let item of menuItems" mat-menu-item [routerLink]="item.link">
        {{item.name | uppercase}}
      </button>
    </mat-menu>

    <mat-menu #projectMenu="matMenu">
      <button *ngFor="let project of projects$ | async" mat-menu-item (click)="seeProjectDetails(project)">
        {{project.title}}
      </button>
    </mat-menu>
  `,
  styles: [`
    :host {
      display: block;
    }

    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
      background: #191616;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

      &.hidden {
        transform: translateY(-100%);
      }

      &.transparent {
        background: transparent;
      }
    }

    nav {
      padding: 10px 16px;
      display: flex;
      align-items: center;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      color: #E9E9E9;
      font-size: 10px;
      letter-spacing: 1px;
      font-weight: 600;
      margin: 0;
      line-height: 25px;
      cursor: pointer;
      transition: all 0.25s ease-in-out;

      img {
        width: 25px;
        height: auto;
        margin-right: 15px;
      }

      &:hover {
        letter-spacing: 2px;
      }
    }

    .text-right {
      text-align: right;
    }

    button.mat-mdc-button,
    a.mat-mdc-button {
      margin-right: 0.5em;
      color: #c3c3c3;
      font-size: 10px;
      letter-spacing: 1px;
      font-weight: 600;
      text-transform: uppercase;

      &:hover {
        color: white;
      }
    }

    @media (max-width: 599px) {
      nav {
        padding: 1em 2em 0;
      }
    }
  `]
})
export class NavComponent implements OnInit, OnDestroy {
  menuItems = [{ link: 'contact', name: 'Contact' }];
  projects$: Observable<Project[]>;
  state = 'show';
  lastScrollTop = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store,
    private el: ElementRef
  ) {
    this.projects$ = this.store.select(selectAllProjects);
  }

  ngOnInit() {
    this.projects$.pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > this.lastScrollTop) {
      this.state = 'hide';
    } else {
      this.state = 'show';
    }
    this.lastScrollTop = scrollPosition;
  }

  get isProjectDetail(): boolean {
    return window.location.pathname.startsWith('/projects/');
  }

  get isHome(): boolean {
    return window.location.pathname === '/';
  }

  routeHome(): void {
    this.router.navigate(['']);
  }

  seeProjects(): void {
    this.router.navigate([AppConfig.routes.projects]);
  }

  seeProjectDetails(project: Project): void {
    this.store.dispatch(selectProject({ projectId: project.id! }));
    this.router.navigate([AppConfig.routes.projects + '/' + project.id]);
  }
}