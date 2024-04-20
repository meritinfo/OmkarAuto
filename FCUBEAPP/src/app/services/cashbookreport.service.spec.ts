import { TestBed } from '@angular/core/testing';

import { CashbookreportService } from './cashbookreport.service';

describe('CashbookreportService', () => {
  let service: CashbookreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashbookreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
