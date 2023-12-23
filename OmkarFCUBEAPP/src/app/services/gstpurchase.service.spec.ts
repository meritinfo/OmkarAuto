import { TestBed } from '@angular/core/testing';

import { GstpurchaseService } from './gstpurchase.service';

describe('GstpurchaseService', () => {
  let service: GstpurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstpurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
