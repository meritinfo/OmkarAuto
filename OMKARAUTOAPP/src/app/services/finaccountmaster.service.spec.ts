import { TestBed } from '@angular/core/testing';

import { FinsaccountmasterService } from './finaccountmaster.service';

describe('FinsaccountmasterService', () => {
  let service: FinsaccountmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinsaccountmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
