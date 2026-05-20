import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleinstpmtllpaddComponent } from './vehicleinstpmtllpadd.component';

describe('VehicleinstpmtllpaddComponent', () => {
  let component: VehicleinstpmtllpaddComponent;
  let fixture: ComponentFixture<VehicleinstpmtllpaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleinstpmtllpaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleinstpmtllpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
