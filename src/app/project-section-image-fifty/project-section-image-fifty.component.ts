import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-section-image-fifty',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container bg-white">
      <h3 *ngIf="header" class="project-section--header">{{header}}</h3>
      <figure class="image-fifty">
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

    .image-fifty {
      width: 100%;
      max-width: 600px;
      margin: 2em auto;

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
export class ProjectSectionImageFiftyComponent {
  @Input() image?: string;
  @Input() header?: string;
}