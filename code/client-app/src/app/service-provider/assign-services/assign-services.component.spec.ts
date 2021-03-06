import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignServiceComponent } from './assign-services.component';

describe('ListServicesComponent', () => {
  let component: AssignServiceComponent;
  let fixture: ComponentFixture<AssignServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
