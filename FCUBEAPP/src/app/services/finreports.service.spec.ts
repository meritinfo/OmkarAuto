import { TestBed } from '@angular/core/testing';

import { FinreportsService } from './finreports.service';

describe('FinreportsService', () => {
  let service: FinreportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinreportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
