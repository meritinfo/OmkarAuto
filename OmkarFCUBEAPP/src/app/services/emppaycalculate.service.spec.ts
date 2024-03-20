import { TestBed } from '@angular/core/testing';

import { EmppaycalculateService } from './emppaycalculate.service';

describe('EmppaycalculateService', () => {
  let service: EmppaycalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmppaycalculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
