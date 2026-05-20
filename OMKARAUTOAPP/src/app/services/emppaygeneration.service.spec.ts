import { TestBed } from '@angular/core/testing';

import { EmppaygenerationService } from './emppaygeneration.service';

describe('EmppaygenerationService', () => {
  let service: EmppaygenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmppaygenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
