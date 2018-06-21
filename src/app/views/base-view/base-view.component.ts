import { Component, OnInit } from '@angular/core';
import { DisplayState } from '../../models/display-state.enum';

@Component({
  selector: 'app-base-view',
  templateUrl: './base-view.component.html',
  styleUrls: ['./base-view.component.scss']
})
export class BaseViewComponent implements OnInit {

  display1 = true;
  display2 = true;
  display3 = true;

  description1 = 'on hide, content stays in DOM';
  description2 = 'on hide, content destroyed';
  description3 = 'on hide, content stays in DOM';

  displayState: DisplayState = DisplayState.HIDDEN;

  constructor() { }

  ngOnInit() { }

  toggle1() {
    this.display1 = !this.display1;
  }
  toggle2() {
    this.display2 = !this.display2;
  }
  toggle3() {
    this.display3 = !this.display3;
  }
}
