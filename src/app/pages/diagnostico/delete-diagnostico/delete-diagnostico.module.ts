import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteDiagnosticoPageRoutingModule } from './delete-diagnostico-routing.module';

import { DeleteDiagnosticoPage } from './delete-diagnostico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteDiagnosticoPageRoutingModule
  ],
  declarations: [DeleteDiagnosticoPage]
})
export class DeleteDiagnosticoPageModule {}
