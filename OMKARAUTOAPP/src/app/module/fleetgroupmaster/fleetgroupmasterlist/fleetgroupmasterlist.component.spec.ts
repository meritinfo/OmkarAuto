import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetgroupmasterlistComponent } from './fleetgroupmasterlist.component';

describe('FleetgroupmasterlistComponent', () => {
  let component: FleetgroupmasterlistComponent;
  let fixture: ComponentFixture<FleetgroupmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetgroupmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetgroupmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
