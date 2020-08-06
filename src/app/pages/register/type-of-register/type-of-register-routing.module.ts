import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeOfRegisterPage } from './type-of-register.page';

const routes: Routes = [
  {
    path: '',
    component: TypeOfRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeOfRegisterPageRoutingModule {}
