import { TestBed } from '@angular/core/testing';

import { PltransferService } from './pltransfer.service';

describe('PltransferService', () => {
  let service: PltransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PltransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
