import { TestBed } from '@angular/core/testing';

import { BusinesssummrptService } from './businesssummrpt.service';

describe('BusinesssummrptService', () => {
  let service: BusinesssummrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinesssummrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
