import { TestBed } from '@angular/core/testing';

import { DeliveryackpodService } from './deliveryackpod.service';

describe('DeliveryackpodService', () => {
  let service: DeliveryackpodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryackpodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
