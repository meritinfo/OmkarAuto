import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleadvreceiptllpaddComponent } from './vehicleadvreceiptllpadd.component';

describe('VehicleadvreceiptllpaddComponent', () => {
  let component: VehicleadvreceiptllpaddComponent;
  let fixture: ComponentFixture<VehicleadvreceiptllpaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleadvreceiptllpaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleadvreceiptllpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
