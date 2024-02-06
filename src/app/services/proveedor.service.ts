import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Proveedor } from '../interfaces/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/proveedores/'
  }

  getProveedores(isSistema: number): Observable<Proveedor[]> {
    console.log('url getProveedores', `${this.myAppUrl}${this.myApiUrl}${'sistema/'}${isSistema}`)
    return this.http.get<Proveedor[]>(`${this.myAppUrl}${this.myApiUrl}${'sistema/'}${isSistema}`)
  }

  getProveedoresPorArea(id_area: number): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.myAppUrl}${this.myApiUrl}${'area/'}${id_area}`)
  }

  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addProveedor(proveedor: Proveedor): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, proveedor)
  }

  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateProveedor(id: number, proveedor: Proveedor): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, proveedor)
  }
}
