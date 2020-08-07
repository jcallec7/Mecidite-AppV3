import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteMedicamentoPage } from './delete-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteMedicamentoPageRoutingModule {}
