import { TestBed } from '@angular/core/testing';

import { DrivermasterService } from './drivermaster.service';

describe('DrivermasterService', () => {
  let service: DrivermasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrivermasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
