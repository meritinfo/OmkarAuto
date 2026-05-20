import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorpmtlistComponent } from './vendorpmtlist.component';

describe('VendorpmtlistComponent', () => {
  let component: VendorpmtlistComponent;
  let fixture: ComponentFixture<VendorpmtlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorpmtlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorpmtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
