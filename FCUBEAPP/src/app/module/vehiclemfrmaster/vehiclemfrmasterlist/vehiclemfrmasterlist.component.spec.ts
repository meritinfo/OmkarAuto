import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemfrmasterlistComponent } from './vehiclemfrmasterlist.component';

describe('VehiclemfrmasterlistComponent', () => {
  let component: VehiclemfrmasterlistComponent;
  let fixture: ComponentFixture<VehiclemfrmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclemfrmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclemfrmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
