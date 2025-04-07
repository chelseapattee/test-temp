import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-section-centered-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container bg-white">
      <h3 *ngIf="header" class="project-section--header">{{header}}</h3>
      <figure class="centered-image">
        <img [src]="image" [alt]="header || 'Project image'" loading="lazy">
      </figure>
    </section>
  `,
  styles: [`
    .container {
      padding: 2em;
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }

    .centered-image {
      margin: 2em auto;
      max-width: 800px;

      img {
        width: 100%;
        height: auto;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    }

    .project-section--header {
      margin-bottom: 1em;
      color: #333;
    }
  `]
})
export class ProjectSectionCenteredImageComponent {
  @Input() header?: string;
  @Input() image?: string;
}