import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
import { Apollo } from 'apollo-angular';
import { QUERY_PAGED, MEASUREMENT_SUBSCRIPTION } from '../.models/queries';
import { QueryPagedDTO, SubDTO } from '../.models/DTOS.model';
import { Measurement } from '../.models/measurement.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LineChartComponent implements OnInit, OnDestroy, AfterViewInit {

  measurements: number[] = [];

  public data: ChartDataSets[] = [
    { data: this.measurements, label: 'Measurements' },
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

  loading = false;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.loading = true;
  }

  ngAfterViewInit(): void {
    this.initial$ = this.apollo.subscribe({
      query: QUERY_PAGED,
      variables: { before: null, from: 0, to: 60 }
    }).pipe(first()).subscribe(({ data }) => {
      console.log('initial');
      const _in = data as QueryPagedDTO;
      const d: number[] = [];
      const l: string[] = [];

      _in.measurements.forEach(m => {
        d.push(m.value);
        l.push(`${new Date(m.createdAt).getSeconds()}`);
      });

      Object.assign(this.measurements, d);
      Object.assign(this.lineChartLabels, l);
      this.setupLive();
      this.loading = false;
    });
  }

  setupLive(): void {
    this.live$ = this.apollo.subscribe({
      query: MEASUREMENT_SUBSCRIPTION
    }).subscribe(({ data }) => {
      const _in = data as SubDTO;
      let d = this.measurements;
      let l = this.lineChartLabels;
      d.shift();
      d.push(_in.measurement.node.value);

      l.shift();
      l.push(`${new Date(_in.measurement.node.createdAt).getSeconds()}`);

      Object.assign(this.lineChartLabels, l);
      Object.assign(this.measurements, d);
    });
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
  }
}
