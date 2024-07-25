import { TestBed } from '@angular/core/testing';

import { TyreregrouprecdService } from './tyreregrouprecd.service';

describe('TyreregrouprecdService', () => {
  let service: TyreregrouprecdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TyreregrouprecdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
