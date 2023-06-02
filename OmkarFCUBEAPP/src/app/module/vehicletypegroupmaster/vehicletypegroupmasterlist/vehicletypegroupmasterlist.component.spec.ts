import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicletypegroupmasterlistComponent } from './vehicletypegroupmasterlist.component';

describe('VehicletypegroupmasterlistComponent', () => {
  let component: VehicletypegroupmasterlistComponent;
  let fixture: ComponentFixture<VehicletypegroupmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicletypegroupmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicletypegroupmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
