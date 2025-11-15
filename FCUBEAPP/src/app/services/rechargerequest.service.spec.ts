import { TestBed } from '@angular/core/testing';

import { RechargerequestService } from './rechargerequest.service';

describe('RechargerequestService', () => {
  let service: RechargerequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechargerequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
