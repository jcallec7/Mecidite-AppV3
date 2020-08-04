import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditConsultaPageRoutingModule } from './edit-consulta-routing.module';

import { EditConsultaPage } from './edit-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditConsultaPageRoutingModule
  ],
  declarations: [EditConsultaPage]
})
export class EditConsultaPageModule {}
