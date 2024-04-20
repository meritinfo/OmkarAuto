import { TestBed } from '@angular/core/testing';

import { DieselstatementService } from './dieselstatement.service';

describe('DieselstatementService', () => {
  let service: DieselstatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DieselstatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
