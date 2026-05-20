import { TestBed } from '@angular/core/testing';

import { DirectpmtService } from './directpmt.service';

describe('DirectpmtService', () => {
  let service: DirectpmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectpmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
