import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';
import { DisplayState } from '../../../models/display-state.enum';

export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  state(DisplayState.DISPLAYED, style({opacity: 1})),
  state(DisplayState.FADE_IN, style({opacity: 1})),
  state(DisplayState.HIDDEN, style({opacity: 0})),
  state(DisplayState.FADE_OUT, style({opacity: 0})),
  transition(':enter', [
    style({opacity: 0}),
    animate(500)
  ]),
  transition(':leave', [
    animate(500, style({opacity: 0}))
  ]),

  transition('DISPLAYED => *', animate('300ms ease-out')),
  transition('HIDING => *', animate(0)),
  transition('HIDDEN => *', animate('300ms ease-out')),
  transition('DISPLAYING => *', animate(0)),
]);
