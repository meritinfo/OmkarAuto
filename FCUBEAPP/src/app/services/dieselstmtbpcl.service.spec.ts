import { TestBed } from '@angular/core/testing';

import { DieselstmtbpclService } from './dieselstmtbpcl.service';

describe('DieselstmtbpclService', () => {
  let service: DieselstmtbpclService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DieselstmtbpclService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
