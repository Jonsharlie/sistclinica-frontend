import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/productos/'
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getProductosPorArea(id_area: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.myAppUrl}${this.myApiUrl}${'area/'}${id_area}`)
  }

  getProductosPorBusqueda(filter: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.myAppUrl}${this.myApiUrl}${'buscar/'}${filter}`)
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addProducto(producto: Producto): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, producto)
  }

  updateProducto(id: number, producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, producto)
  }
}
