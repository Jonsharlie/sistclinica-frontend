import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = 'api/usuarios/'
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getUsuario(id: number): Observable<Usuario> {
    console.log('route getUsuario', `${this.myAppUrl}${this.myApiUrl}${id}`)
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  validarUsuario(login: string, password: string): Observable<Usuario> {
    const usuario = {
      login,
      password
    }
    return this.http.post<Usuario>(`${this.myAppUrl}${this.myApiUrl}${'validar-acceso/'}`, usuario)
  }

  addUsuario(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, usuario)
  }
}
