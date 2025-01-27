import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleadvbalrptComponent } from './vehicleadvbalrpt.component';

describe('VehicleadvbalrptComponent', () => {
  let component: VehicleadvbalrptComponent;
  let fixture: ComponentFixture<VehicleadvbalrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleadvbalrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleadvbalrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
