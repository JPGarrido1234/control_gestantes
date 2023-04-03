import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientePage } from './recipiente.page';

const routes: Routes = [
  {
    path: '',
    component: RecipientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipientePageRoutingModule {}
