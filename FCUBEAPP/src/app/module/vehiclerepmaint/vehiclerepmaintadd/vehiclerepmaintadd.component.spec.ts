import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclerepmaintaddComponent } from './vehiclerepmaintadd.component';

describe('VehiclerepmaintaddComponent', () => {
  let component: VehiclerepmaintaddComponent;
  let fixture: ComponentFixture<VehiclerepmaintaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclerepmaintaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclerepmaintaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
