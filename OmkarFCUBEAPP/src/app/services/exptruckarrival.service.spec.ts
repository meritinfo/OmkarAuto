import { TestBed } from '@angular/core/testing';

import { ExptruckarrivalService } from './exptruckarrival.service';

describe('ExptruckarrivalService', () => {
  let service: ExptruckarrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExptruckarrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
