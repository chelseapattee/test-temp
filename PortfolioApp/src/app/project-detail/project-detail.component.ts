import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit, } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
// import * as AOS from 'aos';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NgsScrollReveal } from 'ngx-scrollreveal/services';
// import { NgsRevealModule } from 'ng-scrollreveal';
import { ScrollFadeInOutService } from '../shared/scroll-fade-in-out.service';
import { ScrollTopService } from '../shared/scroll-top.service';
import { NgsRevealConfig } from 'ng-scrollreveal';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ProjectHeaderComponent } from '../project-header/project-header.component';
import { ProjectSectionNotesComponent } from '../project-section-notes/project-section-notes.component';
import { ProjectSectionCenteredQuoteComponent } from '../project-section-centered-quote/project-section-centered-quote.component';
import { ProjectCalloutComponent } from '../project-callout/project-callout.component';
import { ProjectSectionCenteredTextComponent } from '../project-section-centered-text/project-section-centered-text.component';
import { ProjectSectionTwoImagesComponent } from '../project-section-two-images/project-section-two-images.component';
import { ProjectSectionImageTextComponent } from '../project-section-image-text/project-section-image-text.component';
import { ProjectSectionImageFullComponent } from '../project-section-image-full/project-section-image-full.component';
import { ProjectSectionImageFiftyComponent } from '../project-section-image-fifty/project-section-image-fifty.component';
import { ProjectSectionImageTextRightComponent } from '../project-section-image-text-right/project-section-image-text-right.component';

@Component({
  selector: 'project-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    // NgsRevealModule,
    ProjectHeaderComponent, 
    ProjectSectionNotesComponent, 
    ProjectSectionCenteredQuoteComponent, 
    ProjectCalloutComponent, 
    ProjectSectionCenteredTextComponent,
    ProjectSectionTwoImagesComponent,
    ProjectSectionImageTextComponent,
    ProjectSectionImageFullComponent,
    ProjectSectionImageFiftyComponent,
    ProjectSectionImageTextRightComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
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
  providers: [ProjectService, ScrollTopService, NgsRevealConfig]
})
export class ProjectDetailComponent implements OnInit {
  project!: Project;
  related?: Project[];
  type: any;


  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private ScrollTopService: ScrollTopService,
    private elRef: ElementRef,
    private scrollFadeService: ScrollFadeInOutService,
    // private ngsScrollReveal: NgsScrollReveal,
    // private aos: Aos,
    // private aosConfig: NgsScrollReveal,
    // private aosConfig2: NgsScrollReveal,
    config: NgsRevealConfig) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['id']) {
        this.projectService.getProjectById(params['id']).subscribe((project: Project) => {
          this.project = project;
          console.log('this is the project:' + project);
        });

        this.projectService.getAllProjects().subscribe((projects: Project[]) => {
          this.related = projects.filter(function (project) { return project.id != params['id']; }).slice(0, 3);
        });
      }
    });
    // customize default values of ng-scrollreveal directives used by this component tree
    //  config.duration = 500;
    //  config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    //  config.reset = true;
     config.viewFactor = 0.2;

    // test defaults
    config.origin = 'bottom';

    // Can be any valid CSS distance, e.g. '5rem', '10%', '20vw', etc.
    config.distance = '10px';

    // Time in milliseconds.
    // config.duration = 1e3;
    config.duration = 1000;
    config.delay = 100;

    // Starting angles in degrees, will transition from these values to 0 in all axes.
    config.rotate = { x: 0, y: 0, z: 0 };

    // Starting opacity value, before transitioning to the computed opacity.
    // config.opacity = 0;

    // Starting scale value, will transition from this value to 1
    config.scale = 1;

    // Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
    //  config.easing = 'cubic-bezier(0.6, 0.2, 0.1, 1)';
    // config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    config.easing = 'ease-in-out';



    // `<html>` is the default reveal container. You can pass either:
    // DOM Node, e.g. document.querySelector('.fooContainer')
    // Selector, e.g. '.fooContainer'
    // config.container = window.document.querySelector('experiment');

    // true/false to control reveal animations on mobile.
    config.mobile = true;

    // true:  reveals occur every time elements become visible
    // false: reveals occur once as elements become visible
    config.reset = true;

    // 'always' — delay for all reveal animations
    // 'once'   — delay only the first time reveals occur
    // 'onload' - delay only for animations triggered by first load
    config.useDelay = 'always';

    // Change when an element is considered in the viewport. The default value
    // of 0.20 means 20% of an element must be visible for its reveal to occur.
    //  config.viewFactor = 0.99;
    config.viewFactor = 0.20;

    // Pixel values that alter the container boundaries.
    // e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
    // --
    // Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png
    //  config.viewOffset = { top: -200, right: 0, bottom: 200, left: 0 };
    //  config.viewOffset = { top: -200, right: 0, bottom: 200, left: 0 };
    config.viewOffset = { top: -58, right: 0, bottom: 58, left: 0 };
    //  config.viewOffset = { top: 65, right: 0, bottom: 200, left: 0 };

    // other options here
  }

  
  asset(name?: string): string | null {
    return name == null ? null : 'http://' + window.location.hostname + ':5081/projects/' + this.project.id + '/assets/' + name.replaceAll('@', '');
  }

  headerURL(project: Project): string {
    return Project.headerURL(project);
  }

  thumbnailURL(project: Project): string {
    return Project.thumbnailURL(project);
  }

  ngOnInit() {
    // console.log('ngOnInit called.');
    // setTimeout(function() {
    // console.log('In ngAfterViewInit before setinterval called.');
    
    // AOS.init();

    // call service
    this.ScrollTopService.setScrollTop();

    ScrollReveal().reveal('.item', {
      duration: 1000,
      delay: 100,
      distance: '10px',
      easing: 'ease-in-out'
    });
    
    //  }, 1000);
    // this.ScrollTopService.setScrollTop();
    // Aos.refresh();
    // Aos.refreshHard();
    // Aos.init({
    //   duration: 1000, // Animation duration
    //   easing: 'ease-in-out', // Easing function
    //   once: false // Whether animation should happen only once
    // });
    // this.ngsScrollReveal.reveal('.item', {
  }

  ngAfterViewInit() {
    // Apply the fade effect to a specific element.
    // For example, assume the element has an id of 'fade-element'
    const element = this.elRef.nativeElement.querySelector('#fade-element');
    if (element) {
      this.scrollFadeService.applyFadeInOutOnScroll(element);
    }
  }

  ngOnDestroy() {
    this.scrollFadeService.clearScrollListener();
  }
  
}
