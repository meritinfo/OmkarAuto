import { TestBed } from '@angular/core/testing';

import { DieselstmtService } from './dieselstmt.service';

describe('DieselstmtService', () => {
  let service: DieselstmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DieselstmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
