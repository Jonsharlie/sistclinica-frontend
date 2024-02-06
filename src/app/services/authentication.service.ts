import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // private currentUserSubject: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null)
  private currentUserSubject: BehaviorSubject<Usuario>
  // public currentUser: Observable<Usuario>
  public currentUser:Usuario

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser') || '{}'))
    this.currentUser = this.currentUserSubject.getValue()
  }

  public currentUserValue(): Usuario {
    return this.currentUserSubject.value
  }

  public login(login: string, password: string) {
    return this._usuarioService.validarUsuario(login, password).pipe(map((usuario:any) => {
      if (usuario && usuario.token) {
        localStorage.setItem('currentUser', JSON.stringify(usuario.result))
        this.currentUserSubject.next(usuario)
      }
      return usuario
    }))
  }

  public logout() {
    const usuarioNull:any  = {}
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(usuarioNull)
  }

  // private hasToken(): boolean {
  //   return !localStorage.getItem('token')
  // }
}
