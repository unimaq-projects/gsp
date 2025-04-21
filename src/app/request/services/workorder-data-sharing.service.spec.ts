import { TestBed } from '@angular/core/testing';

import { WorkorderDataSharingService } from './workorder-data-sharing.service';

describe('WorkorderDataSharingService', () => {
  let service: WorkorderDataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkorderDataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
