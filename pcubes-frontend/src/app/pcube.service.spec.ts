import { TestBed } from '@angular/core/testing';

import { PcubeService } from './pcube.service';

describe('PcubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PcubeService = TestBed.get(PcubeService);
    expect(service).toBeTruthy();
  });
});
