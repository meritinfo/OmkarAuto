import { TestBed } from '@angular/core/testing';

import { LhextrapmtreconrptService } from './lhextrapmtreconrpt.service';

describe('LhextrapmtreconrptService', () => {
  let service: LhextrapmtreconrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LhextrapmtreconrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
