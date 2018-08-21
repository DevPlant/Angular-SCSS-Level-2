import { Component, OnInit } from '@angular/core';
import { DisplayState } from '../../models/display-state.enum';

@Component({
  selector: 'app-base-view',
  templateUrl: './base-view.component.html',
  styleUrls: ['./base-view.component.scss']
})
export class BaseViewComponent implements OnInit {

  display2 = true;
  display3 = true;

  description2 = 'hide ---> destroy';
  description3 = 'hide ---> keep in DOM';

  displayState: DisplayState = DisplayState.HIDDEN;

  constructor() { }

  ngOnInit() { }

  toggle2() {
    this.display2 = !this.display2;
  }
  toggle3() {
    this.display3 = !this.display3;
  }
}
