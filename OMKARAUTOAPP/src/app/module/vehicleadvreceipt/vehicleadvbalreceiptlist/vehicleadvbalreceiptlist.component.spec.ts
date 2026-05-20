import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleadvbalreceiptlistComponent } from './vehicleadvbalreceiptlist.component';

describe('VehicleadvbalreceiptlistComponent', () => {
  let component: VehicleadvbalreceiptlistComponent;
  let fixture: ComponentFixture<VehicleadvbalreceiptlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleadvbalreceiptlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleadvbalreceiptlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
