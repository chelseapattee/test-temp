import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadProjects } from '../store/project.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FlexLayoutModule],
  template: `
    <div class="content" [class.fade-in]="showContent">
      <div class="div-mark">
        <img src="assets/images/logo-white.svg" alt="Logo">
      </div>
      <div class="div-info">
        <h1 fxShow.gt-sm fxHide.sm fxHide.xs>
          Hello, I'm Chelsea.<br>
          Experience Designer &amp; Product Manager.<br>
          Occasional programmer. Always creative.
        </h1>
        <h1 fxShow.lt-sm fxHide.gt-sm>
          Hello, I'm Chelsea.<br>
          Experience Designer &amp; Product Manager.<br>
          Occasional programmer. Always creative.
        </h1>
        <p fxShow.gt-sm fxHide.sm fxHide.xs>
          I specialize in simplifying the complex, seen in my 
          <a [routerLink]="['/projects']">Projects</a>.
          <br>Feel free to <a [routerLink]="['/contact']">contact me</a> 
          or connect with me on 
          <a href="http://www.linkedin.com/in/chelseapattee">LinkedIn</a>.
        </p>
        <p fxShow.lt-sm fxHide.gt-sm>
          I specialize in simplifying the complex, seen in my 
          <a [routerLink]="['/projects']">Projects</a>.
          <br>Feel free to <a [routerLink]="['/contact']">contact me</a> 
          or connect with me on 
          <a href="http://www.linkedin.com/in/chelseapattee">LinkedIn</a>.
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showContent = false;

  constructor(
    private elementRef: ElementRef,
    private store: Store
  ) {}

  ngOnInit() {
    // Preload projects for faster navigation
    this.store.dispatch(loadProjects());
    
    // Trigger fade-in animation
    setTimeout(() => {
      this.showContent = true;
    }, 100);
    
    this.updateWindow();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateWindow();
  }

  private updateWindow() {
    let height = window.innerHeight - 300;
    if (height % 2 === 1) {
      height++;
    }
  }
}