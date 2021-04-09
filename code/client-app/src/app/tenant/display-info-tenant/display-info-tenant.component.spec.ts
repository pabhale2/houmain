import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInfoTenantComponent } from './display-info-tenant.component';

describe('DisplayInfoTenantComponent', () => {
  let component: DisplayInfoTenantComponent;
  let fixture: ComponentFixture<DisplayInfoTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInfoTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInfoTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
