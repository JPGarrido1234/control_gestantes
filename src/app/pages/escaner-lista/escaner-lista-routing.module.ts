import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscanerListaPage } from './escaner-lista.page';

const routes: Routes = [
  {
    path: '',
    component: EscanerListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscanerListaPageRoutingModule {}
