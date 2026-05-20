import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetBillsmasteraddComponent } from './fleetbillsmasteradd.component';

describe('FleetBillsmasteraddComponent', () => {
  let component: FleetBillsmasteraddComponent;
  let fixture: ComponentFixture<FleetBillsmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetBillsmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetBillsmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
