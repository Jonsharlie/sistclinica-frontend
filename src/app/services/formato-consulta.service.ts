import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { formatoConsulta } from '../interfaces/formatoConsulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatoConsultaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/formatoconsulta/'
  }

  addFormatoConsulta(formatoConsulta: formatoConsulta): Observable<void> {
    const { id_consulta, detalle } = formatoConsulta
    const format = {
      id_consulta: id_consulta,
      detalle: JSON.stringify(detalle)
    }
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, format)
  }

  getFormatoConsulta(id: number): Observable<formatoConsulta> {
    return this.http.get<formatoConsulta>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateFormatoConsulta(id: number, formatoConsulta: formatoConsulta): Observable<void> {
    const { id_consulta, detalle } = formatoConsulta
    const format = {
      id_consulta: id_consulta,
      detalle: JSON.stringify(detalle)
    }
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, format)
  }
}
