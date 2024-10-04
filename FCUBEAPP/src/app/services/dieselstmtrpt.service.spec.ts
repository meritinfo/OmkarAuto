import { TestBed } from '@angular/core/testing';

import { DieselstmtrptService } from './dieselstmtrpt.service';

describe('DieselstmtrptService', () => {
  let service: DieselstmtrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DieselstmtrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
