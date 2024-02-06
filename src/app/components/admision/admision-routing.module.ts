import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmisionComponent } from './admision.component';
import { ListEspecialidadesComponent } from './list-especialidades/list-especialidades.component';
import { ListPacientesComponent } from './list-pacientes/list-pacientes.component';

const routes: Routes = [
  { path: '', component: AdmisionComponent, children: [
    {
      path: 'especialidades', component: ListEspecialidadesComponent
    },
    {
      path: 'pacientes', component: ListPacientesComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmisionRoutingModule { }
