import { TestBed } from '@angular/core/testing';

import { DscApiService } from './dsc-api.service';

describe('DscApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DscApiService = TestBed.get(DscApiService);
    expect(service).toBeTruthy();
  });
});
