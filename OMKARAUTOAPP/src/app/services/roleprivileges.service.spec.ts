import { TestBed } from '@angular/core/testing';

import { RoleprivilegesService } from './roleprivileges.service';

describe('RoleprivilegesService', () => {
  let service: RoleprivilegesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleprivilegesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
