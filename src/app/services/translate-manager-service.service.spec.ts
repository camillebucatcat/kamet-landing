import { TestBed } from '@angular/core/testing';

import { TranslateManagerServiceService } from './translate-manager-service.service';

describe('TranslateManagerServiceService', () => {
  let service: TranslateManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
