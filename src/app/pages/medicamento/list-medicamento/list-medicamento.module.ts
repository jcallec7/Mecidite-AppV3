import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMedicamentoPageRoutingModule } from './list-medicamento-routing.module';

import { ListMedicamentoPage } from './list-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListMedicamentoPageRoutingModule
  ],
  declarations: [ListMedicamentoPage]
})
export class ListMedicamentoPageModule {}
