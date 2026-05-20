import { TestBed } from '@angular/core/testing';

import { DistancemasterfreightmasterService } from './distancemasterfreightmaster.service';

describe('DistancemasterfreightmasterService', () => {
  let service: DistancemasterfreightmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistancemasterfreightmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
