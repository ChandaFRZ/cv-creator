
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorInterceptor } from './auth/error.interceptor';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AppStoreModule } from './store/app-store.module';
import { NavModule } from './core/nav/nav.module';
import { SharedModule } from './shared/shared.module';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CookieLawModule } from 'angular2-cookie-law';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    AppStoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['cv-creator-webapp.herokuapp.com', 'localhost'],
        blacklistedRoutes: []
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LoggerModule.forRoot({ serverLoggingUrl: environment.baseURL, level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR }),
    NavModule,
    SharedModule,
    DeviceDetectorModule.forRoot(),
    CookieLawModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
