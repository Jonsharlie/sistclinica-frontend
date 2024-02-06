import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from '../interfaces/unidad'

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/unidades/'
  }

  getUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  deleteUnidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addUnidad(unidad: Unidad): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, unidad)
  }

  getUnidad(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateUnidad(id: number, unidad: Unidad): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, unidad)
  }
}
