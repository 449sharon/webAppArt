// import { ProductService } from 'src/app/services/product-service.service';
// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { ModalController, ToastController } from '@ionic/angular';
// import { ViewProductDetailsPage } from '../view-product-details/view-product-details.page';
// import * as firebase from 'firebase';
// import { AddToCartPage } from '../add-to-cart/add-to-cart.page';
// import { AddToWishListPage } from '../add-to-wish-list/add-to-wish-list.page';
// import { ProfilePage } from '../profile/profile.page';

// @Component({
//   selector: 'app-categorylist',
//   templateUrl: './specials.page.html',
//   styleUrls: ['./specials.page.scss'],
// })
// export class SpecialsPage {
//   db = firebase.firestore();
//  value
//  Sales = [];
//   Products = [];
//   myProduct = false;
//   loader: boolean = true;
//   dbMessages = firebase.firestore().collection('Messages');
//   dbWishlist = firebase.firestore().collection('Wishlist');
//   message = {
//     fullname: '',
//     email: '',
//     message:''
//  }

//   constructor(private router: Router,  public modalController: ModalController,
//     private data: ProductService, private activatedRouter : ActivatedRoute,
//     public toastCtrl: ToastController) {
//       this.adminInfo();
//       this.getSpecials();
//      }
  
  
//   ionViewWillEnter() {
//     setTimeout(() => {
//       this.loader = false;
//     }, 2000);
//   }

//   ngOnInit() {
//     //  this.activatedRouter.queryParams.subscribe(params =>{
//     //   console.log('value', this.router.getCurrentNavigation().extras.state.parms);
//     //   this.value = this.router.getCurrentNavigation().extras.state.parms;
//     // }) 
//     this.getSpecials(); 
//   }

//   Info = []
// adminInfo(){
//   this.db.collection('admins').get().then(snapshot => {
//   this.Info = [];
//   if (snapshot.empty) {
//          this.myProduct = false;
//        } else {
//          this.myProduct = true;
//          snapshot.forEach(doc => {
//            this.Info.push(doc.data());
//            console.log("admin", this.Info);
//          });
         
//        }
//    })
// }

  
//   getSpecials(){
//     this.db.collection('Sales').onSnapshot(snapshot => {
//              this.Products = [];
//               snapshot.forEach(doc =>{
//                 this.Products.push({ obj :doc.data(),id : doc.id})
//               });
//     });
//   }

  
//   addToWishlist(prod, id) {

//     console.log("Product Info ",prod);
//     this.dbWishlist.doc(id).set({name: prod.name, desc: prod.desc, image: prod.image, price: prod.price, 
//      id: id, uid : firebase.auth().currentUser.uid, timestamp: new Date().getTime(), categories: prod.categories}).then(()=>{
//        this.toastController("Added to wishlist");
//      })
//  }
//   async createViewProduct(event) {
//     console.log('My details ', event);
    
//     this.data.data = event
//     const modal = await this.modalController.create({
//       component:ViewProductDetailsPage,
//       cssClass: 'my-custom-modal-css',
//       componentProps: event
//     });
//     return await modal.present();
//   }
//   async createAddToWishList() {
//     const modal = await this.modalController.create({
//       component:AddToWishListPage,
//       cssClass: 'my-add-to-cart',
      
    
//     });
//     return await modal.present();
//   }
//   async createAddToCart() {
//     const modal = await this.modalController.create({
//       component:AddToCartPage,
//       cssClass: 'my-add-to-cart',
      
    
//     });
//     return await modal.present();
//   }
//   async createProfile() {
//     const modal = await this.modalController.create({
//       component:ProfilePage,
//       cssClass: 'my-add-to-cart',
      
    
//     });
//     return await modal.present();
//   }
//   openHome(){
//     this.router.navigateByUrl('/')
//   }
//   openAboutUS(){
//     this.router.navigateByUrl('/about-us')
//   }
//   // openCart(){
//   //   this.router.navigateByUrl('/add-to-cart')
//   // }

