import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-general',
  templateUrl: './navbar-general.component.html',
  styleUrl: './navbar-general.component.css'
})
export class NavbarGeneralComponent {
  constructor(
    private router: Router
  ){}

  public logout() {
    this.router.navigate(['login'])
  }
}
