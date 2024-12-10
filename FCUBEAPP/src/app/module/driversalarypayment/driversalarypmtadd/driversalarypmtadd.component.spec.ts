import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversalarypmtaddComponent } from './driversalarypmtadd.component';

describe('DriversalarypmtaddComponent', () => {
  let component: DriversalarypmtaddComponent;
  let fixture: ComponentFixture<DriversalarypmtaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversalarypmtaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversalarypmtaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
