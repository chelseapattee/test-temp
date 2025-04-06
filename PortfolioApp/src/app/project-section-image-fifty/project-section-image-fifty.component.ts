import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-section-image-fifty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-section-image-fifty.component.html',
  styleUrls: ['./project-section-image-fifty.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectSectionImageFiftyComponent {
  @Input()
  image?: String;
  @Input()
  header?: string;
  constructor() {}
}
