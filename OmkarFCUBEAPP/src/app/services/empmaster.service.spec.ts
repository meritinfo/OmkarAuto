import { TestBed } from '@angular/core/testing';

import { EmpmasterService } from './empmaster.service';

describe('EmpmasterService', () => {
  let service: EmpmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
