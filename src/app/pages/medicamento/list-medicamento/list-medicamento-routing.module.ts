import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMedicamentoPage } from './list-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: ListMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMedicamentoPageRoutingModule {}
