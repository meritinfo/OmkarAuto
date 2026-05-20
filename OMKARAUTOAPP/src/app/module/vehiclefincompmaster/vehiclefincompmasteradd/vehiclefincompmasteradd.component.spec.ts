import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclefincompmasteraddComponent } from './vehiclefincompmasteradd.component';

describe('VehiclefincompmasteraddComponent', () => {
  let component: VehiclefincompmasteraddComponent;
  let fixture: ComponentFixture<VehiclefincompmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclefincompmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclefincompmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
