import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Precio } from '../interfaces/precio';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/precios/'
  }

  getUltimoPrecio(id_producto: number): Observable<Precio> {
    return this.http.get<Precio>(`${this.myAppUrl}${this.myApiUrl}${'ultimo-precio/'}${id_producto}`)
  }

}
