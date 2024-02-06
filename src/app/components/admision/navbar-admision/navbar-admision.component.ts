import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admision',
  templateUrl: './navbar-admision.component.html',
  styleUrl: './navbar-admision.component.css'
})
export class NavbarAdmisionComponent {

  constructor(
    private router: Router
  ){}

  public logout() {
    this.router.navigate(['login'])
  }
}
