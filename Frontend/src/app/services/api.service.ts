import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  isAppLive(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/liveness`);
  }

  testQuery(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/database/most-popular-per-artist`);
  }
}
