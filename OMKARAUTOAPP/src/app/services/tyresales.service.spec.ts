import { TestBed } from '@angular/core/testing';

import { TyresalesService } from './tyresales.service';

describe('TyresalesService', () => {
  let service: TyresalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TyresalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
