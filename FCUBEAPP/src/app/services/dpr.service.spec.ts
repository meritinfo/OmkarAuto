import { TestBed } from '@angular/core/testing';

import { DprService } from './dpr.service';

describe('DprService', () => {
  let service: DprService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DprService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
