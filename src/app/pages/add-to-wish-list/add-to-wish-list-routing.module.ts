import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToWishListPage } from './add-to-wish-list.page';

const routes: Routes = [
  {
    path: '',
    component: AddToWishListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToWishListPageRoutingModule {}
