import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-section-image-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container bg-white wysiwyg">
      <figure class="image-with-text left">
        <img [src]="image" [alt]="header || 'Project image'" loading="lazy">
        <figcaption>
          <h3 *ngIf="header" class="project-section--header">{{header}}</h3>
          <p *ngFor="let paragraph of paragraphs; trackBy: trackByFn">
            <ng-container *ngIf="isDropCap(paragraph); else normalParagraph">
              <span class="drop-cap">{{getDropCapLetter(paragraph)}}</span>
              {{getRemainingText(paragraph)}}
            </ng-container>
            <ng-template #normalParagraph>
              {{paragraph}}
            </ng-template>
          </p>
          <h5 *ngIf="link">
            <a [href]="link" target="_blank" rel="noopener">{{link}}</a>
          </h5>
        </figcaption>
      </figure>
    </section>
  `,
  styleUrls: ['./project-section-image-text.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectSectionImageTextComponent {
  @Input() image?: string;
  @Input() paragraphs?: string[];
  @Input() link?: string;
  @Input() header?: string;

  isDropCap(text: string): boolean {
    return text.startsWith('~');
  }

  getDropCapLetter(text: string): string {
    return text.charAt(1);
  }

  getRemainingText(text: string): string {
    return text.substring(2);
  }

  trackByFn(index: number): number {
    return index;
  }
}