import { TestBed } from '@angular/core/testing';

import { PcsService } from './pcs.service';

describe('PcsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PcsService = TestBed.get(PcsService);
    expect(service).toBeTruthy();
  });
});
