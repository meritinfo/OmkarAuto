import { TestBed } from '@angular/core/testing';

import { OnaccountmrstatusrptService } from './onaccountmrstatusrpt.service';

describe('OnaccountmrstatusrptService', () => {
  let service: OnaccountmrstatusrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnaccountmrstatusrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
