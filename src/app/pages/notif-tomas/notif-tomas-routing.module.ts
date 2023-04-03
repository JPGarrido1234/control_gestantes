import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifTomasPage } from './notif-tomas.page';

const routes: Routes = [
  {
    path: '',
    component: NotifTomasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifTomasPageRoutingModule {}
