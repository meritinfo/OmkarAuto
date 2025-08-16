import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclefincompmasterlistComponent } from './vehiclefincompmasterlist.component';

describe('VehiclefincompmasterlistComponent', () => {
  let component: VehiclefincompmasterlistComponent;
  let fixture: ComponentFixture<VehiclefincompmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclefincompmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclefincompmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
