import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Venta } from '../interfaces/venta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/ventas/'
  }

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  addVenta(venta: Venta): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, venta)
  } 
}
