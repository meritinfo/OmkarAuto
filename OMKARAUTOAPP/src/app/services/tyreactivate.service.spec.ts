import { TestBed } from '@angular/core/testing';

import { TyreactivateService } from './tyreactivate.service';

describe('TyreactivateService', () => {
  let service: TyreactivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TyreactivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
