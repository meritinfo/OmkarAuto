import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetgodownmasterlistComponent } from './fleetgodownmasterlist.component';

describe('FleetgodownmasterlistComponent', () => {
  let component: FleetgodownmasterlistComponent;
  let fixture: ComponentFixture<FleetgodownmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetgodownmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetgodownmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
