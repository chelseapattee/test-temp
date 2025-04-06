import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';

@Injectable()
export class ScrollTopService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  setScrollTop() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
     ).subscribe((event: NavigationEnd) => {
        setTimeout(function() {
          console.log('scroll-top.service.ts: In ngAfterViewInit before setinterval called.');
          // call service
          window.scroll(0, 0);
         }, 0);
      });
    }
  }
}
