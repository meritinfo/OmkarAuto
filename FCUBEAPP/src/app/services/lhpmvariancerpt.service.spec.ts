import { TestBed } from '@angular/core/testing';

import { LhpmvariancerptService } from './lhpmvariancerpt.service';

describe('LhpmvariancerptService', () => {
  let service: LhpmvariancerptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LhpmvariancerptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
