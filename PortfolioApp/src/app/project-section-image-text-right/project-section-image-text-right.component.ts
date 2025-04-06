import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'project-section-image-text-right',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './project-section-image-text-right.component.html',
  styleUrls: ['./project-section-image-text-right.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectSectionImageTextRightComponent {
  @Input()
  image?: String;
  @Input()
  content?: String;
  @Input()
  link?: string;
  @Input()
  header?: string;
  constructor() {}
  paragraphs?: string[];
}
