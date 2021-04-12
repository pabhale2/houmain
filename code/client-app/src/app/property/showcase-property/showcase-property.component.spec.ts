import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcasePropertyComponent } from './showcase-property.component';

describe('ShowcasePropertyComponent', () => {
  let component: ShowcasePropertyComponent;
  let fixture: ComponentFixture<ShowcasePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcasePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcasePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
