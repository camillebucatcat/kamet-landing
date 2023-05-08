import { TestBed } from '@angular/core/testing';

import { KmtService } from './kmt.service';

describe('KmtService', () => {
  let service: KmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
