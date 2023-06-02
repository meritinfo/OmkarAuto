import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicletypemasterlistComponent } from './vehicletypemasterlist.component';

describe('VehicletypemasterlistComponent', () => {
  let component: VehicletypemasterlistComponent;
  let fixture: ComponentFixture<VehicletypemasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicletypemasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicletypemasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
