import { TestBed } from '@angular/core/testing';

import { EwaybillextService } from './ewaybillext.service';

describe('EwaybillextService', () => {
  let service: EwaybillextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EwaybillextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
