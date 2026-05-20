import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemasterlistComponent } from './vehiclemasterlist.component';

describe('VehiclemasterlistComponent', () => {
  let component: VehiclemasterlistComponent;
  let fixture: ComponentFixture<VehiclemasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclemasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclemasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
