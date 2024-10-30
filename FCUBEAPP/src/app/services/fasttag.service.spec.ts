import { TestBed } from '@angular/core/testing';

import { FasttagService } from './fasttag.service';

describe('FasttagService', () => {
  let service: FasttagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FasttagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
