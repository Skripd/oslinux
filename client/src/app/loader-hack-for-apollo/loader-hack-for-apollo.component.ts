import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader-hack-for-apollo',
  templateUrl: './loader-hack-for-apollo.component.html',
})
export class LoaderHackForApolloComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.router.navigateByUrl('/home');
  }
}
