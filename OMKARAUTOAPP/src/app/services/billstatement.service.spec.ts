import { TestBed } from '@angular/core/testing';

import { BillstatementService } from './billstatement.service';

describe('BillstatementService', () => {
  let service: BillstatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillstatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
