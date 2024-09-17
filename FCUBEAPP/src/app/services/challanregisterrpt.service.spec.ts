import { TestBed } from '@angular/core/testing';

import { ChallanregisterrptService } from './challanregisterrpt.service';

describe('ChallanregisterrptService', () => {
  let service: ChallanregisterrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallanregisterrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
