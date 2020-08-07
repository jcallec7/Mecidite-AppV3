import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccountPageRoutingModule } from './edit-account-routing.module';

import { EditAccountPage } from './edit-account.page';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAccountPageRoutingModule
  ],
  declarations: [EditAccountPage, ImageUploadComponent],
  exports: [ImageUploadComponent]
})
export class EditAccountPageModule {}
