import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscanerBebePage } from './escaner-bebe.page';

const routes: Routes = [
  {
    path: '',
    component: EscanerBebePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscanerBebePageRoutingModule {}
