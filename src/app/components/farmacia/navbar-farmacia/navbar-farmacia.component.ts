import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-farmacia',
  templateUrl: './navbar-farmacia.component.html',
  styleUrl: './navbar-farmacia.component.css'
})
export class NavbarFarmaciaComponent {

  constructor(
    private router:Router
  ){}

  public logout() {
    this.router.navigate(['login'])
  }

}
