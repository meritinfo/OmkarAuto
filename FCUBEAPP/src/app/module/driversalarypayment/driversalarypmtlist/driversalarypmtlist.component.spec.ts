import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversalarypmtlistComponent } from './driversalarypmtlist.component';

describe('DriversalarypmtlistComponent', () => {
  let component: DriversalarypmtlistComponent;
  let fixture: ComponentFixture<DriversalarypmtlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversalarypmtlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversalarypmtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
