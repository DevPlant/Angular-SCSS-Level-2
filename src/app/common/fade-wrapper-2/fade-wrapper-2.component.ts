import { Component, Input } from '@angular/core';
import { fadeInOut } from '../../views/base-view/animations/fade-in-out.animation';
import { DisplayState } from '../../models/display-state.enum';
import { Subject } from 'rxjs';
import { GenericFadeWrapperComponent } from '../generic-fade-wrapper/generic-fade-wrapper.component';

/**
 * Wrapper component to be used with [shouldDisplay]  smart-fade.directive.ts
 * Component has display logic, directive has rendering logic.
 */

@Component({
  /* tslint:disable */
  selector: '<fade-wrapper-2>',
  /* tslint:enable */
  templateUrl: './fade-wrapper-2.component.html',
  styleUrls: ['./fade-wrapper-2.component.scss'],
  animations: [fadeInOut]
})
export class FadeWrapper2Component extends GenericFadeWrapperComponent {
  public doesRenderContent = false;
  public displayState = DisplayState.HIDDEN;
  public fadeFinished$: Subject<AnimationEvent> = new Subject<AnimationEvent>();

  constructor() {
    super();
  }

}
