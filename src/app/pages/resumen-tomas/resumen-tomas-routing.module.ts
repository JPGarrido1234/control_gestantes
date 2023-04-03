import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenTomasPage } from './resumen-tomas.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenTomasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenTomasPageRoutingModule {}
