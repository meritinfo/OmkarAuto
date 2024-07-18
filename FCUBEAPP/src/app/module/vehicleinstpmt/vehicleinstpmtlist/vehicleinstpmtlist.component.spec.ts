import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleinstpmtlistComponent } from './vehicleinstpmtlist.component';

describe('VehicleinstpmtlistComponent', () => {
  let component: VehicleinstpmtlistComponent;
  let fixture: ComponentFixture<VehicleinstpmtlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleinstpmtlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleinstpmtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
