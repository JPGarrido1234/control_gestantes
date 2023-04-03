import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorrectPageRoutingModule } from './correct-routing.module';

import { CorrectPage } from './correct.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorrectPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [CorrectPage],
  exports: [TranslateModule]
})
export class CorrectPageModule {}
