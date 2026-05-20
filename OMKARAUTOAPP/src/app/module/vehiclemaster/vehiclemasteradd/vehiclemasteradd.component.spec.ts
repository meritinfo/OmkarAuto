import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemasteraddComponent } from './vehiclemasteradd.component';

describe('VehiclemasteraddComponent', () => {
  let component: VehiclemasteraddComponent;
  let fixture: ComponentFixture<VehiclemasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclemasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclemasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
