import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FlexLayoutModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.updateWindow();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindow();
  }

  private updateWindow() {
    let height = window.innerHeight - 300;
    if (height % 2 === 1) {
        height++;
    }
  }

}
