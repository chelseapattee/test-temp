import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatIconModule, MatButtonModule],
  template: `
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="container-inner" fxLayout="column" fxLayoutAlign="center center">
        <h1>{{'{contact}'}} <span>me</span>.</h1>
        <nav>
          <ul>
            <li>
              <a href="mailto:chelseapattee@gmail.com" 
                 aria-label="Email me">
                <i class="icon-mail"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/chelseapattee/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 aria-label="LinkedIn Profile">
                <i class="icon-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/electricalbananas/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 aria-label="Instagram Profile">
                <i class="icon-instagrem"></i>
              </a>
            </li>
            <li>
              <a href="https://www.behance.net/chelseapattee" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 aria-label="Behance Profile">
                <i class="icon-behance"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .container {
      height: 100vh;
      padding: 0 20px;
    }

    .container-inner {
      text-align: center;
      transform: translateY(-5%);
    }

    h1 {
      font-size: 48px;
      font-weight: 300;
      letter-spacing: 0.1618em;
      line-height: 2.618em;
      margin-bottom: 30px;
      cursor: default;

      span {
        color: #2ecc71;
      }
    }

    nav {
      text-align: center;
    }

    ul {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      border-right: 1px solid #ddd;
      padding: 5px 7px 5px 5px;

      &:last-child {
        border-right: none;
      }
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      text-decoration: none;
      color: #111;
      font-size: 24px;
      transition: background-color 0.15s ease-in-out;
      border-radius: 50%;

      &:hover {
        background-color: #2ecc71;
        color: white;
      }

      &:active {
        background-color: darken(#2ecc71, 10%);
      }
    }

    @media (max-width: 600px) {
      h1 {
        font-size: 36px;
      }

      a {
        width: 48px;
        height: 48px;
        font-size: 20px;
      }
    }
  `]
})
export class ContactComponent {}