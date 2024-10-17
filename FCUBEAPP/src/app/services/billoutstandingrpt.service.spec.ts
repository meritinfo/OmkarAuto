import { TestBed } from '@angular/core/testing';

import { BilloutstandingrptService } from './billoutstandingrpt.service';

describe('BilloutstandingrptService', () => {
  let service: BilloutstandingrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilloutstandingrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
