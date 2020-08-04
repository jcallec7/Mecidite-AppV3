import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateConsultaPageRoutingModule } from './create-consulta-routing.module';

import { CreateConsultaPage } from './create-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateConsultaPageRoutingModule
  ],
  declarations: [CreateConsultaPage]
})
export class CreateConsultaPageModule {}
