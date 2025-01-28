import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://api.weatherapi.com/v1/current.json';
  private apiKey = 'b8c5bfc5000f4ef096e140346252701'; //

  constructor(private http: HttpClient) { }

  getCurrentWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}`;
    return this.http.get<any>(url);
  }
}
