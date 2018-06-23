import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DisplayState } from '../../models/display-state.enum';
import { Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';
import { fadeInOut } from '../../views/base-view/animations/fade-in-out.animation';

/**
 * All-in-one component.
 * Contains display logic and rendering logic.
 */

@Component({
  /* tslint:disable */
  selector: 'fade-wrapper',
  /* tslint:enable */
  templateUrl: './fade-wrapper.component.html',
  styleUrls: ['./fade-wrapper.component.scss'],
  animations: [fadeInOut]
})
export class FadeWrapperComponent implements OnInit, OnChanges, OnDestroy {

  @Input() shouldDisplay = false;
  @Input() keepInDom = false;

  displayState: DisplayState = DisplayState.HIDDEN;

  fadeFinished$:    Subject<AnimationEvent> = new Subject<AnimationEvent>();
  _toggleRequest$:  Subject<DisplayState> = new Subject<DisplayState>();
  _fadeInSub:       Subscription;
  _fadeOutSub:      Subscription;

  get notHidden(): boolean {
    return this.displayState === DisplayState.DISPLAYED ||
            this.displayState === DisplayState.FADE_IN ||
            this.displayState === DisplayState.FADE_OUT;
  }

  get doesRenderContent(): boolean {
    return this.keepInDom ||
            this.shouldDisplay && this.notHidden;
  }

  constructor() { }

  ngOnInit() {
    const fadeOutRequest$ = this._toggleRequest$.pipe(
      filter(e => e === DisplayState.DISPLAYED)
    );
    this._fadeOutSub = fadeOutRequest$.subscribe(() => {
      this._fadeOut();
    });

    const fadeInRequest$ = this._toggleRequest$.pipe(
      filter(e => e === DisplayState.HIDDEN)
    );
    this._fadeInSub = fadeInRequest$.subscribe(() => {
      this._fadeIn();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.shouldDisplay &&
        changes.shouldDisplay.firstChange &&
        changes.shouldDisplay.currentValue === true) {
        this._fadeIn();
    }
    if (changes.shouldDisplay &&
        !changes.shouldDisplay.firstChange) {
        this._toggleRequest$.next(this.displayState);
    }
  }

  ngOnDestroy() {
    this._fadeInSub.unsubscribe();
    this._fadeOutSub.unsubscribe();
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

