import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetgodownmasteraddComponent } from './fleetgodownmasteradd.component';

describe('FleetgodownmasteraddComponent', () => {
  let component: FleetgodownmasteraddComponent;
  let fixture: ComponentFixture<FleetgodownmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetgodownmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetgodownmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
