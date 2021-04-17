import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorServiceComponent } from './vendor-services.component';

describe('ListServicesComponent', () => {
  let component: VendorServiceComponent;
  let fixture: ComponentFixture<VendorServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
