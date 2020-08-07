import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDiagnosticoPage } from './create-diagnostico.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDiagnosticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDiagnosticoPageRoutingModule {}
