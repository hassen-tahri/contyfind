import { TestBed } from '@angular/core/testing';

import { DommageService } from './dommage.service';

describe('DommageService', () => {
  let service: DommageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DommageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
