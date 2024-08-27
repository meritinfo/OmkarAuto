import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleadvbalreceiptaddComponent } from './vehicleadvbalreceiptadd.component';

describe('VehicleadvbalreceiptaddComponent', () => {
  let component: VehicleadvbalreceiptaddComponent;
  let fixture: ComponentFixture<VehicleadvbalreceiptaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleadvbalreceiptaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleadvbalreceiptaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
