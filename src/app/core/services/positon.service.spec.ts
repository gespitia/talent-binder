import { TestBed } from '@angular/core/testing';

import { PositonService } from './positon.service';

describe('PositonService', () => {
  let service: PositonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
