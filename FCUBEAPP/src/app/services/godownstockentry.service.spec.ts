import { TestBed } from '@angular/core/testing';

import { GodownstockentryService } from './godownstockentry.service';

describe('GodownstockentryService', () => {
  let service: GodownstockentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GodownstockentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
