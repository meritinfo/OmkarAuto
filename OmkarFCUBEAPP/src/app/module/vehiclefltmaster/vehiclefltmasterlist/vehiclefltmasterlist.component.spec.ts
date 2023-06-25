import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclefltmasterlistComponent } from './vehiclefltmasterlist.component';

describe('VehiclefltmasterlistComponent', () => {
  let component: VehiclefltmasterlistComponent;
  let fixture: ComponentFixture<VehiclefltmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclefltmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclefltmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
