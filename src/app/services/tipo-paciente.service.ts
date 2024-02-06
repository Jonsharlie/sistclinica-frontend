import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tipoPaciente } from '../interfaces/tipoPaciente';

@Injectable({
  providedIn: 'root'
})
export class TipoPacienteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/tipopacientes/'
  }

  getTipoPacientesActivos(): Observable<tipoPaciente[]> {
    return this.http.get<tipoPaciente[]>(`${this.myAppUrl}${this.myApiUrl}activos`)
  }
}
