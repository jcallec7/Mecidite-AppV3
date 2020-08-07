import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMedicamentoPageRoutingModule } from './create-medicamento-routing.module';

import { CreateMedicamentoPage } from './create-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMedicamentoPageRoutingModule
  ],
  declarations: [CreateMedicamentoPage]
})
export class CreateMedicamentoPageModule {}
