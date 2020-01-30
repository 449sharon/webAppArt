import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddToWishListPageRoutingModule } from './add-to-wish-list-routing.module';

import { AddToWishListPage } from './add-to-wish-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddToWishListPageRoutingModule
  ],
  declarations: [AddToWishListPage]
})
export class AddToWishListPageModule {}
