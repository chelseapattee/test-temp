import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'loading-page',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-container">
      <div class="loading-content">
        <h1>Loading</h1>
        <div class="spinner">
          <svg class="cube" width="350" height="200" viewBox="0 0 350 200">
            <path class="lt" d="M 100 50 L 50 100 L 100 150"></path>
            <path class="slash" d="M 150 175 L 200 25"></path>
            <path class="gt" d="M 250 50 L 300 100 L 250 150"></path>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #111;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loading-content {
      text-align: center;
    }

    h1 {
      color: white;
      font-size: 24px;
      margin-bottom: 20px;
      opacity: 0.8;
    }

    .spinner {
      position: relative;
      width: 350px;
      height: 200px;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    path {
      fill: none;
      stroke: whitesmoke;
      stroke-width: 20;
      transform-origin: center center;
    }

    .lt {
      animation: lt 1s ease-in-out infinite;
    }

    .slash {
      animation: slash 1s ease-in-out infinite;
    }

    .gt {
      animation: gt 1s ease-in-out infinite;
    }

    @keyframes lt {
      0%, 30% { transform: none; }
      50%, 60% { transform: translateX(-6px); }
      100% { transform: none; }
    }

    @keyframes slash {
      0%, 30% { transform: none; }
      50%, 60% { transform: rotate(-10.868deg); }
      100% { transform: none; }
    }

    @keyframes gt {
      0%, 30% { transform: none; }
      50%, 60% { transform: translateX(6px); }
      100% { transform: none; }
    }
  `]
})
export class LoadingComponent {}