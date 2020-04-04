import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { join } from 'path';
import { mapKeys, get } from 'lodash';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      typePaths: ['./src/**/*.graphql'],
      path: '/',
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.d.ts'),
        outputAs: 'class',
      },
      debug: false,
      playground: false,
      context: ({ req, connection }) => connection ? { req: connection.context } : { req },
      // subscriptions: { 
    //    onConnect: (connectionParams, websocket, context) => {
    //      let _ = connectionParams;
    //      _ = mapKeys(_, (value: String, key: String) => key.toLowerCase());
    //       const authToken = get(_, ['headers', 'authorization'],  null);
    //       // console.log(authToken);
    //       // console.log(connectionParams);
          
    //       if(!authToken) {
    //         console.log('[GQL] [LOW] No authtoken provided on connect. Throwing 401.');
    //         throw new UnauthorizedException();
    //       }  else {
    //         console.log('[GQL] [LOW] Websocket connection token present. Passing on to Auth Handlers.');
    //         return;
    //       }
    //    },
      // }
    };
  }
}