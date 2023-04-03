import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenTomasPageRoutingModule } from './resumen-tomas-routing.module';

import { ResumenTomasPage } from './resumen-tomas.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenTomasPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ResumenTomasPage],
  exports: [TranslateModule]
})
export class ResumenTomasPageModule {}
