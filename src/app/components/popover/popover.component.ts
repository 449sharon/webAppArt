import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, AlertController, LoadingController } from '@ionic/angular';
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
  loader: boolean = true;
  constructor(
    public modalController: ModalController,  
    public popoverController: PopoverController,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
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
// logOut(){
// //  this.ConfirmationAlert();
//   firebase.auth().signOut().then(()=> {
//      this.router.navigateByUrl('/');
  
//    }).catch((error)=> {
//    console.log(error);
//    });
   
//  }

 async logOut(){
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'are you sure you want to log out?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
           this.loader 
          this.router.navigateByUrl('/');
        
        }
      }, {
        text: 'Yes',
        handler: () => {
          firebase.auth().signOut().then(()=> {
            this.presentLoading()
            this.router.navigateByUrl('/');
         
          }).catch((error)=> {
          console.log(error);
          });
        }
      }
    ]
  });

  await alert.present();

 }
 
 success(){
  Swal.fire({
    icon: 'success',
    title: 'Logged in successfully ',
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    },
    showConfirmButton: false,
    timer: 500
  })
 }

 async presentLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Logging out.....',
  }); 
  await loading.present();
  setTimeout(() => {
    loading.dismiss();
  }, 1000);

  // const { role, data } = await loading.onDidDismiss();

  // console.log('Loading dismissed!');
}
}
