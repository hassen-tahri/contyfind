import { TestBed } from '@angular/core/testing';

import { ChargeurService } from './chargeur.service';

describe('ChargeurService', () => {
  let service: ChargeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
