import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmisionRoutingModule } from './admision-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { AdmisionComponent } from './admision.component';
import { ListEspecialidadesComponent } from './list-especialidades/list-especialidades.component';
import { NavbarAdmisionComponent } from './navbar-admision/navbar-admision.component';
import { AgregarEditarEspecialidadComponent } from './agregar-editar-especialidad/agregar-editar-especialidad.component';
import { ListPacientesComponent } from './list-pacientes/list-pacientes.component';
import { AgregarEditarPacienteComponent } from './agregar-editar-paciente/agregar-editar-paciente.component';

@NgModule({
  declarations: [
    AdmisionComponent,
    ListEspecialidadesComponent,
    NavbarAdmisionComponent,
    AgregarEditarEspecialidadComponent,
    AgregarEditarPacienteComponent,
    ListPacientesComponent
  ],
  imports: [
    CommonModule,
    AdmisionRoutingModule,
    SharedModule
  ]
})
export class AdmisionModule { }
