import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { tenantsComponent } from './show-tenants.component';

describe('tenantsComponent', () => {
  let component: tenantsComponent;
  let fixture: ComponentFixture<tenantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ tenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(tenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
