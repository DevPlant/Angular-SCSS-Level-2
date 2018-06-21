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

  fadeFinished$:    Subject<AnimationEvent> = new Subject<AnimationEvent>();
  _toggleRequest$:  Subject<DisplayState> = new Subject<DisplayState>();

  get notHidden(): boolean {
    return this.displayState === DisplayState.DISPLAYED ||
            this.displayState === DisplayState.FADE_IN ||
            this.displayState === DisplayState.FADE_OUT;
  }

  constructor() {
    const fadeOutRequest$ = this._toggleRequest$.pipe(
      filter(e => e === DisplayState.DISPLAYED)
    );
    fadeOutRequest$.subscribe(() => {
      this._fadeOut();
    });

    const fadeInRequest$ = this._toggleRequest$.pipe(
      filter(e => e === DisplayState.HIDDEN)
    );
    fadeInRequest$.subscribe(() => {
      this._fadeIn();
    });
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.displayCondition &&
        changes.displayCondition.firstChange &&
        changes.displayCondition.currentValue === true) {
        this._fadeIn();
    }
    if (changes.displayCondition &&
        !changes.displayCondition.firstChange) {
        this._toggleRequest$.next(this.displayState);
    }
  }

  private _fadeOut(): void {
    this.displayState = DisplayState.FADE_OUT;
    this.fadeFinished$.pipe(take(1)).subscribe(() => {
      this.displayState = DisplayState.HIDDEN;
    });
  }
  private _fadeIn(): void {
    this.displayState = DisplayState.FADE_IN;
    this.fadeFinished$.pipe(take(1)).subscribe(() => {
      this.displayState = DisplayState.DISPLAYED;
    });
  }

}

