import { TestBed } from '@angular/core/testing';

import { BankreconcilationService } from './bankreconcilation.service';

describe('BankreconcilationService', () => {
  let service: BankreconcilationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankreconcilationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
