import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetBillsmasterlistComponent } from './fleetbillsmasterlist.component';

describe('FleetBillsmasterlistComponent', () => {
  let component: FleetBillsmasterlistComponent;
  let fixture: ComponentFixture<FleetBillsmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetBillsmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetBillsmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
