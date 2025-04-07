import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'project-section-image-full',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  template: `
    <section class="container bg-white">
      <h3 *ngIf="header" class="project-section--header">{{header}}</h3>
      <markdown *ngIf="content" [src]="content"></markdown>
      <figure class="image-full">
        <ng-container *ngIf="!isVideo; else videoTemplate">
          <img [src]="image" [alt]="header || 'Project image'" loading="lazy">
        </ng-container>
        <ng-template #videoTemplate>
          <video autoplay loop muted controls>
            <source [src]="image" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </ng-template>
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

    .image-full {
      width: 100%;
      margin: 2em auto;

      img, video {
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

    ::ng-deep markdown {
      max-width: 800px;
      margin: 0 auto 2em;
      text-align: left;

      p {
        line-height: 1.6;
        margin-bottom: 1em;
      }
    }
  `]
})
export class ProjectSectionImageFullComponent {
  @Input() image?: string;
  @Input() content?: string;
  @Input() header?: string;

  get isVideo(): boolean {
    return this.image?.endsWith('.mp4') ?? false;
  }
}