import { TestBed } from '@angular/core/testing';

import { TyredeactivateService } from './tyredeactivate.service';

describe('TyredeactivateService', () => {
  let service: TyredeactivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TyredeactivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
