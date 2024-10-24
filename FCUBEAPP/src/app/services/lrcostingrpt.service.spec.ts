import { TestBed } from '@angular/core/testing';

import { LrcostingrptService } from './lrcostingrpt.service';

describe('LrcostingrptService', () => {
  let service: LrcostingrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LrcostingrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
