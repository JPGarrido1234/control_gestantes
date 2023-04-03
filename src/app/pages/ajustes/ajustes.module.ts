import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustesPageRoutingModule } from './ajustes-routing.module';

import { AjustesPage } from './ajustes.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustesPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [AjustesPage],
  exports: [TranslateModule]
})
export class AjustesPageModule {}
