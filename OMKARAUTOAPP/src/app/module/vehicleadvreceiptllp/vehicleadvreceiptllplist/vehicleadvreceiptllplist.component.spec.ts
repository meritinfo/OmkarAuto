import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleadvreceiptllplistComponent } from './vehicleadvreceiptllplist.component';

describe('VehicleadvreceiptllplistComponent', () => {
  let component: VehicleadvreceiptllplistComponent;
  let fixture: ComponentFixture<VehicleadvreceiptllplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleadvreceiptllplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleadvreceiptllplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
