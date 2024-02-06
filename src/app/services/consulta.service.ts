import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../interfaces/consulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/consultas/'
  }

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getConsulta(id: number): Observable<Consulta> {
    console.log('route getConsulta', `${this.myAppUrl}${this.myApiUrl}${id}`)
    return this.http.get<Consulta>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  getHistorial(nro_historia: string): Observable<Consulta[]> {
    console.log('url historial', `${this.myAppUrl}${this.myApiUrl}${'historial/'}${nro_historia}`)
    return this.http.get<Consulta[]>(`${this.myAppUrl}${this.myApiUrl}${'historial/'}${nro_historia}`)
  }

  deleteConsulta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addConsulta(consulta: Consulta): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, consulta)
  }

  updateConsulta(id: number, consulta: Consulta): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, consulta)
  }

  updateEstadoConsulta(id: number, estado: any): Observable<void> {
    console.log('new estado consulta', estado)
    console.log('get url consulta update estado', `${this.myAppUrl}${this.myApiUrl}${'actualizar-estado/'}${id}`)
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${'actualizar-estado/'}${id}`, estado)
  }
}
