import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscanerBebePageRoutingModule } from './escaner-bebe-routing.module';

import { EscanerBebePage } from './escaner-bebe.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscanerBebePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [EscanerBebePage],
  exports: [TranslateModule]
})
export class EscanerBebePageModule {}
