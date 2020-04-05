import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Label, Color, BaseChartDirective } from 'ng2-charts';

import { GetLastMeasurementsGQL, SubscribeToNewMeasurementsGQL } from 'src/app/generated/graphql';

import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})
export class GraphPageComponent implements OnInit, OnDestroy, AfterViewInit {

  dateForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  public data: ChartDataSets[] = [
    { data: [], label: 'Measurements' },
  ];

  public lineChartLabels: Label[] = []; // ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1000,
          }
        },
      ]
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  live$: Subscription;

  chartLoading = false;
  chartLoadingProgress = 0;
  chartLoadingProgressMax = 100;

  constructor(
    private readonly getInitialSetService: GetLastMeasurementsGQL,
    private readonly susbscibeMeasurementService: SubscribeToNewMeasurementsGQL,
  ) { }

  ngOnInit() {
    // this.chartLoading = true;
    // this.dateForm.get('startDate').valueChanges.subscribe(rs => {
    //   this.setupRanged(_.reverse(rs.split('/')).join('-'));
    // });
  }

  ngAfterViewInit(): void {
    Promise.resolve(this.chartLoading = true);
    const self = this;

    this.getInitialSetService.fetch({
      last: 60
    }, {
      fetchPolicy: 'network-only'
    }).subscribe({
      next(rs) {
         Object.assign(self.data[0].data, rs.data.measurements.map(x => x.value));
         Object.assign(self.lineChartLabels, rs.data.measurements.map(x => `${new Date(x.createdAt).getSeconds()}`));
         self.setupLive();

         // handle with next cycle
         Promise.resolve(self.chartLoading = false);
      },
      error(err) {
        console.error('Some network or auth error happened. Not handled yet.');
      },
      complete() {
        console.log('Done loading initial data.')
      }
    });
  }

  setupLive(): void {
    // console.log('settin up live');
    const self = this;

    this.susbscibeMeasurementService.subscribe().subscribe({
      next(rs) {
        // console.log('received::', rs);
        self.data[0].data.shift();
        self.data[0].data.push(rs.data.measurement.node.value);

        self.lineChartLabels.shift();
        self.lineChartLabels.push(`${new Date(rs.data.measurement.node.createdAt).getSeconds()}`);
      },
      error(err) {
        console.error('Live error::\n', err);
      },
      complete() {
        console.log('Live completed');
      }
    });

    // this.susbscibeMeasurementService.subscribe().pipe(map(x => {
    //   this.data[0].data.shift(); this.data[0].data.push(x.data.measurement.node.value);
    //   this.lineChartLabels.shift(); this.lineChartLabels.push(`${new Date(x.data.measurement.node.createdAt).getSeconds()}`);
    // }));

    // this.live$ = this.apollo.subscribe({
    //   query: MEASUREMENT_SUBSCRIPTION
    // }).subscribe(({ data }) => {
    //   const _in = data as SubDTO;
    //   let d = this.data[0].data;
    //   let l = this.lineChartLabels;
    //   d.shift();
    //   d.push(_in.measurement.node.value);

    //   l.shift();
    //   l.push(`${new Date(_in.measurement.node.createdAt).getSeconds()}`);

    //   Object.assign(this.lineChartLabels, l);
    //   Object.assign(this.data[0].data, d);
    // });
  }

  setupRanged(startDate: string): void {
    // this.live$ === undefined ? console.log('LIVE$ IS NULL') : this.live$.unsubscribe();

    // this.data[0].data.length = 0;
    // this.lineChartLabels.length = 0;

    // this.chartLoading = true;
    // this.chartLoadingProgress = 0;

    // this.ranged$ = this.apollo.watchQuery({
    //   query: QUERY_DAY,
    //   variables: {
    //     startDate: new Date(`${startDate}T00:00:00.000Z`),
    //     endDate: new Date(`${startDate}T23:59:59.999Z`),
    //   },
    //   fetchPolicy: 'network-only'
    // }).valueChanges.pipe(first()).subscribe(({ data }) => {
    //   // const _in = data as QueryDayDTO;
    //   // this.chartLoadingProgressMax = _in.measurementsConnection.aggregate.count;
    //   this.worker.postMessage(data);
    //   // this.chartLoading = false;
    // });
  }

  setLive() {
    // this.data[0].data.length = 0;
    // this.lineChartLabels.length = 0;
    // this.ngAfterViewInit();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  ngOnDestroy() {
  }

}
