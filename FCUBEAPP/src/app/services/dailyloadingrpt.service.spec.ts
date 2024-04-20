import { TestBed } from '@angular/core/testing';

import { DailyloadingrptService } from './dailyloadingrpt.service';

describe('DailyloadingrptService', () => {
  let service: DailyloadingrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyloadingrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
