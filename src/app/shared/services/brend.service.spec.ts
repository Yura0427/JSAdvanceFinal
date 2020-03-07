import { TestBed } from '@angular/core/testing';

import { BrendService } from './brend.service';

describe('BrendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrendService = TestBed.get(BrendService);
    expect(service).toBeTruthy();
  });
});
