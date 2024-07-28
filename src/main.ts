import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/utils/auth.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // This includes the HttpClientModule functionality
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ...appConfig.providers // Spread the providers from appConfig if it contains any
  ]
}).catch(err => console.error(err));
