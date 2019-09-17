import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})
export class GraphPageComponent implements OnInit {

  loading = false;

  dateForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  constructor() { }

  ngOnInit() {
  }

  loadTest() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

}
