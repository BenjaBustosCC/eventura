import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwUpdatePage } from './pw-update.page';

const routes: Routes = [
  {
    path: '',
    component: PwUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PwUpdatePageRoutingModule {}
