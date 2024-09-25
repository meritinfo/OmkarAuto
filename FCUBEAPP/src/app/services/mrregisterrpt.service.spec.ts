import { TestBed } from '@angular/core/testing';

import { MrregisterrptService } from './mrregisterrpt.service';

describe('MrregisterrptService', () => {
  let service: MrregisterrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrregisterrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
