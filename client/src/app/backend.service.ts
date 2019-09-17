import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Measurement } from './.models/measurement.model';
import gql from 'graphql-tag';
import { Subscription, BehaviorSubject } from 'rxjs';

const MEASUREMENT_SUBSCRIPTION = gql`
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

const MEASUREMENTS_QUERY = gql`
{
  measurements {
    id
    createdAt
    value
    }
  }
`;

interface SubDTO {
  measurement: {
    node: {
      id: string;
      createdAt: Date;
      value: number;
    }
  };
}

interface InitDTO {
  measurements: Measurement[];
}
/**
 * This service has been rewritten to accomodate pipes better.
 * Object.Assign is used to leverage better use of being able to use Pure Pipes. Pure pipes have better performance by definition.
 *
 * If datasets grow into the tens-of-thousands of records this service might require an update to handle information caching better.
 * The dataSet gets replicated to different subscribers which can lead to memory issues.
 * A 10MB dataset replication is performant enough for now.
 */
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private _measurements = new BehaviorSubject<Measurement[]>([]);
  private dataStore: { measurements: Measurement[] } = { measurements: [] };
  readonly measurements = this._measurements.asObservable();

  initialData: Subscription;


  constructor(private apollo: Apollo) {

    this.initialData = this.apollo.watchQuery({
      query: MEASUREMENTS_QUERY,
    }).valueChanges.subscribe(result => {
      const _in = result.data as InitDTO;
      if (result.errors) {
        console.error(`ERROR IN BACKEND SERVICE\n\n${result.errors}`);
      } else {
        // console.log('cache grab');
        this.dataStore.measurements = _in.measurements;
        this._measurements.next(Object.assign({}, this.dataStore).measurements);
      }
      this.initialData.unsubscribe();
    });

    this.apollo.subscribe({
      query: MEASUREMENT_SUBSCRIPTION
    }).subscribe(({ data }) => {
      const _in = data as SubDTO;
      // this.measurements.push(_in.measurement.node as Measurement);
      this.dataStore.measurements.push(_in.measurement.node as Measurement);
      this._measurements.next(Object.assign({}, this.dataStore).measurements);
    });
  }

  pushCache(): void {
    return this._measurements.next(Object.assign({}, this.dataStore).measurements);
  }

  // get measurements() {
  //   return this._measurements.asObservable();
  // }
}
