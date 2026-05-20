import { TestBed } from '@angular/core/testing';

import { DocumentallotmentService } from './documentallotment.service';

describe('DocumentallotmentService', () => {
  let service: DocumentallotmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentallotmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
