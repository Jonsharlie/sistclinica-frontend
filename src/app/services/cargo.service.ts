import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cargo } from '../interfaces/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/cargos/'
  }

  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getCargo(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  deleteCargo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addCargo(cargo: Cargo): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, cargo)
  }

  updateCargo(id: number, cargo: Cargo): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, cargo)
  }
}
