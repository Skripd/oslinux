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

const MEASUREMENT_COUNT = gql`
query {
  measurementsConnection {
    aggregate {
      count
    }
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

interface PageDTO {
  measurements: Measurement[];
}

interface InitDTO {
  measurements: Measurement[];
}

interface CountDTO {
  measurementsConnection: {
    aggregate: {
      count: number;
    }
  };
}


/**
 * This service has been rewritten to accomodate pipes better.
 * Object.Assign is used to leverage better use of being able to use Pure Pipes. Pure pipes have better performance.
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
  private _measurementsPaged = new BehaviorSubject<Measurement[]>([]);
  private _measurementCount = new BehaviorSubject<number>(0);

  private dataStore: {
    measurements: Measurement[],
    paged: Measurement[],
    count: number,
   } = { measurements: [], paged: [], count: 0 };

  readonly measurements = this._measurements.asObservable();
  readonly pagedMeasurements = this._measurementsPaged.asObservable();
  readonly count = this._measurementCount.asObservable();

  private initialData$: Subscription;
  private liveData$: Subscription;
  private pagedData$: Subscription;
  private count$: Subscription;


  constructor(private apollo: Apollo) {

    this.initialData$ = this.apollo.watchQuery({
      query: MEASUREMENTS_QUERY,
    }).valueChanges.subscribe(result => {
      const _in = result.data as InitDTO;
      // console.log(`BACKEND::${_in.measurementsConnection.aggregate.count}`);
      if (result.errors) {
        console.error(`ERROR IN BACKEND SERVICE\n\n${result.errors}`);
      } else {
        this.dataStore.measurements = _in.measurements;
        this._measurements.next(Object.assign({}, this.dataStore).measurements);
      }
      this.initialData$.unsubscribe();
    });

    this.liveData$ = this.apollo.subscribe({
      query: MEASUREMENT_SUBSCRIPTION
    }).subscribe(({ data }) => {
      const _in = data as SubDTO;
      this.dataStore.measurements.push(_in.measurement.node as Measurement);
      this._measurements.next(Object.assign({}, this.dataStore).measurements);
    });

    this.doCount();
  }

  pushCache(): void {
    return this._measurements.next(Object.assign({}, this.dataStore).measurements);
  }

  doCount(): void {
    this.count$ = this.apollo.subscribe({
      query: MEASUREMENT_COUNT
    }).subscribe(({ data }) => {
      const _in = data as CountDTO;
      this.dataStore.count = _in.measurementsConnection.aggregate.count;
      this._measurementCount.next(Object.assign({}, this.dataStore).count);
    });
  }

  // live(): Observable<Measurement[]> {
  //   const ob = new Observable<Measurement[]>(() => {
  //     this.dataStore.measurements.slice(this.dataStore.measurements.length - 60);
  //   });
  //   return ob;
  // }

  // get measurements() {
  //   return this._measurements.asObservable();
  // }
}
