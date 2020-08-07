import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMdPageRoutingModule } from './list-md-routing.module';

import { ListMdPage } from './list-md.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListMdPageRoutingModule
  ],
  declarations: [ListMdPage]
})
export class ListMdPageModule {}
