import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleinstpmtaddComponent } from './vehicleinstpmtadd.component';

describe('VehicleinstpmtaddComponent', () => {
  let component: VehicleinstpmtaddComponent;
  let fixture: ComponentFixture<VehicleinstpmtaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleinstpmtaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleinstpmtaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
