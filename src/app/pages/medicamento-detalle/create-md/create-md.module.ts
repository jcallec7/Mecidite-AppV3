import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMdPageRoutingModule } from './create-md-routing.module';

import { CreateMdPage } from './create-md.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMdPageRoutingModule
  ],
  declarations: [CreateMdPage]
})
export class CreateMdPageModule {}
