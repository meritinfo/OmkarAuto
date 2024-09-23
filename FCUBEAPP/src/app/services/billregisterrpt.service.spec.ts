import { TestBed } from '@angular/core/testing';

import { BillregisterrptService } from './billregisterrpt.service';

describe('BillregisterrptService', () => {
  let service: BillregisterrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillregisterrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
