import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeWrapperComponent } from './fade-wrapper.component';

describe('FadeWrapperComponent', () => {
  let component: FadeWrapperComponent;
  let fixture: ComponentFixture<FadeWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FadeWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
