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

  QueryA(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/database/most-popular-per-artist`);
  }

  QueryB(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/database/artist-above-average-popularity`);
  }

  QueryC(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/database/song-trend-over-time`);
  }

  QueryD(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/database/top-artists`);
  }

  QueryE(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/database/song-rank-within-category`);
  }

  QueryF(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/database/popular-high-energy`);
  }
}
