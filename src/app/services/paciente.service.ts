import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/pacientes/'
  }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getPaciente(nro_historia: string): Observable<Paciente> {
    console.log('route getPaciente', `${this.myAppUrl}${this.myApiUrl}${nro_historia}`)
    return this.http.get<Paciente>(`${this.myAppUrl}${this.myApiUrl}${nro_historia}`)
  }

  deletePaciente(nro_historia: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${nro_historia}`)
  }

  addPaciente(paciente: Paciente): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, paciente)
  }

  updatePaciente(nro_historia: string, paciente: Paciente): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${nro_historia}`, paciente)
  }
}
