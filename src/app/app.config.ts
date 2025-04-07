import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideMarkdown } from 'ngx-markdown';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { projectReducer } from './store/project.reducer';
import { ProjectEffects } from './store/project.effects';
import { GlobalErrorHandler } from './core/error-handling/global-error-handler';
import { provideMatSnackBar } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideMarkdown({ loader: HttpClient }),
    provideStore({ projects: projectReducer }),
    provideEffects([ProjectEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideMatSnackBar(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};