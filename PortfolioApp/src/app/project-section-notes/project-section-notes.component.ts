import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from '../shared/project.model';
import { MarkdownComponent } from 'ngx-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'project-section-notes',
  standalone: true,
  imports: [CommonModule, MarkdownComponent, FlexLayoutModule],
  templateUrl: './project-section-notes.component.html',
  styleUrls: ['./project-section-notes.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectSectionNotesComponent {
  @Input()
  image?: string;
  @Input()
  content?: string;
  @Input()
  overview?: any[];
  constructor() {}

  get paragraphs(): string[] {
    if (this.content) {
      return this.content.trim().replace('\r\n', '\n').split('\n\n') ?? [];
    } else {
      return [];
    }
  }

  get points(): [string, string][] {
      if (this.overview) {
        return this.overview.map(function(point) {
            return [point.title, point.message] as [string, string];
        });
      } else {
        return [];
      }
  }
}
