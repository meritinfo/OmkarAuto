import { TestBed } from '@angular/core/testing';

import { VehiclefrtoutstandingrptService } from './vehiclefrtoutstandingrpt.service';

describe('VehiclefrtoutstandingrptService', () => {
  let service: VehiclefrtoutstandingrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclefrtoutstandingrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
