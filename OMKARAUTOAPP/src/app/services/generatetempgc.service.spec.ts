import { TestBed } from '@angular/core/testing';

import { GeneratetempgcService } from './generatetempgc.service';

describe('GeneratetempgcService', () => {
  let service: GeneratetempgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratetempgcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
