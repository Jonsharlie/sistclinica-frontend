import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './consulta.component';
import { ListConsultasComponent } from './list-consultas/list-consultas.component';

const routes: Routes = [
  { path: '', component: ConsultaComponent, children: [
    {
      path: 'mis-consultas', component: ListConsultasComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
