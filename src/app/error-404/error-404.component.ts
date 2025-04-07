import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'error-404',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <div class="error-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <img src="assets/images/404.gif" alt="404 Error Animation">
      <p class="message">May the force be with you</p>
      <button mat-raised-button color="primary" routerLink="/">
        Return Home
      </button>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      text-align: center;
      background: #f5f5f5;
    }

    h1 {
      font-size: 72px;
      margin: 0;
      color: #333;
      font-weight: bold;
    }

    p {
      font-size: 24px;
      color: #666;
      margin: 20px 0;
    }

    img {
      max-width: 100%;
      height: auto;
      margin: 40px 0;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .message {
      font-style: italic;
      color: #888;
    }

    button {
      margin-top: 20px;
      padding: 10px 30px;
      font-size: 18px;
    }

    @media (max-width: 600px) {
      h1 {
        font-size: 48px;
      }

      p {
        font-size: 18px;
      }

      img {
        margin: 20px 0;
      }
    }
  `]
})
export class Error404Component {}