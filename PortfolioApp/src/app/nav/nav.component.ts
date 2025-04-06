import { CommonModule, UpperCasePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Component, ElementRef, HostListener, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app.config';
import { IAppConfig } from '../config/iapp.config';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [UpperCasePipe, FlexLayoutModule, MatButtonModule, CommonModule, MatMenuModule, MatIconModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        // transform: 'translateX(0)',
      })),
      state('hide', style({
        opacity: 0.65,
        // transform: 'translateY(-150%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('800ms ease-out'))
      // transition('hide => show', animate('2000ms linear 1000ms'))
    ])
  ],
  providers: [ProjectService]
})

export class NavComponent {
  menuItems = [
      { link: 'contact', name: 'Contact' }
  ];
  projects: Project[] | undefined;
  Project: Project = <Project>{};
  state = 'show';
  lastScrollTop = 0;
  dir = '';
  showNav = true;

  constructor(
    private _router: Router,
    private projectService: ProjectService,
    public el: ElementRef) {
    this.projectService.getAllProjects().subscribe((projects: Array<Project>) => {
      this.projects = projects;
    });


  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    // const blah = window.

    // scrollDirection = number;
    // console.log('component position ' + componentPosition);
    // console.log('scroll position' + scrollPosition);
    // console.log('scrollY ' + window.scrollY);
    // if (scrollPosition >= componentPosition) {
    //   this.state = 'hide';
    // } else {
    //   this.state = 'show';
    // }

    if (pageYOffset > this.lastScrollTop) {

      this.dir = 'down';
      this.state = 'hide';
      // this.showNav = false;
    } else {
      this.dir = 'up';
      this.state = 'show';
      // this.showNav = true;


    }
    this.lastScrollTop = scrollPosition;
    // console.log('direction' + this.dir);
  }

  get hide(): Boolean {
    return window.location.pathname == '/carousel-test'; // A little hacky :(
  }

  get isProjectDetail(): Boolean {
    return window.location.pathname.startsWith('/projects/'); // A little hacky :(
  }

  get isHome(): Boolean {
    //  console.log('isHome; ' + window.location.pathname == ('/') );

    return window.location.pathname == ('/'); // A little hacky :(
  }

  routeHome(): void {
    this._router.navigate(['']);
  }

  seeProjects(): void {
    this._router.navigate([AppConfig.routes.projects]);
  }

  seeProjectDetails(project: Project): void {
    this._router.navigate([AppConfig.routes.projects + '/' + project.id]);
  }

}
