import { TestBed } from '@angular/core/testing';

import { FingroupService } from './fingroup.service';

describe('FingroupService', () => {
  let service: FingroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FingroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
