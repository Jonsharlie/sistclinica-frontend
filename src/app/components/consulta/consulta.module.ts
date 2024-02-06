import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaComponent } from './consulta.component';
import { SharedModule } from '../../shared/shared.module';
import { ListConsultasComponent } from './list-consultas/list-consultas.component';
import { NavbarConsultaComponent } from './navbar-consulta/navbar-consulta.component';
import { AgregarEditarConsultaComponent } from './agregar-editar-consulta/agregar-editar-consulta.component';

@NgModule({
  declarations: [
    ConsultaComponent,
    ListConsultasComponent,
    NavbarConsultaComponent,
    AgregarEditarConsultaComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    SharedModule
  ]
})
export class ConsultaModule { }
