import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Kardex } from '../interfaces/kardex';

@Injectable({
  providedIn: 'root'
})
export class KardexService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this,this.myApiUrl = 'api/kardex/'
  }

  getMovimientosPorProducto(id_producto: number): Observable<Kardex[]> {
    return this.http.get<Kardex[]>(`${this.myAppUrl}${this.myApiUrl}${'movimientos/'}${id_producto}`)
  }
}
