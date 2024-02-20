import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPostModel } from '../model/job-post-model';

@Injectable({
  providedIn: 'root'
})
export class JobPostDetailsService {
  private apiUrl = '/v1/JobPost/';

  constructor(private http: HttpClient) {}

  getJobPostDetails(jobPostId: string): Observable<JobPostModel> {
    return this.http.get<JobPostModel>(this.apiUrl + jobPostId);
  }
}
