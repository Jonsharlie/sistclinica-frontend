import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general.component';
import { ListAreasComponent } from './list-areas/list-areas.component';
import { ListCargosComponent } from './list-cargos/list-cargos.component';
import { ListTrabajadoresComponent } from './list-trabajadores/list-trabajadores.component';

const routes: Routes = [
  {
    path: '', component: GeneralComponent, children: [
      {
        path: 'areas', component: ListAreasComponent
      },
      {
        path: 'cargos', component: ListCargosComponent
      },
      {
        path: 'trabajadores', component: ListTrabajadoresComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
