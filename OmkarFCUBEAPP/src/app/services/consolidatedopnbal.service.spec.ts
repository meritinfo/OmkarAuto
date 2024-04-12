import { TestBed } from '@angular/core/testing';

import { ConsolidatedopnbalService } from './consolidatedopnbal.service';

describe('ConsolidatedopnbalService', () => {
  let service: ConsolidatedopnbalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsolidatedopnbalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
