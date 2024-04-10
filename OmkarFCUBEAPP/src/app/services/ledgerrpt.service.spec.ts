import { TestBed } from '@angular/core/testing';

import { LedgerrptService } from './ledgerrpt.service';

describe('LedgerrptService', () => {
  let service: LedgerrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedgerrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
