import { TestBed } from '@angular/core/testing';

import { VehiclerepairsrptService } from './vehiclerepairsrpt.service';

describe('VehiclerepairsrptService', () => {
  let service: VehiclerepairsrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclerepairsrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
