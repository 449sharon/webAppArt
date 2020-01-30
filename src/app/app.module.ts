import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import * as firebase from 'firebase';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterPageModule } from './pages/register/register.module';
import { ConfirmationPageModule } from './pages/confirmation/confirmation.module';
import { LoginPageModule } from './pages/login/login.module';
import { SpecialsPageModule } from './pages/specials/specials.module';
import { FaqsPageModule } from './pages/faqs/faqs.module';
import { TrackOrderPageModule } from './pages/track-order/track-order.module';
import { AddToWishListPageModule } from './pages/add-to-wish-list/add-to-wish-list.module';
import { AddToCartPageModule } from './pages/add-to-cart/add-to-cart.module';
import { ProfilePageModule } from './pages/profile/profile.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Popover2Component } from './components/popover2/popover2.component';
import { PopoverComponent } from './components/popover/popover.component';
import { ViewProductDetailsPageModule } from './pages/view-product-details/view-product-details.module';
import { Popover3Component } from './components/popover3/popover3.component';

const firebaseConfig = {
  apiKey: "AIzaSyCEdqt_gOew6SACcVm3xMXETdQxxbdbLJE",
  authDomain: "pitsengproject.firebaseapp.com",
  databaseURL: "https://pitsengproject.firebaseio.com",
  projectId: "pitsengproject",
  storageBucket: "pitsengproject.appspot.com",
  messagingSenderId: "359447010965",
  appId: "1:359447010965:web:30e22a1e055bd366d7c59c",
  measurementId: "G-T4KR75ZKET"
};
firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  @NgModule({
    declarations: [AppComponent,PopoverComponent,Popover2Component,Popover3Component],
    entryComponents: [PopoverComponent,Popover2Component,Popover3Component],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule, ReactiveFormsModule,ViewProductDetailsPageModule,
      AddToCartPageModule,
      AddToWishListPageModule,ProfilePageModule,
      TrackOrderPageModule,FaqsPageModule,
      RegisterPageModule,LoginPageModule,SpecialsPageModule,
      ConfirmationPageModule,],
    providers: [
      StatusBar,
      SplashScreen,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
  })
export class AppModule {}
