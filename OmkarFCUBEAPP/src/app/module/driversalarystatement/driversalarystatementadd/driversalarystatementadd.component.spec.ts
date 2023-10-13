import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversalarystatementaddComponent } from './driversalarystatementadd.component';

describe('DriversalarystatementaddComponent', () => {
  let component: DriversalarystatementaddComponent;
  let fixture: ComponentFixture<DriversalarystatementaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversalarystatementaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversalarystatementaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
