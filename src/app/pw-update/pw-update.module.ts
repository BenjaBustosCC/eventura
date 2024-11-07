import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PwUpdatePageRoutingModule } from './pw-update-routing.module';

import { PwUpdatePage } from './pw-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PwUpdatePageRoutingModule
  ],
  declarations: [PwUpdatePage]
})
export class PwUpdatePageModule {}
