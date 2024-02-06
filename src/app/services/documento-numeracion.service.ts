import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { documentoNumeracion } from '../interfaces/documentoNumeracion';

@Injectable({
  providedIn: 'root'
})
export class DocumentoNumeracionService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/documentonumeracion/'
  }

  getNumeracion(id_tipo_documento: number): Observable<documentoNumeracion> {
    return this.http.get<documentoNumeracion>(`${this.myAppUrl}${this.myApiUrl}${id_tipo_documento}`)
  }
}
