import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})
export class GraphPageComponent implements OnInit {

  loading = false;
  live = true;

  dateForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  constructor() { }

  ngOnInit() {
  }

  setLive() {
    this.live = true;
  }

  setRanged() {
    this.live = false;
  }

}
