import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmaciaRoutingModule } from './farmacia-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { FarmaciaComponent } from './farmacia.component';
import { ListPrincipioactivosComponent } from './list-principioactivos/list-principioactivos.component';
import { AgregarEditarPrincipioactivoComponent } from './agregar-editar-principioactivo/agregar-editar-principioactivo.component';
import { ListProductosComponent } from './list-productos/list-productos.component';
import { AgregarEditarProductoComponent } from './agregar-editar-producto/agregar-editar-producto.component';
import { ListUnidadesComponent } from './list-unidades/list-unidades.component';
import { AgregarEditarUnidadComponent } from './agregar-editar-unidad/agregar-editar-unidad.component';
import { NavbarFarmaciaComponent } from './navbar-farmacia/navbar-farmacia.component';
import { ListProveedoresComponent } from './list-proveedores/list-proveedores.component';
import { AgregarEditarProveedorComponent } from './agregar-editar-proveedor/agregar-editar-proveedor.component';
import { ListComprasComponent } from './list-compras/list-compras.component';
import { AgregarEditarCompraComponent } from './agregar-editar-compra/agregar-editar-compra.component';
import { ListVentasComponent } from './list-ventas/list-ventas.component';
import { AgregarEditarVentaComponent } from './agregar-editar-venta/agregar-editar-venta.component';

@NgModule({
  declarations: [
    FarmaciaComponent,
    ListPrincipioactivosComponent,
    AgregarEditarPrincipioactivoComponent,
    ListProductosComponent,
    AgregarEditarProductoComponent,
    ListUnidadesComponent,
    AgregarEditarUnidadComponent,
    ListProveedoresComponent,
    AgregarEditarProveedorComponent,
    ListComprasComponent,
    AgregarEditarCompraComponent,
    ListVentasComponent,
    AgregarEditarVentaComponent,
    NavbarFarmaciaComponent
  ],
  imports: [
    CommonModule,
    FarmaciaRoutingModule,
    SharedModule
  ]
})
export class FarmaciaModule { }
