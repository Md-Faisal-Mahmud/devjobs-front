import { TestBed } from '@angular/core/testing';

import { WorkerserviceStatusService } from './workerservice-status.service';

describe('WorkerserviceStatusService', () => {
  let service: WorkerserviceStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerserviceStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
