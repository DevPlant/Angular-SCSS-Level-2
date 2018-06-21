import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-view',
  templateUrl: './base-view.component.html',
  styleUrls: ['./base-view.component.scss']
})
export class BaseViewComponent implements OnInit {

  display1 = true;
  display2 = false;

  constructor() { }

  ngOnInit() { }

  toggle() {
    this.display1 = !this.display1;
    this.display2 = !this.display2;
  }
}
