import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMdPageRoutingModule } from './edit-md-routing.module';

import { EditMdPage } from './edit-md.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMdPageRoutingModule
  ],
  declarations: [EditMdPage]
})
export class EditMdPageModule {}
