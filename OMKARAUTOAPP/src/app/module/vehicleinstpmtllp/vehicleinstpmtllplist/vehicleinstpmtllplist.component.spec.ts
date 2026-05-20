import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleinstpmtllplistComponent } from './vehicleinstpmtllplist.component';

describe('VehicleinstpmtllplistComponent', () => {
  let component: VehicleinstpmtllplistComponent;
  let fixture: ComponentFixture<VehicleinstpmtllplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleinstpmtllplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleinstpmtllplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
