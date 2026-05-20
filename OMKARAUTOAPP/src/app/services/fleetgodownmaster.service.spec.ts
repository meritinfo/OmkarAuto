import { TestBed } from '@angular/core/testing';

import { FleetgodownmasterService } from './fleetgodownmaster.service';

describe('FleetgodownmasterService', () => {
  let service: FleetgodownmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetgodownmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
