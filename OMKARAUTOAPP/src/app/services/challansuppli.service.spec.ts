import { TestBed } from '@angular/core/testing';

import { ChallansuppliService } from './challansuppli.service';

describe('ChallansuppliService', () => {
  let service: ChallansuppliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallansuppliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
