import { Injectable } from '@nestjs/common';
import * as TypedHue from 'typedhue';
import { PrismaService } from 'src/prisma/prisma.service';

import { fetch } from 'cross-fetch';
import * as ws from 'ws'; 

import gql from 'graphql-tag'
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

@Injectable()
export class HueControllerService {

    private USERNAME = null;
    private bridge = null;
    private client = null;

    private CONSTANT_MAX_BRIGHTNESS = 254;
    private CONSTANT_MAX_HUE = 65535;
    private CONSTANT_MAX_SATURATION = 254;
    private CONSTANT_STATE_ID = "5e897aa35764540007f4b18b";

    private STATE_ON = true;
    private STATE_BRIGHTNESS = 0;

    
    private basic = new HttpLink({
        uri: 'http://localhost:4466/',
        fetch: fetch,
    });

    private wsLink = new WebSocketLink({
        uri: 'ws://localhost:4466/',
        options: {
            reconnect: true,
        },
        webSocketImpl: ws
    });

    private bigLink = split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        this.wsLink,
        this.basic,
    );

    private cache = new InMemoryCache();

    constructor() {
        this.setupBridge();
    }
    
    private setupBridge() {
        if (this.USERNAME === null) {
            let b = new TypedHue.Bridge('192.168.178.5:4000', (success, username) => {
                console.log(username);
                this.USERNAME = username;
                Promise.resolve(this.setupBridge());
            });
        } else {
            this.bridge = new TypedHue.Bridge('192.168.178.5:4000', (success) => {
                if (success) {
                    this.setupSubscription();
                    this.setupStateChangeListener();
                }
                
            }, this.USERNAME);
        }
    }

    setupSubscription() {
        console.log('Setting up subscription in hue controller service');
        
        var self = this;
        const client = new ApolloClient({
            cache: this.cache,
            link: this.bigLink,
        }).subscribe({
            query: gql`
              subscription onNewMeasurement {
                  measurement {
                      node {
                          value
                      }
                  }
              }`,
            variables: {}
          }).subscribe({
            next (data) {
              // Notify your application with the new arrived data
                let bridge = new TypedHue.Bridge('192.168.178.5:4000', (success) => {
                    if (success) {
                        bridge.setLightState('1', TypedHue.StateCreator.joinStates([
                            TypedHue.StateCreator.onOffState(data.data.measurement.node.value < 255 ? true : false),
                            TypedHue.StateCreator.setBrightness(
                                (self.CONSTANT_MAX_BRIGHTNESS - data.data.measurement.node.value) < 0 ? 0 : self.CONSTANT_MAX_BRIGHTNESS - data.data.measurement.node.value)
                        ]), () => { })
                    }
                }, self.USERNAME);
            },
            error (err) {
                console.log('some error with subscription in server');
                self.setupSubscription();
                return;
            },
            complete() {
                console.log('LOL how can this complete');
            },
            start(sub) {
                console.log('started?', sub);
            }
          });
    }

    private setupStateChangeListener() {
        console.log('Setting up subscription in hue controller service');
        
        var self = this;
        const client = new ApolloClient({
            cache: this.cache,
            link: this.bigLink,
        }).subscribe({
            query: gql`
                subscription {
                    userState(where: {
                        updatedFields_contains_some: ["h", "s", "v", "on"]
                }) {
                    node {
                        on
                        h
                        s
                        v
                    }
                }
            }`,
            variables: {}
          }).subscribe({
            next (data) {
              // Notify your application with the new arrived data
            //   console.log(JSON.stringify(data));
              
                let bridge = new TypedHue.Bridge('192.168.178.5:4000', (success) => {
                    if (success) {
                        bridge.setLightState('1', TypedHue.StateCreator.joinStates([
                            TypedHue.StateCreator.setHue(data.data.userState.node.h),
                            TypedHue.StateCreator.setSaturation(data.data.userState.node.s),
                            // TypedHue.StateCreator.setBrightness(data.data.userState.node.v),
                        ]), () => { console.log('server set new userstate'); })
                    }
                }, self.USERNAME);
            },
            error (err) {
                console.log('some error with subscription in server');
                self.setupStateChangeListener();
                return;
            },
            complete() {
                console.log('LOL how can this complete');
            },
            start(sub) {
                console.log('started?', sub);
            }
          });
    }
}
