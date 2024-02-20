import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusModel } from '../model/status.model';

@Injectable({
  providedIn: 'root'
})

export class WorkerserviceStatusService {
    constructor(private http:HttpClient) { }

    private apiEndPoint='/v1/WorkerServiceStatusCheck';
  
    checkServiceStatus(): Observable<StatusModel> {
    return this.http.get<StatusModel>(this.apiEndPoint);
  }
  
}
