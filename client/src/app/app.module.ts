import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import localeNL from '@angular/common/locales/en-NL';
import { ChartsModule } from 'ng2-charts';

import { HomepageComponent } from './homepage/homepage.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { HttpClientModule } from '@angular/common/http';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ReversePipe } from './reverse.pipe';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotfoundpageComponent,
    ReversePipe,
    GraphPageComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ChartsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-NL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    // Create an http link:
    const http = httpLink.create({
      uri: 'http://localhost:4466/'
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: `ws://localhost:4466/`,
      options: {
        reconnect: true
      }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      ws,
      http,
    );

    apollo.create({
      link,
      cache: new InMemoryCache(),
    });

    registerLocaleData(localeNL);
  }
}
