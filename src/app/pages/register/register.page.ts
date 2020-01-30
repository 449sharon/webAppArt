
import { Component, OnInit, } from '@angular/core';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProfilePage } from '../profile/profile.page';
import { LoginPage } from '../login/login.page';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  db = firebase.firestore()
  storage = firebase.storage().ref();
  public signupForm: FormGroup;
  public loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    public modalController: ModalController
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {}

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ',
        signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      this.authService.signupUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
             this.createProfile()
             this.modalController.dismiss();
          })
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
            
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }
  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
  })
}
async openLogin(){
  const modal = await this.modalController.create({
    component:LoginPage,
    cssClass: 'login-register',
    
  
  });
  return await modal.present();
  // this.router.navigateByUrl('/login');
}
  openRegister(){
    
  }

async createModalRegister() {
  const modal = await this.modalController.create({
      component: RegisterPage, 
    });
    return await modal.present();
}
 
}

