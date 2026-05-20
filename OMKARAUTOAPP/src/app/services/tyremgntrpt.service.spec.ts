import { TestBed } from '@angular/core/testing';

import { TyremgntrptService } from './tyremgntrpt.service';

describe('TyremgntrptService', () => {
  let service: TyremgntrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TyremgntrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
