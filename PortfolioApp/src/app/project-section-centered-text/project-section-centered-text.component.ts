import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'project-section-centered-text',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './project-section-centered-text.component.html',
  styleUrls: ['./project-section-centered-text.component.scss', '../project-detail/section-style-common.scss']
})

export class ProjectSectionCenteredTextComponent {
  @Input()
  content?: string;
  constructor() {}
}
