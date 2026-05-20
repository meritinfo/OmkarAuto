import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversalaryentryaddComponent } from './driversalaryentryadd.component';

describe('DriversalaryentryaddComponent', () => {
  let component: DriversalaryentryaddComponent;
  let fixture: ComponentFixture<DriversalaryentryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversalaryentryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversalaryentryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
