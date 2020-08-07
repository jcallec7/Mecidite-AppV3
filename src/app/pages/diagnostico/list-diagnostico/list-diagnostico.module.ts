import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDiagnosticoPageRoutingModule } from './list-diagnostico-routing.module';

import { ListDiagnosticoPage } from './list-diagnostico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDiagnosticoPageRoutingModule
  ],
  declarations: [ListDiagnosticoPage]
})
export class ListDiagnosticoPageModule {}
