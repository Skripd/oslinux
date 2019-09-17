import { Component, OnInit, OnDestroy } from '@angular/core';
import { Measurement } from '../.models/measurement.model';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend.service';

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

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  measurementSub: Subscription;
  measurements: Measurement[] = [];

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.measurementSub = this.backend.measurements.subscribe(rs => {
      // console.log(JSON.stringify(rs));
      Object.assign(this.measurements, rs);
    });
    // this.backend.pushCache();
  }

  ngOnDestroy() {
    this.measurementSub.unsubscribe();
  }
}
