import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteMdPageRoutingModule } from './delete-md-routing.module';

import { DeleteMdPage } from './delete-md.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteMdPageRoutingModule
  ],
  declarations: [DeleteMdPage]
})
export class DeleteMdPageModule {}
