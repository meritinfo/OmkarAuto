import { TestBed } from '@angular/core/testing';

import { DotempgcService } from './dotempgc.service';

describe('DotempgcService', () => {
  let service: DotempgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotempgcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
