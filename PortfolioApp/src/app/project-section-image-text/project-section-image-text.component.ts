import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-section-image-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-section-image-text.component.html',
  styleUrls: ['./project-section-image-text.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectSectionImageTextComponent {
  @Input()
  image?: String;
  @Input()
  paragraphs?: string[];
  @Input()
  link?: string;

  @Input()
  header?: string;
  constructor() {}
}
