import { Component, Input } from '@angular/core';
import { Project } from '../shared/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.scss'
})
export class ProjectHeaderComponent {
  @Input()
  project!: Project;
  @Input()
  color!: string;
  constructor() {}

  headerURL(project: Project): string {
      return Project.headerURL(project);
  }

  thumbnailURL(project: Project): string {
      return Project.thumbnailURL(project);
  }
}
