import { TestBed } from '@angular/core/testing';

import { JobPostCountService } from './job-post-count.service';

describe('JobPostCountService', () => {
  let service: JobPostCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPostCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
