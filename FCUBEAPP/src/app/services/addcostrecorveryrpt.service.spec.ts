import { TestBed } from '@angular/core/testing';

import { AddcostrecorveryrptService } from './addcostrecorveryrpt.service';

describe('AddcostrecorveryrptService', () => {
  let service: AddcostrecorveryrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcostrecorveryrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
