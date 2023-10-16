import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://newsapi.org/v2/everything';
  private apiKey = '6a42f9bba7754d65a72b12d5ab8050ce';
  private defaultDomain = 'wsj.com';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const url = `${this.apiUrl}?domains=${this.defaultDomain}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}