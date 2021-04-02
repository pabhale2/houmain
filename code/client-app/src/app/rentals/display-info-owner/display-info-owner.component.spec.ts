import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInfoOwnerComponent } from './display-info-owner.component';

describe('DisplayInfoOwnerComponent', () => {
  let component: DisplayInfoOwnerComponent;
  let fixture: ComponentFixture<DisplayInfoOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInfoOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInfoOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
