import { TestBed } from '@angular/core/testing';

import { FinopenbalanceService } from './finopenbalance.service';

describe('FinopenbalanceService', () => {
  let service: FinopenbalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinopenbalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
