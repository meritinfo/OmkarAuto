import { TestBed } from '@angular/core/testing';

import { DovehicleinService } from './dovehiclein.service';

describe('DovehicleinService', () => {
  let service: DovehicleinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DovehicleinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
