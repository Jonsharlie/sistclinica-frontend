import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  loading = false

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _usuarioService: UsuarioService,
    private _authenticationService: AuthenticationService
    ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ingresar() {
    // console.log(this.form)
    const login = this.form.value.usuario
    const password = this.form.value.password
    this._usuarioService.validarUsuario(login, password).subscribe((data:any) => {
      if (data !== null) {
        this.fakeLoading()
      } else {
        this.error()
        this.form.reset()
      }
    })
    /*
    if (usuario == 'jperez' && password == 'admin123') {
      this.fakeLoading()
    } else {
      this.error()
      this.form.reset()
    }
    */
  }

  error() {
    this._snackBar.open('Usuario o contraseña ingresada son inválidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeLoading() {
    this.loading = true
    setTimeout(() => {
      // Redireccionamos al dashboard
      // this.router.navigate(['dashboard'])
      this._authenticationService.login(this.form.value.usuario, this.form.value.password).subscribe((data:any) => {
        this.router.navigate(['dashboard'])
      }, error => {
        this._snackBar.open(error, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      })
      this.loading = false
    }, 1500);
  }
}
