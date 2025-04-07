import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-section-centered-quote',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container bg-white">
      <div class="centered-quote wysiwyg">
        <h3 *ngIf="header" class="project-section--header">{{header}}</h3>
        <blockquote>
          <p>{{content}}</p>
        </blockquote>
      </div>
    </section>
  `,
  styles: [`
    .container {
      padding: 2em;
      max-width: 1200px;
      margin: 0 auto;
    }

    .centered-quote {
      max-width: 800px;
      margin: 0 auto;
      padding: 2em 0;
      text-align: center;
    }

    blockquote {
      font-style: italic;
      font-size: 1.2em;
      line-height: 1.6;
      color: #666;
      margin: 2em 0;
      padding: 0 2em;
      border-left: 4px solid #ddd;
    }

    .project-section--header {
      margin-bottom: 1em;
      color: #333;
    }
  `]
})
export class ProjectSectionCenteredQuoteComponent {
  @Input() content?: string;
  @Input() header?: string;
}