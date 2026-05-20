import { TestBed } from '@angular/core/testing';

import { LorryhirepmtreqService } from './lorryhirepmtreq.service';

describe('LorryhirepmtreqService', () => {
  let service: LorryhirepmtreqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LorryhirepmtreqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
