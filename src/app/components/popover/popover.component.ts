import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ProfilePage } from 'src/app/pages/profile/profile.page';
import { Router } from '@angular/router';
import { LoginPage } from 'src/app/pages/login/login.page';
import { RegisterPage } from 'src/app/pages/register/register.page';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  checkUser: boolean;
  constructor(
    public modalController: ModalController,  
    public popoverController: PopoverController,
    private router: Router,) { }

    ngOnInit() {
      // this.loginBtn = false;
      // this.registerBtn =  false;
      // this.logoutBtn = false;
      // this.profileBtn = false;
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          this.checkUser = true;
        }else {
          this.checkUser = false;
        }
      })
    }

  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  async DismissClick() {
    await this.popoverController.dismiss();
      }

      async openLogin(){
    const modal = await this.modalController.create({
      component:LoginPage,
      cssClass: 'login-register',
      
    
    });
    return await modal.present();
    // this.router.navigateByUrl('/login');
}
async openRegister(){

  const modal = await this.modalController.create({
    component:RegisterPage,
    cssClass: 'login-register',

  
  });
  return await modal.present();
  // this.router.navigateByUrl('/login');



}
logOut(){
 this.ConfirmationAlert();
  firebase.auth().signOut().then(()=> {
     // this.loginBtn = false;
     // this.registerBtn =  false;
     // this. logoutBtn = true;
     // // this.orderBtn = true;
     // this.profileBtn = true;
     this.router.navigateByUrl('/');
  
   }).catch((error)=> {
   console.log(error);
   });
   
 }

 ConfirmationAlert(){
  Swal.fire({
    title: 'Are you sure you want to logout?',
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    },
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#06A94D',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Logout!',
        'Your have logged out .',
        'success'
      )
    }
  })
 }

}
