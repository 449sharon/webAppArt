import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'add-to-cart',
    loadChildren: () => import('./pages/add-to-cart/add-to-cart.module').then( m => m.AddToCartPageModule)
  },
  {
    path: 'add-to-wish-list',
    loadChildren: () => import('./pages/add-to-wish-list/add-to-wish-list.module').then( m => m.AddToWishListPageModule)
  },
  {
    path: 'categorylist',
    loadChildren: () => import('./pages/categorylist/categorylist.module').then( m => m.CategorylistPageModule)
  },
  {
    path: 'confirmation :key',
    loadChildren: () => import('./pages/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./pages/faqs/faqs.module').then( m => m.FaqsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'specials',
    loadChildren: () => import('./pages/specials/specials.module').then( m => m.SpecialsPageModule)
  },
  {
    path: 'track-order',
    loadChildren: () => import('./pages/track-order/track-order.module').then( m => m.TrackOrderPageModule)
  },
  {
    path: 'view-product-details',
    loadChildren: () => import('./pages/view-product-details/view-product-details.module').then( m => m.ViewProductDetailsPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },{
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./pages/terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
