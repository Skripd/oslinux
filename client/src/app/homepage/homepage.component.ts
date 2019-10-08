import { Component, OnInit, OnDestroy } from '@angular/core';
import { Measurement } from '../.models/measurement.model';
import { Subscription } from 'rxjs';
import { ClrDatagridStateInterface } from '@clr/angular';
import * as _ from 'lodash';
import { Apollo } from 'apollo-angular';
import { QueryCountDTO, QueryPagedDTO } from '../.models/DTOS.model';
import { QUERY_COUNT, QUERY_PAGED } from '../.models/queries';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  measurementSub: Subscription;
  countSub: Subscription;
  measurements: Measurement[] = [];
  total: number;

  firstID: string = null;
  loading = false;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.loading = true;
    this.count();
    // this.queryPaged(20);
  }

  refresh(state: ClrDatagridStateInterface) {
    if (state.page === undefined) {
      return;
    }
    this.setLoading(true);
    if (_.isEmpty(this.measurements)) {
      this.queryPaged(true, null, state.page.from, state.page.size);
    } else {
      this.queryPaged(false, this.firstID, state.page.from, state.page.size);
    }
  }

  count(): void {
    this.apollo.watchQuery({
      query: QUERY_COUNT,
    }).valueChanges.subscribe(({ data }) => {
      const rs = data as QueryCountDTO;
      this.total = rs.measurementsConnection.aggregate.count;
    });
  }

  queryPaged(setLastID: boolean, lastid: string, from?: number, to?: number): void {
    this.apollo.watchQuery({
      query: QUERY_PAGED,
      variables: { before: lastid, from, to }
    }).valueChanges.subscribe(({ data }) => {
      const rs = data as QueryPagedDTO;
      this.setMeasurements(rs.measurements);
      if (setLastID) {
        this.firstID = _.last(rs.measurements).id;
      }
    });
  }

  setLoading(b: boolean) {
    this.loading = b;
  }

  setMeasurements(m: Measurement[]) {
    Object.assign(this.measurements, m);
    this.loading = false;
  }

  ngOnDestroy() {
    // this.measurementSub.unsubscribe();
  }
}
