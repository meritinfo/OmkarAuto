import { TestBed } from '@angular/core/testing';

import { TripsummaryrptService } from './tripsummaryrpt.service';

describe('TripsummaryrptService', () => {
  let service: TripsummaryrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsummaryrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
