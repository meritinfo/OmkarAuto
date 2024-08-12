import { TestBed } from '@angular/core/testing';

import { LrwithoutchallanrptService } from './lrwithoutchallanrpt.service';

describe('LrwithoutchallanrptService', () => {
  let service: LrwithoutchallanrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LrwithoutchallanrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
