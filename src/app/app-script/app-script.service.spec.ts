import { TestBed } from '@angular/core/testing';

import { AppScriptService } from './app-script.service';

describe('AppScriptService', () => {
  let service: AppScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
