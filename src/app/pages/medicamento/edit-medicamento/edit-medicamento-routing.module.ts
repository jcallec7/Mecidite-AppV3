import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMedicamentoPage } from './edit-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: EditMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMedicamentoPageRoutingModule {}
