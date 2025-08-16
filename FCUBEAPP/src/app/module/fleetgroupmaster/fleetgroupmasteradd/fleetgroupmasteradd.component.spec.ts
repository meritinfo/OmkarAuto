import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetgroupmasteraddComponent } from './fleetgroupmasteradd.component';

describe('FleetgroupmasteraddComponent', () => {
  let component: FleetgroupmasteraddComponent;
  let fixture: ComponentFixture<FleetgroupmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetgroupmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetgroupmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
