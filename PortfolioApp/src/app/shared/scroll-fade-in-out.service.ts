import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollFadeInOutService implements OnDestroy {
    private scrollListener: (() => void) | null = null;

  constructor() {}

  /**
   * Attaches a scroll listener to update the opacity of the provided element based on its position.
   * @param element The HTMLElement to apply the fade effect.
   */
  public applyFadeInOutOnScroll(element: HTMLElement): void {
    // Set the transition style for the element.
    element.style.transition = 'opacity 0.5s ease-in-out';

    // Debounce function to limit the rate at which the scroll handler is called.
    const debounce = (func: () => void, delay: number): () => void => {
      let timeoutId: any;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
      };
    };

    // Calculates the opacity based on the element's position relative to the viewport.
    const calculateOpacity = (): number => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      if (rect.bottom < 0 || rect.top > windowHeight) {
        return 0;
      } else if (rect.top <= windowHeight && rect.bottom >= 0) {
        const visibleHeight = Math.min(
          elementHeight,
          Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
        );
        const startFading = elementHeight / 3;
        if (visibleHeight <= startFading) {
          return visibleHeight / startFading;
        } else if (visibleHeight >= elementHeight - startFading) {
          return (elementHeight - visibleHeight) / startFading;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    };

    // Create a debounced scroll event listener.
    const onScroll = debounce(() => {
      const opacity = calculateOpacity();
      element.style.opacity = opacity.toString();
    }, 20);

    // Attach the scroll event listener.
    window.addEventListener('scroll', onScroll);
    // Save a function to remove the listener when needed.
    this.scrollListener = () => window.removeEventListener('scroll', onScroll);
  }

  /**
   * Removes the scroll listener if it has been set.
   */
  public clearScrollListener(): void {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = null;
    }
  }

  ngOnDestroy(): void {
    this.clearScrollListener();
  }
}