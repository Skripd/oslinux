import { Injectable } from '@angular/core';
import { Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class SubscriptionMeasurementsService extends Subscription {
    document = gql`
    subscription {
        measurement {
            node {
                id
                createdAt
                value
            }
        }
    }
  `;
}
