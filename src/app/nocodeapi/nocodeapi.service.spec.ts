import { TestBed } from '@angular/core/testing';

import { NocodeapiService } from './nocodeapi.service';

describe('NocodeapiService', () => {
  let service: NocodeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NocodeapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
