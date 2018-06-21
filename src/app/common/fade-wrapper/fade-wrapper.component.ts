import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DisplayState } from '../../models/display-state.enum';
import { Subject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';
import { fadeInOut } from '../../views/base-view/animations/fade-in-out.animation';


@Component({
  selector: 'app-fade-wrapper',
  templateUrl: './fade-wrapper.component.html',
  styleUrls: ['./fade-wrapper.component.scss'],
  animations: [fadeInOut]
})
export class FadeWrapperComponent implements OnInit, OnChanges {

  @Input() displayCondition = false;
  @Input() keepAlive = false;

  displayState: DisplayState = DisplayState.HIDDEN;

  fadeFinished$: Subject<AnimationEvent> = new Subject<AnimationEvent>();

  get notHidden(): boolean {
    return this.displayState === DisplayState.DISPLAYED ||
            this.displayState === DisplayState.FADE_IN ||
            this.displayState === DisplayState.FADE_OUT;
  }

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.displayCondition &&
        changes.displayCondition.firstChange &&
        changes.displayCondition.currentValue === true) {
        this._fadeIn();
    }
    if (changes.displayCondition &&
        !changes.displayCondition.firstChange) {
        this._attemptFadeToggle();
    }
  }

  private _attemptFadeToggle() {
    if (this.displayState === DisplayState.DISPLAYED) {
      this._fadeOut().subscribe(() => {
        this.displayState = DisplayState.HIDDEN;
      });
    }
    if (this.displayState === DisplayState.HIDDEN) {
      this._fadeIn().subscribe(() => {
        this.displayState = DisplayState.DISPLAYED;
      });
    }
  }

  private _fadeOut(): Observable<any> {
    this.displayState = DisplayState.FADE_OUT;
    return this.fadeFinished$.pipe(take(1));
  }
  private _fadeIn(): Observable<any> {
    this.displayState = DisplayState.FADE_IN;
    return this.fadeFinished$.pipe(take(1));
  }

}

