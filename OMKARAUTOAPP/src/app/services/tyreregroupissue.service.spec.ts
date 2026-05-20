import { TestBed } from '@angular/core/testing';

import { TyreregroupissueService } from './tyreregroupissue.service';

describe('TyreregroupissueService', () => {
  let service: TyreregroupissueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TyreregroupissueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
