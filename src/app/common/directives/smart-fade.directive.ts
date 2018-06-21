import { Input, OnChanges, SimpleChanges, Directive, ViewContainerRef } from '@angular/core';
import { DisplayState } from '../../models/display-state.enum';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { FadeWrapper2Component } from '../fade-wrapper-2/fade-wrapper-2.component';

@Directive({
  /* tslint:disable */
  selector: '[fadeShouldDisplay]'
  /* tslint:enable */
})
export class SmartFadeDirective implements OnChanges {

  /* tslint:disable */
  @Input('fadeShouldDisplay') shouldDisplay = false;
  /* tslint:enable */
  @Input() keepInDom = false;

  fadeWrapper: FadeWrapper2Component; // component to sync with

  _toggleRequest$:  Subject<DisplayState> = new Subject<DisplayState>();

  // ---------------------------
  // SYNC with wrapper Component

  get displayState() {
    return this.fadeWrapper.displayState;
  }
  set displayState(state: DisplayState) {
    this.fadeWrapper.displayState = state;
    this.fadeWrapper.doesRenderContent = this.doesRenderContent;
  }
  get fadeFinished$(): Subject<any> {
    return this.fadeWrapper.fadeFinished$;
  }
  get notHidden(): boolean {
    return this.displayState === DisplayState.DISPLAYED ||
            this.displayState === DisplayState.FADE_IN ||
            this.displayState === DisplayState.FADE_OUT;
  }
  get doesRenderContent(): boolean {
    return this.keepInDom ||
            this.shouldDisplay && this.notHidden;
  }
  // ---------------------------

  constructor(private _view: ViewContainerRef) {
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

  ngOnChanges(changes: SimpleChanges) {

    // first changes - component initialization
    if (changes.shouldDisplay &&
        changes.shouldDisplay.firstChange) {
        // connect to wrapper
        this.fadeWrapper = this._view['_data'].componentView.component;
        this.fadeWrapper.doesRenderContent = this.doesRenderContent;
        if (changes.shouldDisplay.currentValue) {
          this._fadeIn();
        }
    }

    // later changes
    if (changes.shouldDisplay &&
        !changes.shouldDisplay.firstChange) {
        this._toggleRequest$.next(this.displayState);
        this.fadeWrapper.doesRenderContent = this.doesRenderContent;
    }

    if (changes.keepInDom) {
        this.fadeWrapper.doesRenderContent = this.doesRenderContent;
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
