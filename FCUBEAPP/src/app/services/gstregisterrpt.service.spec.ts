import { TestBed } from '@angular/core/testing';

import { GstregisterrptService } from './gstregisterrpt.service';

describe('GstregisterrptService', () => {
  let service: GstregisterrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstregisterrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
