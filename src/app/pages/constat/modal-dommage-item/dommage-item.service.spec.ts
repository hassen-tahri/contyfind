import { TestBed } from '@angular/core/testing';

import { DommageItemService } from './dommage-item.service';

describe('DommageItemService', () => {
  let service: DommageItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DommageItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
