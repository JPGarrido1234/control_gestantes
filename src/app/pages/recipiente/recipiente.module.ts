import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipientePageRoutingModule } from './recipiente-routing.module';

import { RecipientePage } from './recipiente.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipientePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [RecipientePage],
  exports: [TranslateModule]
})
export class RecipientePageModule {}
