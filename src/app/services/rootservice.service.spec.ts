import { TestBed } from '@angular/core/testing';

import { RootserviceService } from './rootservice.service';

describe('RootserviceService', () => {
  let service: RootserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
