import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclefrtoutstandingrptComponent } from './vehiclefrtoutstandingrpt.component';

describe('VehiclefrtoutstandingrptComponent', () => {
  let component: VehiclefrtoutstandingrptComponent;
  let fixture: ComponentFixture<VehiclefrtoutstandingrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclefrtoutstandingrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclefrtoutstandingrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
