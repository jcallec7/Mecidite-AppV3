import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMdPage } from './create-md.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMdPageRoutingModule {}
