import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteMdPage } from './delete-md.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteMdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteMdPageRoutingModule {}
