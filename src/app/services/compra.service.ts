import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Compra } from '../interfaces/compra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/compras/'
  }

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getCompra(id_compra: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.myAppUrl}${this.myApiUrl}${id_compra}`)
  }

  addCompra(compra: Compra): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, compra)
  } 
}
