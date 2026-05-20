import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesummmonthlyrptComponent } from './vehiclesummmonthlyrpt.component';

describe('VehiclesummmonthlyrptComponent', () => {
  let component: VehiclesummmonthlyrptComponent;
  let fixture: ComponentFixture<VehiclesummmonthlyrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesummmonthlyrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesummmonthlyrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
