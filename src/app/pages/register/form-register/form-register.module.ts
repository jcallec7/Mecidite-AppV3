import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRegisterPageRoutingModule } from './form-register-routing.module';

import { FormRegisterPage } from './form-register.page';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormRegisterPageRoutingModule
  ],
  declarations: [FormRegisterPage,ImageUploadComponent],
  exports: [ImageUploadComponent]
})
export class FormRegisterPageModule {}
