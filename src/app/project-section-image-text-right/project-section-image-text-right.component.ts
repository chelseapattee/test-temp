import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'project-section-image-text-right',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  template: `
    <section class="container bg-white wysiwyg">
      <figure class="image-with-text right">
        <img [src]="image" [alt]="header || 'Project image'" loading="lazy">
        <figcaption>
          <h3 *ngIf="header" class="project-section--header">{{header}}</h3>
          <markdown [src]="content"></markdown>
        </figcaption>
      </figure>
    </section>
  `,
  styles: [`
    .container {
      padding: 2em;
      max-width: 1200px;
      margin: 0 auto;
    }

    .image-with-text {
      display: flex;
      flex-direction: column;
      gap: 2em;
      margin: 2em 0;

      img {
        width: 100%;
        height: auto;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      figcaption {
        h3 {
          margin-bottom: 1em;
          color: #333;
        }

        ::ng-deep {
          p {
            margin-bottom: 1em;
            line-height: 1.6;
          }

          a {
            color: #333;
            text-decoration: none;
            border-bottom: 1px solid #333;
            transition: opacity 0.2s ease;

            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }

    @media (min-width: 768px) {
      .image-with-text {
        flex-direction: row;
        align-items: flex-start;

        img {
          width: 57.29%;
        }

        figcaption {
          width: 31.67%;
          margin-right: 11.04%;
        }

        &.right {
          flex-direction: row-reverse;
        }
      }
    }
  `]
})
export class ProjectSectionImageTextRightComponent {
  @Input() image?: string;
  @Input() content?: string;
  @Input() header?: string;
}