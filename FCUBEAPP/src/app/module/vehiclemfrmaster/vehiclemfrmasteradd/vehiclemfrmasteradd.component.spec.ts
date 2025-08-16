import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemfrmasteraddComponent } from './vehiclemfrmasteradd.component';

describe('VehiclemfrmasteraddComponent', () => {
  let component: VehiclemfrmasteraddComponent;
  let fixture: ComponentFixture<VehiclemfrmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclemfrmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclemfrmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
