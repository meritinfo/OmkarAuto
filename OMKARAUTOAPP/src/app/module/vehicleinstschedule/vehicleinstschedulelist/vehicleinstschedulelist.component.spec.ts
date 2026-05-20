import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleinstschedulelistComponent } from './vehicleinstschedulelist.component';

describe('VehicleinstschedulelistComponent', () => {
  let component: VehicleinstschedulelistComponent;
  let fixture: ComponentFixture<VehicleinstschedulelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleinstschedulelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleinstschedulelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
