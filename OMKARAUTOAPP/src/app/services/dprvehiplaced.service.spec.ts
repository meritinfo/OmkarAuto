import { TestBed } from '@angular/core/testing';

import { DprvehiplacedService } from './dprvehiplaced.service';

describe('DprvehiplacedService', () => {
  let service: DprvehiplacedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DprvehiplacedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
