import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProjectCalloutComponent } from '../project-callout/project-callout.component';

@Component({
  selector: 'project-section-centered-quote',
  standalone: true,
  imports: [CommonModule, ProjectCalloutComponent],
  templateUrl: './project-section-centered-quote.component.html',
  styleUrls: ['./project-section-centered-quote.component.scss', '../project-detail/section-style-common.scss']
})
export class ProjectSectionCenteredQuoteComponent {
  @Input()
  content?: string;
  @Input()
  header?: string;
  constructor() {}
}
