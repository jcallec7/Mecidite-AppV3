import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMdPage } from './edit-md.page';

const routes: Routes = [
  {
    path: '',
    component: EditMdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMdPageRoutingModule {}
