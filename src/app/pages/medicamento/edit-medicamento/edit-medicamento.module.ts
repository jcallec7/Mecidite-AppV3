import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMedicamentoPageRoutingModule } from './edit-medicamento-routing.module';

import { EditMedicamentoPage } from './edit-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMedicamentoPageRoutingModule
  ],
  declarations: [EditMedicamentoPage]
})
export class EditMedicamentoPageModule {}
