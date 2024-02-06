import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tipoDocumento } from '../interfaces/tipoDocumento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/tipodocumentos/'
  }

  getTipoDocumentosPersona(): Observable<tipoDocumento[]> {
    return this.http.get<tipoDocumento[]>(`${this.myAppUrl}${this.myApiUrl}persona`)
  }

  getTipoDocumentosEmpresa(): Observable<tipoDocumento[]> {
    return this.http.get<tipoDocumento[]>(`${this.myAppUrl}${this.myApiUrl}empresa`)
  }

  getTipoDocumentosCompra(): Observable<tipoDocumento[]> {
    return this.http.get<tipoDocumento[]>(`${this.myAppUrl}${this.myApiUrl}compra`)
  }

  getTipoDocumentosVenta(): Observable<tipoDocumento[]> {
    return this.http.get<tipoDocumento[]>(`${this.myAppUrl}${this.myApiUrl}venta`)
  }

  getTipoDocumento(id: number): Observable<tipoDocumento> {
    return this.http.get<tipoDocumento>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
}
