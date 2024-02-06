import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmaciaComponent } from './farmacia.component';
import { ListPrincipioactivosComponent } from './list-principioactivos/list-principioactivos.component';
import { ListUnidadesComponent } from './list-unidades/list-unidades.component';
import { ListProductosComponent } from './list-productos/list-productos.component';
import { ListProveedoresComponent } from './list-proveedores/list-proveedores.component';
import { ListComprasComponent } from './list-compras/list-compras.component';
import { ListVentasComponent } from './list-ventas/list-ventas.component';

const routes: Routes = [
  {path: '', component: FarmaciaComponent, children: [
    {
      path: 'principio-activo', component: ListPrincipioactivosComponent
    },
    {
      path: 'unidades', component: ListUnidadesComponent
    },
    {
      path: 'productos', component: ListProductosComponent
    },
    {
      path: 'proveedores', component: ListProveedoresComponent
    },
    {
      path: 'compras', component: ListComprasComponent
    },
    {
      path: 'ventas', component: ListVentasComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmaciaRoutingModule { }
