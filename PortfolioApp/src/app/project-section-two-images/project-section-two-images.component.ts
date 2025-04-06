import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-section-two-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-section-two-images.component.html',
  styleUrls: ['./project-section-two-images.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectSectionTwoImagesComponent {
  @Input()
  header?: string;

  @Input()
  left?: string;

  @Input()
  captionLT?: string;

  @Input()
  right?: string;

  @Input()
  captionRT?: string;

  @Input()
  leftB?: string;

  @Input()
  captionLB?: string;

  @Input()
  rightB?: string;

  @Input()
  captionRB?: string;


  constructor() {}
}
