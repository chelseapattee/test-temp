import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-section-two-images',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container">
      <div class="two-image-columns bg-white">
        <h3 *ngIf="header" class="project-section--header">{{header}}</h3>
        
        <div class="image-row">
          <figure class="half">
            <p *ngIf="captionLT" class="caption">{{captionLT}}</p>
            <img [src]="left" [alt]="captionLT || 'Left image'" loading="lazy">
          </figure>

          <figure class="half">
            <p *ngIf="captionRT" class="caption">{{captionRT}}</p>
            <img [src]="right" [alt]="captionRT || 'Right image'" loading="lazy">
          </figure>
        </div>

        <div *ngIf="leftB" class="image-row">
          <figure class="half">
            <p *ngIf="captionLB" class="caption">{{captionLB}}</p>
            <img [src]="leftB" [alt]="captionLB || 'Bottom left image'" loading="lazy">
          </figure>

          <figure class="half">
            <p *ngIf="captionRB" class="caption">{{captionRB}}</p>
            <img [src]="rightB" [alt]="captionRB || 'Bottom right image'" loading="lazy">
          </figure>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .container {
      padding: 2em;
      max-width: 1200px;
      margin: 0 auto;
    }

    .two-image-columns {
      text-align: center;
    }

    .image-row {
      display: flex;
      flex-direction: column;
      gap: 2em;
      margin: 2em 0;
    }

    .half {
      flex: 1;
      margin: 0;

      img {
        width: 100%;
        height: auto;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    }

    .caption {
      margin: 1em 0;
      color: #666;
      font-style: italic;
    }

    .project-section--header {
      margin-bottom: 1em;
      color: #333;
    }

    @media (min-width: 768px) {
      .image-row {
        flex-direction: row;
        gap: 2em;
      }

      .half {
        &:first-child {
          padding-right: 1em;
        }

        &:last-child {
          padding-left: 1em;
        }
      }
    }
  `]
})
export class ProjectSectionTwoImagesComponent {
  @Input() header?: string;
  @Input() left?: string;
  @Input() captionLT?: string;
  @Input() right?: string;
  @Input() captionRT?: string;
  @Input() leftB?: string;
  @Input() captionLB?: string;
  @Input() rightB?: string;
  @Input() captionRB?: string;
}