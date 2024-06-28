import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleinstscheduleaddComponent } from './vehicleinstscheduleadd.component';

describe('VehicleinstscheduleaddComponent', () => {
  let component: VehicleinstscheduleaddComponent;
  let fixture: ComponentFixture<VehicleinstscheduleaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleinstscheduleaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleinstscheduleaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
