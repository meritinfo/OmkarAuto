import { TestBed } from '@angular/core/testing';

import { LorryhirereqService } from './lorryhirereq.service';

describe('LorryhirereqService', () => {
  let service: LorryhirereqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LorryhirereqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
