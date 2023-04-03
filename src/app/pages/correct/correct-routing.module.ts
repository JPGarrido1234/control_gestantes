import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorrectPage } from './correct.page';

const routes: Routes = [
  {
    path: '',
    component: CorrectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrectPageRoutingModule {}
