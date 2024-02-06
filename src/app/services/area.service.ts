import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Area } from '../interfaces/area';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/areas/'
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getArea(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addArea(area: Area): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, area)
  }

  updateArea(id: number, area: Area): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, area)
  }
}
