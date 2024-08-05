import { TestBed } from '@angular/core/testing';

import { BookingregisterService } from './bookingregister.service';

describe('BookingregisterService', () => {
  let service: BookingregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
