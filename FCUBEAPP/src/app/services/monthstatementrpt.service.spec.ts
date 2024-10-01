import { TestBed } from '@angular/core/testing';

import { MonthstatementrptService } from './monthstatementrpt.service';

describe('MonthstatementrptService', () => {
  let service: MonthstatementrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthstatementrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
