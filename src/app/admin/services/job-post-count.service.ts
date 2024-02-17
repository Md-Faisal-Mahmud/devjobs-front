import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPostCountModel } from '../model/job-post-count-model';

@Injectable({
  providedIn: 'root'
})
export class JobPostCountService {
  constructor(private http: HttpClient) { }

  private apiEndPoint = '/v1/JobPostChart?Days=30';
  private requestBody = '{"days": 30}';
  private token = localStorage.getItem('token') ?? sessionStorage.getItem('token') ?? '';

  headers_object = new HttpHeaders({
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + this.token
  });

  httpOptions = {
    headers: this.headers_object
  };

  fetchJobPostCountByDays(): Observable<any> {
    return this.http.get<JobPostCountModel[]>(this.apiEndPoint, { headers: this.headers_object });
  }
}
