import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-consulta',
  templateUrl: './navbar-consulta.component.html',
  styleUrl: './navbar-consulta.component.css'
})
export class NavbarConsultaComponent {

  constructor(
    private router: Router
  ){}

  public logout() {
    this.router.navigate(['login'])
  }
}
