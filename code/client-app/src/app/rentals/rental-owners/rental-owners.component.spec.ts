import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalOwnersComponent } from './rental-owners.component';

describe('RentalOwnersComponent', () => {
  let component: RentalOwnersComponent;
  let fixture: ComponentFixture<RentalOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
