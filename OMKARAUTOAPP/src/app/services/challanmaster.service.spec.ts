import { TestBed } from '@angular/core/testing';

import { ChallanmasterService } from './challanmaster.service';

describe('ChallanmasterService', () => {
  let service: ChallanmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallanmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
