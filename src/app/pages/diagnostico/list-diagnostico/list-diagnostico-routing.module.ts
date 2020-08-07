import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDiagnosticoPage } from './list-diagnostico.page';

const routes: Routes = [
  {
    path: '',
    component: ListDiagnosticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDiagnosticoPageRoutingModule {}
