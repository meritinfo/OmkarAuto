import { TestBed } from '@angular/core/testing';

import { BankbookrptService } from './bankbookrpt.service';

describe('BankbookrptService', () => {
  let service: BankbookrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankbookrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
