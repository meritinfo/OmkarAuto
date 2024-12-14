import { TestBed } from '@angular/core/testing';

import { FleetreportsService } from './fleetreports.service';

describe('FleetreportsService', () => {
  let service: FleetreportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetreportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
