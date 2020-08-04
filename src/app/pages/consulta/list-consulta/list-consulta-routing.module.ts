import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListConsultaPage } from './list-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: ListConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListConsultaPageRoutingModule {}
