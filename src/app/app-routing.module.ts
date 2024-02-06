import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AgregarEditarCompraComponent } from './components/farmacia/agregar-editar-compra/agregar-editar-compra.component';
import { AgregarEditarVentaComponent } from './components/farmacia/agregar-editar-venta/agregar-editar-venta.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'compras/nuevo',
    component: AgregarEditarCompraComponent
  },
  {
    path: 'compras/:id_compra',
    component: AgregarEditarCompraComponent
  },
  {
    path: 'ventas/nuevo',
    component: AgregarEditarVentaComponent
  },
  {
    path: 'ventas/:id_venta',
    component: AgregarEditarVentaComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)
  },
  {
    path: 'admision',
    loadChildren: () => import('./components/admision/admision.module').then(x => x.AdmisionModule)
  },
  {
    path: 'farmacia',
    loadChildren: () => import('./components/farmacia/farmacia.module').then(x => x.FarmaciaModule)
  },
  {
    path: 'general',
    loadChildren: () => import('./components/general/general.module').then(x => x.GeneralModule)
  },
  {
    path: 'consulta',
    loadChildren: () => import('./components/consulta/consulta.module').then(x => x.ConsultaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
