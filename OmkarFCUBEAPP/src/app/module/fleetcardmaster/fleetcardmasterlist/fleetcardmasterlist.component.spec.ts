import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetcardmasterlistComponent } from './fleetcardmasterlist.component';

describe('FleetcardmasterlistComponent', () => {
  let component: FleetcardmasterlistComponent;
  let fixture: ComponentFixture<FleetcardmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetcardmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetcardmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
