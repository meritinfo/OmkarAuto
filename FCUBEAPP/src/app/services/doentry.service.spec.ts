import { TestBed } from '@angular/core/testing';

import { DoentryService } from './doentry.service';

describe('DoentryService', () => {
  let service: DoentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
