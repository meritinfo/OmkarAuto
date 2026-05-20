import { TestBed } from '@angular/core/testing';

import { LorryhirepmtService } from './lorryhirepmt.service';

describe('LorryhirepmtService', () => {
  let service: LorryhirepmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LorryhirepmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
