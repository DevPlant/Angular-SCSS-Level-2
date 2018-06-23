import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DisplayState } from '../../models/display-state.enum';

@Component({
  selector: 'app-generic-fade-wrapper',
  templateUrl: './generic-fade-wrapper.component.html',
  styleUrls: ['./generic-fade-wrapper.component.scss']
})
export class GenericFadeWrapperComponent implements OnInit {

  public doesRenderContent = false;
  public displayState = DisplayState.HIDDEN;
  public fadeFinished$: Subject<AnimationEvent> = new Subject<AnimationEvent>();

  constructor() { }

  ngOnInit() {
  }

}
