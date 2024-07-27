import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetloadentryaddComponent } from './fleetloadentryadd.component';

describe('FleetloadentryaddComponent', () => {
  let component: FleetloadentryaddComponent;
  let fixture: ComponentFixture<FleetloadentryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetloadentryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetloadentryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
