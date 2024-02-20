import { TestBed } from '@angular/core/testing';

import { JobPostDetailsService } from './job-post-details.service';

describe('JobPostDetailsService', () => {
  let service: JobPostDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPostDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
