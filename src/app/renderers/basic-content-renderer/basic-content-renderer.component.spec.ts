import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicContentRendererComponent } from './basic-content-renderer.component';

describe('BasicContentRendererComponent', () => {
  let component: BasicContentRendererComponent;
  let fixture: ComponentFixture<BasicContentRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicContentRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicContentRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
