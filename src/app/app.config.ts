import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tokenInterceptor } from './token.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
};
