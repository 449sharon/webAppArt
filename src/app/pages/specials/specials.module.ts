import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialsPageRoutingModule } from './specials-routing.module';

import { SpecialsPage } from './specials.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    SpecialsPageRoutingModule
  ],
  declarations: [SpecialsPage]
})
export class SpecialsPageModule {}
