import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartPage } from '../add-to-cart/add-to-cart.page';
import { ModalController, ToastController } from '@ionic/angular';
import { AddToWishListPage } from '../add-to-wish-list/add-to-wish-list.page';
import { ProfilePage } from '../profile/profile.page';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import * as moment from 'moment'



@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  dbWishlist = firebase.firestore().collection('Wishlist');
  dbMessages = firebase.firestore().collection('Messages');
  db = firebase.firestore();
  about  : any=[];
  isabout = false;
  service: any= [];
  isservice = false;
  user = {
    uid: '',
    email: firebase.auth().currentUser.email
  }
  message = {
    fullname: '',
    email: '',
    subject: '',
    message:''
 }
 myProduct = false;
  constructor(private router: Router,  public modalController: ModalController,public toastCtrl: ToastController) { 
    this.adminInfo();
  }


  ngOnInit() {
    this.getAbout()
    this.getServices()
  }
  openHome(){
    this.router.navigateByUrl('/')
  }
  openAboutUS(){
    this.router.navigateByUrl('/about-us')
  }
  async createAddToWishList() {
    const modal = await this.modalController.create({
      component:AddToWishListPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }

  async createAddToCart() {
    const modal = await this.modalController.create({
      component:AddToCartPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
}

addMessage() {
  if(firebase.auth().currentUser){
   let customerUid = firebase.auth().currentUser.uid;
   this.dbMessages.add({
     customerUid: customerUid,
     date: moment().format('MMMM Do YYYY, h:mm:ss a'),
     name : this.message.fullname,
     email : this.message.email,
     subject : this.message.subject,
     message : this.message.message

     
    }).then(() => {
      this.toastController('Message Sent!')
   }).catch(err => {
            console.error(err);
   });

   this.message = {
    fullname: '',
    email: '',
    subject :'',
    message:''
 }

  }else{
    //this.createModalLogin();
  }
}

  Info = []
adminInfo(){
  this.db.collection('admins').get().then(snapshot => {
  this.Info = [];
  if (snapshot.empty) {
         this.myProduct = false;
       } else {
         this.myProduct = true;
         snapshot.forEach(doc => {
           this.Info.push(doc.data());
           console.log("admin", this.Info);
         });
         
       }
   })
}
// getAbout(){
   
//   this.db.collection('AboutUs').get().then(snapshot => {
//     console.log('aboutUs', this.about);
    
//     if( this.about = []){
// snapshot.forEach(doc => {
//         this.about.push(doc.data());
//         console.log('messges', doc.data());
//       });
//       this.myProduct = true
//     }else{
//       this.myProduct = false
//     }
   
      
      
//   })
    
// }
getAbout(){
  this.about = [];
  this.db.collection('AboutUs').get().then(snapshot => {
    if (snapshot.empty !== true) {
      this.isabout = true;
      snapshot.forEach(doc => {
        this.about.push(doc.data());
      });
    } else {
      console.log('No about');
      
    }
   });
}
getServices(){
  this.service = [];
  this.db.collection('Service').get().then(snapshot => {
    if (snapshot.empty !== true) {
      this.isservice = true;
      snapshot.forEach(doc => {
        this.service.push(doc.data());
      });
    } else {
      console.log('No service');
      
    }
   });
}
// getServices(){
   
//   this.db.collection('Service').get().then(snapshot => {
//     console.log('services', this.service);
    
//     if( this.service){
// snapshot.forEach(doc => {
//         this.service.push(doc.data());
//         console.log('services', doc.data());
//       });
//       this.myProduct = true
//     }else{
//       this.myProduct = false
//     }
   
      
      
//   })
    
// }
sucessMesssage(){
  Swal.fire(
    'Good job!',
    'You clicked the button!',
    'success'
  )
}

}
