import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Trabajador } from '../interfaces/trabajador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/trabajadores/'
  }

  getTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getTrabajadoresPorCargo(idCargo: number): Observable<Trabajador[]> {
    console.log('path trabajadores por cargo', `${this.myAppUrl}${this.myApiUrl}${'cargo/'}${idCargo}`)
    return this.http.get<Trabajador[]>(`${this.myAppUrl}${this.myApiUrl}${'cargo/'}${idCargo}`)
  }

  getTrabajador(id: number): Observable<Trabajador> {
    console.log('route getTrabajador', `${this.myAppUrl}${this.myApiUrl}${id}`)
    return this.http.get<Trabajador>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  deleteTrabajador(id: number): Observable<void> {
    console.log('id en deleteTrabajador', id)
    console.log('route', `${this.myAppUrl}${this.myApiUrl}${id}`)
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addTrabajador(trabajador: Trabajador): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, trabajador)
  }

  updateTrabajador(id: number, trabajador: Trabajador): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, trabajador)
  }
}
