import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ApplicationRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ColorPickerModule } from 'ngx-color-picker';

import localeNL from '@angular/common/locales/en-NL';
import { ChartsModule } from 'ng2-charts';

import { HomepageComponent } from './homepage/homepage.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloModule } from 'apollo-angular';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ReversePipe } from './reverse.pipe';
import { LoaderHackForApolloComponent } from './loader-hack-for-apollo/loader-hack-for-apollo.component';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotfoundpageComponent,
    GraphPageComponent,
    LineChartComponent,
    ReversePipe,
    LoaderHackForApolloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    HttpLinkModule,
    ApolloModule,
    ClarityModule,
    BrowserAnimationsModule,
    ChartsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-NL' },
    {
      provide: KeycloakService,
      useValue: keycloakService
    },
  ],
  entryComponents: [AppComponent],
})
export class AppModule {
  // Defer bootstrapping until keycloak has initialized.
  ngDoBootstrap(appRef: ApplicationRef) {
    registerLocaleData(localeNL);
    keycloakService
      .init({
        initOptions: {
          onLoad: 'check-sso',
          enableLogging: true,
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
        },
        config: {
          clientId: 'oslinux-client',
          realm: 'oslinux',
          url: 'http://localhost:8080/auth',
        }
      })
      .then((loggedin) => {
        console.log(`[NgDoBootstrap] Keycloak initialized Bootstrapping App`);
        loggedin ? appRef.bootstrap(AppComponent) : keycloakService.login({
          redirectUri: window.location.origin + '/',
        });
      })
      .catch(error => console.error(`[NgDoBootstrap] Keycloak Initializer Failed`, error));
  }
}
