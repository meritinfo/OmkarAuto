import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversalarystatementlistComponent } from './driversalarystatementlist.component';

describe('DriversalarystatementlistComponent', () => {
  let component: DriversalarystatementlistComponent;
  let fixture: ComponentFixture<DriversalarystatementlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversalarystatementlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversalarystatementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
