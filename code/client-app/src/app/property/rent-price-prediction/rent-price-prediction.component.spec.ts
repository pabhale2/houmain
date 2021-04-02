import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPricePredictionComponent } from './rent-price-prediction.component';

describe('RentPricePredictionComponent', () => {
  let component: RentPricePredictionComponent;
  let fixture: ComponentFixture<RentPricePredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentPricePredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentPricePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
