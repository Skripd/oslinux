import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';

import * as _ from 'lodash';
import { Measurement } from '../_models/measurement.model';
import { GetMeasurementCountGQL, GetPageGQL } from '../generated/graphql';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  measurements: Measurement[] = [];
  total: number;

  firstID: string = null;
  loading = false;

  constructor(
    private readonly getCountService: GetMeasurementCountGQL,
    private readonly getPagedService: GetPageGQL
  ) { }

  ngOnInit() {
    this.loading = true;
    this.count();
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
    const self = this;
    this.getCountService.fetch().subscribe({
      next(rs) {
        self.total = rs.data.measurementsConnection.aggregate.count;
      },
      error(err) {
        console.error('Some error getting count. No handling yet.', err);
      },
      complete() {
        console.log('Completed count query');
      }
    });
  }

  queryPaged(setLastID: boolean, lastid: string, from?: number, to?: number): void {
    console.log(setLastID, lastid, from, to);

    const self = this;
    this.getPagedService.fetch({
      before: lastid,
      from,
      to
    }).subscribe({
      next(rs) {
        self.setMeasurements(rs.data.measurements);
        if(setLastID) {
          self.firstID = _.last(rs.data.measurements).id;
        }
      },
      error(err) {
        console.error('No error handling. Something with paged loading', err);
      },
      complete() {
        console.log('Completed loading a page.');
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
