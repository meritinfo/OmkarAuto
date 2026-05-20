import { TestBed } from '@angular/core/testing';

import { VehicleinstscheduleService } from './vehicleinstschedule.service';

describe('VehicleinstscheduleService', () => {
  let service: VehicleinstscheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleinstscheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
