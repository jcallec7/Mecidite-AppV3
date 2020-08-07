import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDiagnosticoPageRoutingModule } from './create-diagnostico-routing.module';

import { CreateDiagnosticoPage } from './create-diagnostico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDiagnosticoPageRoutingModule
  ],
  declarations: [CreateDiagnosticoPage]
})
export class CreateDiagnosticoPageModule {}
