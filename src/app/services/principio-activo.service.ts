import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PrincipioActivo } from '../interfaces/principioActivo';

@Injectable({
  providedIn: 'root'
})
export class PrincipioActivoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/principios/'
  }

  getPrincipios(): Observable<PrincipioActivo[]> {
    return this.http.get<PrincipioActivo[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getPrincipio(id: number): Observable<PrincipioActivo> {
    return this.http.get<PrincipioActivo>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  deletePrincipio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addPrincipio(principio: PrincipioActivo): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, principio)
  }

  updatePrincipio(id: number, principio: PrincipioActivo): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, principio)
  }
}
