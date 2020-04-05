import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';

import { KeycloakService } from 'keycloak-angular';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { CommonModule } from '@angular/common';

const uri = 'http://localhost:3000/graphql';

@NgModule({
  exports: [
    CommonModule,
  ],
})
export class GraphQLModule {

  constructor(
    private kcService: KeycloakService,
    private apollo: Apollo,
    private http: HttpLink,
  ) {
    this.setup();
  }

  private checklogin() {
    this.kcService.isLoggedIn().then((loggedin) => {
      if (loggedin) {
        console.log('[GRAPHQL MODULE] [INIT] Logged in initializing up module.');
        this.setup();
      } else {
        console.log('[GRAPHQL MODULE] [INIT] Not logged in sleeping for 100ms');
        setTimeout(() => {
          this.checklogin();
          return;
        }, 100);
      }
    });
  }

  private setup() {

    const basic = this.http.create({
      uri
    });

    const auth = setContext(async (_, { headers }) => {
      const token = await this.kcService.getToken();

      return {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
    });

    // Error handling for GraphQL client
    // const error = onError(({ graphQLErrors, networkError }) => {
    //   if (graphQLErrors) {
    //     graphQLErrors.map(({ message, locations, path }) => {
    //       const ua = JSON.parse(JSON.stringify(message));
    //       if (ua.statusCode) {
    //         switch (ua.statusCode) {
    //           case 401: this.alert.addAlert('You are not authenticated reload this page', 'danger');
    //                     break;
    //           case 403: this.alert.addAlert('You do not have permission to access this', 'danger');
    //                     break;
    //           default: console.log('[GraphQL Error Handler] [StatusCode Unhandled Error] message:', ua);
    //                    break;
    //         }
    //       }
    //     });
    //   }

    //   if (networkError) { console.log(`[Network error]: ${networkError}`); }
    // });

    // Create a WebSocket link
    const ws = new WebSocketLink({
      uri: `ws://localhost:4466/`,
      options: {
        reconnect: true,
        connectionParams: async () => {
          const token = await this.kcService.getToken();

          return {
            isWebSocket: true,
            headers: {
              authorization: `Bearer ${token}`,
            }
          };
        },
        // connectionCallback: (error, result) => {
        //   if(error) {
        //     console.log('[ERROR] [WSLINK]::', error);
        //   } else if(result) {
        //     console.log('[WSLINK]::', result);
        //   }
        // },
        // lazy: true
      },
    });

    const link = auth.concat(basic);
    const wsLink = ws;
    const linkWithWebsocket = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      link,
    );
    const cache = new InMemoryCache();

    this.apollo.create({
      link: linkWithWebsocket,
      cache
    });
  }
}
