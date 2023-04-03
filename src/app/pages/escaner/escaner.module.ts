import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscanerPageRoutingModule } from './escaner-routing.module';

import { EscanerPage } from './escaner.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscanerPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [EscanerPage],
  exports: [TranslateModule]
})
export class EscanerPageModule {}
