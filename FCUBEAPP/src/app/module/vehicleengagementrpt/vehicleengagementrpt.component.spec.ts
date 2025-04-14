import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleengagementrptComponent } from './vehicleengagementrpt.component';

describe('VehicleengagementrptComponent', () => {
  let component: VehicleengagementrptComponent;
  let fixture: ComponentFixture<VehicleengagementrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleengagementrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleengagementrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
