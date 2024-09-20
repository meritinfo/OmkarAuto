import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclerepairsrptComponent } from './vehiclerepairsrpt.component';

describe('VehiclerepairsrptComponent', () => {
  let component: VehiclerepairsrptComponent;
  let fixture: ComponentFixture<VehiclerepairsrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclerepairsrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclerepairsrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
