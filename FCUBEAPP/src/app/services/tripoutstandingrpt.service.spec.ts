import { TestBed } from '@angular/core/testing';

import { TripoutstandingrptService } from './tripoutstandingrpt.service';

describe('TripoutstandingrptService', () => {
  let service: TripoutstandingrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripoutstandingrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
