import { TestBed } from '@angular/core/testing';

import { FreightreportsService } from './freightreports.service';

describe('FreightreportsService', () => {
  let service: FreightreportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreightreportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
