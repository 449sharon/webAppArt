import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductDetailsPageRoutingModule } from './view-product-details-routing.module';

import { ViewProductDetailsPage } from './view-product-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProductDetailsPageRoutingModule
  ],
  declarations: [ViewProductDetailsPage]
})
export class ViewProductDetailsPageModule {}
