import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="spinner-container" *ngIf="loading">
      <mat-progress-spinner
        mode="indeterminate"
        diameter="50">
      </mat-progress-spinner>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() loading = false;
}