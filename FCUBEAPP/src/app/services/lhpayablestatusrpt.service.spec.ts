import { TestBed } from '@angular/core/testing';

import { LhpayablestatusrptService } from './lhpayablestatusrpt.service';

describe('LhpayablestatusrptService', () => {
  let service: LhpayablestatusrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LhpayablestatusrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
