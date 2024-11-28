import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventManagementPage } from './event-management.page';

const routes: Routes = [
  {
    path: '',
    component: EventManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventManagementPageRoutingModule {}
