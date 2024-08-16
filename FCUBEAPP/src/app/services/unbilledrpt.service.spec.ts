import { TestBed } from '@angular/core/testing';

import { UnbilledrptService } from './unbilledrpt.service';

describe('UnbilledrptService', () => {
  let service: UnbilledrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnbilledrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
