import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { GeneralComponent } from './general.component';
import { ListAreasComponent } from './list-areas/list-areas.component';
import { AgregarEditarAreaComponent } from './agregar-editar-area/agregar-editar-area.component';
import { ListCargosComponent } from './list-cargos/list-cargos.component';
import { AgregarEditarCargoComponent } from './agregar-editar-cargo/agregar-editar-cargo.component';
import { ListTrabajadoresComponent } from './list-trabajadores/list-trabajadores.component';
import { AgregarEditarTrabajadorComponent } from './agregar-editar-trabajador/agregar-editar-trabajador.component';
import { NavbarGeneralComponent } from './navbar-general/navbar-general.component';


@NgModule({
  declarations: [
    GeneralComponent,
    ListAreasComponent,
    AgregarEditarAreaComponent,
    ListCargosComponent,
    AgregarEditarCargoComponent,
    ListTrabajadoresComponent,
    AgregarEditarTrabajadorComponent,
    NavbarGeneralComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    SharedModule
  ]
})
export class GeneralModule { }
