import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from '../shared/project.model';

@Component({
  selector: 'project-callout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-callout.component.html',
  styleUrls: ['./project-callout.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectCalloutComponent {
  @Input()
  projects?: Project[];
  constructor() {}

  headerURL(project: Project): string {
      return Project.headerURL(project);
  }

  thumbnailURL(project: Project): string {
      return Project.thumbnailURL(project);
  }
}
