import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/especialidades/'
  }

  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getEspecialidad(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  deleteEspecialidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addEspecialidad(especialidad: Especialidad): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, especialidad)
  }

  updateEspecialidad(id: number, especialidad: Especialidad): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, especialidad)
  }
}
