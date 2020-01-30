import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProductDetailsPage } from './view-product-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProductDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProductDetailsPageRoutingModule {}
