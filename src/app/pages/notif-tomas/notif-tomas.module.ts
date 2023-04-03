import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifTomasPageRoutingModule } from './notif-tomas-routing.module';

import { NotifTomasPage } from './notif-tomas.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifTomasPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [NotifTomasPage],
  exports: [TranslateModule]
})
export class NotifTomasPageModule {}
