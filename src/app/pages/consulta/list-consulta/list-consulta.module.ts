import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListConsultaPageRoutingModule } from './list-consulta-routing.module';

import { ListConsultaPage } from './list-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListConsultaPageRoutingModule
  ],
  declarations: [ListConsultaPage]
})
export class ListConsultaPageModule {}