//   async toastController(message) {
//     let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
//     return toast.present();
// }
//   addMessage() {
//     if(firebase.auth().currentUser){
//      let customerUid = firebase.auth().currentUser.uid;
//      this.dbMessages.add({
//        customerUid: customerUid,
//        name : this.message.fullname,
//        email : this.message.email,
//        message : this.message.message
  
       
//       }).then(() => {
//         this.toastController('Message Sent!')
//      }).catch(err => {
//               console.error(err);
//      });

//      this.message = {
//       fullname: '',
//       email: '',
//       message:''
//    }

//     }else{
//       //this.createModalLogin();
//     }
// }

// }

import { ProductService } from 'src/app/services/product-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ViewProductDetailsPage } from '../view-product-details/view-product-details.page';
import * as firebase from 'firebase';
import { AddToCartPage } from '../add-to-cart/add-to-cart.page';
import { AddToWishListPage } from '../add-to-wish-list/add-to-wish-list.page';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-categorylist',
  templateUrl: './specials.page.html',
  styleUrls: ['./specials.page.scss'],
})
export class SpecialsPage {
  db = firebase.firestore();
 value
 Sales = [];
  Products = [];
  myProduct = false;
  loader: boolean = true;
  dbMessages = firebase.firestore().collection('Messages');
  dbWishlist = firebase.firestore().collection('Wishlist');
  message = {
    fullname: '',
    email: '',
    message:''
 }

  constructor(private router: Router,  public modalController: ModalController,
    private data: ProductService, private activatedRouter : ActivatedRoute,
    public toastCtrl: ToastController) {
      this.adminInfo();
      this.getSpecials();
     }
  
  
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {
    //  this.activatedRouter.queryParams.subscribe(params =>{
    //   console.log('value', this.router.getCurrentNavigation().extras.state.parms);
    //   this.value = this.router.getCurrentNavigation().extras.state.parms;
    // }) 
    this.getSpecials(); 
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

  
  getSpecials(){
    this.db.collection('Sales').onSnapshot(snapshot => {
             this.Products = [];
              snapshot.forEach(doc =>{
                this.Products.push({ obj :doc.data(),id : doc.id})
              });
    });
  }

  
  addToWishlist(prod, id) {

    console.log("Product Info ",prod);
    this.dbWishlist.doc(id).set({name: prod.name, desc: prod.desc, image: prod.image, price: prod.price, 
     id: id, uid : firebase.auth().currentUser.uid, timestamp: new Date().getTime(), categories: prod.categories}).then(()=>{
       this.toastController("Added to wishlist");
     })
 }
  async createViewProduct(event) {
    console.log('My details ', event);
    
    

    this.data.data.image  = event.obj.image
    this.data.data.categories  = event.obj.categories
    this.data.data.lastcreated   = event.obj.lastcreated
    this.data.data.name  = event.obj.name
    this.data.data.price  = event.obj.price
    this.data.data.desc   = event.obj.desc
    this.data.data.items  = event.obj.items
    this.data.data.sizes  = event.obj.sizes
    this.data.data.quantity  = event.obj.quantity
    this.data.data.ratings  = event.obj.ratings
   
    this.router.navigateByUrl('view-product-details');

    
    // this.data.data = event
    // const modal = await this.modalController.create({
    //   component:ViewProductDetailsPage,
    //   cssClass: 'my-custom-modal-css',
    //   componentProps: event
    // });
    // return await modal.present();
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
  openHome(){
    this.router.navigateByUrl('/')
  }
  openAboutUS(){
    this.router.navigateByUrl('/about-us')
  }
  // openCart(){
  //   this.router.navigateByUrl('/add-to-cart')
  // }

  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
}
  addMessage() {
    if(firebase.auth().currentUser){
     let customerUid = firebase.auth().currentUser.uid;
     this.dbMessages.add({
       customerUid: customerUid,
       name : this.message.fullname,
       email : this.message.email,
       message : this.message.message
  
       
      }).then(() => {
        this.toastController('Message Sent!')
     }).catch(err => {
              console.error(err);
     });

     this.message = {
      fullname: '',
      email: '',
      message:''
   }

    }else{
      //this.createModalLogin();
    }
}

}