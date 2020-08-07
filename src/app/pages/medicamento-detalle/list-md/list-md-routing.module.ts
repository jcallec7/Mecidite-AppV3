import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMdPage } from './list-md.page';

const routes: Routes = [
  {
    path: '',
    component: ListMdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMdPageRoutingModule {}
