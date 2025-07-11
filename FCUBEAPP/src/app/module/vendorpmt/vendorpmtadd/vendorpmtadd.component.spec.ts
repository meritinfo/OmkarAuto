import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorpmtaddComponent } from './vendorpmtadd.component';

describe('VendorpmtaddComponent', () => {
  let component: VendorpmtaddComponent;
  let fixture: ComponentFixture<VendorpmtaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorpmtaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorpmtaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
