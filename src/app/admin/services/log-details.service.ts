import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogModel } from '../model/ILogModel';

@Injectable({
  providedIn: 'root'
})
export class LogDetailsService {
  private apiUrl = '/v1/DbLog/';

  constructor(private http: HttpClient) { }

  getLogDetailsById(logId: string): Observable<ILogModel>{
    return this.http.get<ILogModel>(this.apiUrl + logId);
  }
}