import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteDiagnosticoPage } from './delete-diagnostico.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteDiagnosticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteDiagnosticoPageRoutingModule {}
