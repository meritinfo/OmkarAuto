import { TestBed } from '@angular/core/testing';

import { PartygroupmasterService } from './partygroupmaster.service';

describe('PartygroupmasterService', () => {
  let service: PartygroupmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartygroupmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
