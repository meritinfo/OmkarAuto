import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetloadentrylistComponent } from './fleetloadentrylist.component';

describe('FleetloadentrylistComponent', () => {
  let component: FleetloadentrylistComponent;
  let fixture: ComponentFixture<FleetloadentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetloadentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetloadentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
