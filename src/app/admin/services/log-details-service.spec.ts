import { TestBed } from '@angular/core/testing';

import { LogDetailsService } from './log-details.service';

describe('LogDetailsServiceService', () => {
  let service: LogDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
