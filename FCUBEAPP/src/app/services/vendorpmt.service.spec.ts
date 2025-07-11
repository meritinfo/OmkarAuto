import { TestBed } from '@angular/core/testing';

import { VendorpmtService } from './vendorpmt.service';

describe('VendorpmtService', () => {
  let service: VendorpmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorpmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
