import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'project-section-notes',
  standalone: true,
  imports: [CommonModule, MarkdownComponent, FlexLayoutModule],
  template: `
    <dl class="project-notes">
      <div *ngFor="let point of points; let last = last; trackBy: trackByFn">
        <dt class="h6">{{point[0]}}</dt>
        <dd [class.no-margin]="last">{{point[1]}}</dd>
      </div>
    </dl>

    <section class="container bg-white">
      <div class="centered_copy_block wysiwyg">
        <markdown [src]="content"></markdown>
      </div>
    </section>

    <section *ngIf="image"
      fxLayout="row"
      fxLayoutAlign="center center"
      class="container bg-white">
      <figure fxFlex="60" fxFlex.xs="100">
        <img [src]="image" [alt]="'Project image'" loading="lazy">
      </figure>
    </section>
  `,
  styleUrls: ['./project-section-notes.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectSectionNotesComponent {
  @Input() image?: string;
  @Input() content?: string;
  @Input() overview?: any[];

  get points(): [string, string][] {
    if (!this.overview) return [];
    return this.overview.map(point => [point.title, point.message] as [string, string]);
  }

  trackByFn(index: number, item: [string, string]): string {
    return item[0];
  }
}