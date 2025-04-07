import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'project-section-centered-text',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  template: `
    <section class="container bg-white">
      <div class="centered-text wysiwyg">
        <markdown [src]="content"></markdown>
      </div>
    </section>
  `,
  styles: [`
    .container {
      padding: 2em;
      max-width: 1200px;
      margin: 0 auto;
    }

    .centered-text {
      max-width: 800px;
      margin: 0 auto;
      padding: 2em 0;

      ::ng-deep {
        p {
          line-height: 1.6;
          margin-bottom: 1.5em;
          color: #333;
        }

        h1, h2, h3, h4, h5, h6 {
          margin: 1.5em 0 1em;
          color: #333;
        }
      }
    }
  `]
})
export class ProjectSectionCenteredTextComponent {
  @Input() content?: string;
}