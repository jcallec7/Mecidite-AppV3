import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMedicamentoPage } from './create-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMedicamentoPageRoutingModule {}
