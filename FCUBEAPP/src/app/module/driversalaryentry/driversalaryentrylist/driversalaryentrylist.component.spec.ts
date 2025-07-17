import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversalaryentrylistComponent } from './driversalaryentrylist.component';

describe('DriversalaryentrylistComponent', () => {
  let component: DriversalaryentrylistComponent;
  let fixture: ComponentFixture<DriversalaryentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversalaryentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversalaryentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
