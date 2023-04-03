import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscanerListaPageRoutingModule } from './escaner-lista-routing.module';

import { EscanerListaPage } from './escaner-lista.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscanerListaPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [EscanerListaPage],
  exports: [TranslateModule]
})
export class EscanerListaPageModule {}
