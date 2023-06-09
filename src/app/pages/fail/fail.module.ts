import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FailPageRoutingModule } from './fail-routing.module';

import { FailPage } from './fail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FailPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [FailPage],
  exports: [TranslateModule]
})
export class FailPageModule {}
