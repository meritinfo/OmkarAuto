import { TestBed } from '@angular/core/testing';

import { EmploanService } from './emploan.service';

describe('EmploanService', () => {
  let service: EmploanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
