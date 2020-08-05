import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeOfRegisterPageRoutingModule } from './type-of-register-routing.module';

import { TypeOfRegisterPage } from './type-of-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeOfRegisterPageRoutingModule
  ],
  declarations: [TypeOfRegisterPage]
})
export class TypeOfRegisterPageModule {}
