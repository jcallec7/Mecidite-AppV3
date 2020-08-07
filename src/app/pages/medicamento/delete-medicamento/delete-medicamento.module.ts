import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteMedicamentoPageRoutingModule } from './delete-medicamento-routing.module';

import { DeleteMedicamentoPage } from './delete-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteMedicamentoPageRoutingModule
  ],
  declarations: [DeleteMedicamentoPage]
})
export class DeleteMedicamentoPageModule {}
