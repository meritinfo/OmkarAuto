import { TestBed } from '@angular/core/testing';

import { ConfirmationdialogService } from './confirmationdialog.service';

describe('ConfirmationdialogService', () => {
  let service: ConfirmationdialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationdialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
