import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'project-section-image-full',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './project-section-image-full.component.html',
  styleUrls: ['./project-section-image-full.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectSectionImageFullComponent {
  @Input()
  image?: String;
  @Input()
  content?: String;
  @Input()
  header?: string;
  constructor() {}

  public get isVideo(): boolean {
    return this.image ? this.image.endsWith('.mp4') : false;
  }
}
