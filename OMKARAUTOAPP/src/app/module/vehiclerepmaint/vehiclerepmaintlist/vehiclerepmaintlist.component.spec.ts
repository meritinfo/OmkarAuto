import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclerepmaintlistComponent } from './vehiclerepmaintlist.component';

describe('VehiclerepmaintlistComponent', () => {
  let component: VehiclerepmaintlistComponent;
  let fixture: ComponentFixture<VehiclerepmaintlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclerepmaintlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclerepmaintlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
