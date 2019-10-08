import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Label, Color, BaseChartDirective } from 'ng2-charts';

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';

import { QUERY_PAGED, MEASUREMENT_SUBSCRIPTION, QUERY_DAY } from '../.models/queries';
import { QueryPagedDTO, SubDTO, QueryDayDTO } from '../.models/DTOS.model';

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

  public monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  initial$: Subscription;
  live$: Subscription;
  ranged$: Subscription;

  chartLoading = false;
  chartLoadingProgress = 0;
  chartLoadingProgressMax = 100;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.chartLoading = true;
    this.dateForm.get('startDate').valueChanges.subscribe(rs => {
      this.setupRanged(_.reverse(rs.split('/')).join('-'));
    });
  }

  ngAfterViewInit(): void {
    this.chartLoading = true;

    this.initial$ = this.apollo.subscribe({
      query: QUERY_PAGED,
      variables: { before: null, from: 0, to: 60 },
      fetchPolicy: 'network-only',
    }).pipe(first()).subscribe(({ data }) => {
      const _in = data as QueryPagedDTO;
      const d: number[] = [];
      const l: string[] = [];

      _in.measurements.forEach(m => {
        d.push(m.value);
        l.push(`${new Date(m.createdAt).getSeconds()}`);
      });

      Object.assign(this.data[0].data, d);
      Object.assign(this.lineChartLabels, l);
      this.setupLive();
      this.chartLoading = false;
      this.initial$.unsubscribe();
    });
  }

  setupLive(): void {
    this.ranged$ === undefined ? null : this.ranged$.unsubscribe();

    this.live$ = this.apollo.subscribe({
      query: MEASUREMENT_SUBSCRIPTION
    }).subscribe(({ data }) => {
      const _in = data as SubDTO;
      let d = this.data[0].data;
      let l = this.lineChartLabels;
      d.shift();
      d.push(_in.measurement.node.value);

      l.shift();
      l.push(`${new Date(_in.measurement.node.createdAt).getSeconds()}`);

      Object.assign(this.lineChartLabels, l);
      Object.assign(this.data[0].data, d);
    });
  }

  setupRanged(startDate: string): void {
    this.live$ === undefined ? null : this.live$.unsubscribe();

    this.data[0].data.length = 0;
    this.lineChartLabels.length = 0;

    this.chartLoading = true;
    this.chartLoadingProgress = 0;

    this.ranged$ = this.apollo.watchQuery({
      query: QUERY_DAY,
      variables: {
        startDate: new Date(`${startDate}T00:00:00.000Z`),
        endDate: new Date(`${startDate}T23:59:59.999Z`),
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(first()).subscribe(({ data }) => {
      const _in = data as QueryDayDTO;
      this.chartLoadingProgressMax = _in.measurementsConnection.aggregate.count;

      const aggregrateSize = Math.floor(this.chartLoadingProgressMax / 100);
      let aggregrator = 0;
      let counter = 0;

      const d: number[] = [];
      const l: string[] = [];
      _in.measurementsConnection.edges.forEach(({ node }) => {
        counter++;
        aggregrator += node.value;

        if (counter === aggregrateSize) {
          d.push(Math.floor(aggregrator / aggregrateSize));
          l.push(`${new Date(node.createdAt).toLocaleTimeString()}`);
          counter = 0;
          aggregrator = 0;
        }
      });

      Object.assign(this.data[0].data, d);
      Object.assign(this.lineChartLabels, l);
      this.chartLoading = false;
    });
  }

  setLive() {
    this.ngAfterViewInit();
    this.data[0].data.length = 0;
    this.lineChartLabels.length = 0;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  ngOnDestroy() {
    this.live$ === undefined ? null : this.live$.unsubscribe();
    this.initial$ === undefined ? null : this.initial$.unsubscribe();
    this.ranged$ === undefined ? null : this.ranged$.unsubscribe();
  }

}
