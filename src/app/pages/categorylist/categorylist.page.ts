import { ProductService } from 'src/app/services/product-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ViewProductDetailsPage } from '../view-product-details/view-product-details.page';
import * as firebase from 'firebase';
import { AddToCartPage } from '../add-to-cart/add-to-cart.page';
import { AddToWishListPage } from '../add-to-wish-list/add-to-wish-list.page';
import { ProfilePage } from '../profile/profile.page';
import { Popover2Component } from 'src/app/components/popover2/popover2.component';
import { Popover3Component } from 'src/app/components/popover3/popover3.component';
import { BehaviorSubject } from 'rxjs';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.page.html',
  styleUrls: ['./categorylist.page.scss'],
})
export class CategorylistPage implements OnInit {
  cartItemCount:BehaviorSubject<number>;
  wishItemCount: BehaviorSubject<number>;
  active: boolean;
  db = firebase.firestore();
 value
 
 ratings = []
 Sales = [];
  Products = [];
  myProduct = false;
  loader: boolean = true;
  dbMessages = firebase.firestore().collection('Messages');
  message = {
    fullname: '',
    email: '',
    message:''
 }
 Homescreen = {
  deco: null,
  lamps: null,
  pottery: null,
  vase: null
}
SpecialScrin = []
 proSales = [];

 
 dbWishlist = firebase.firestore().collection('Wishlist');
 
  constructor(private router: Router,  public modalController: ModalController,
    private data: ProductService, private activatedRouter : ActivatedRoute,
    public popoverController: PopoverController,  public toastCtrl: ToastController, public cartService: CartServiceService) { 
      this.adminInfo();
      this.getSpecials();
      this.getSpecials();
   

      //////
      this.getPictures();
    }
  
  
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {
    this.wishItemCount = this.cartService.getWishItemCount();
    this.cartItemCount = this.cartService.getCartItemCount();
    
    this.activatedRouter.queryParams.subscribe(params =>{
      console.log('value', this.router.getCurrentNavigation().extras.state.parms);
      this.value = this.router.getCurrentNavigation().extras.state.parms;
    })
    this.getProducts(); 
  }
  addToWishlist(prod, id) {
    console.log("Product Info ",prod);
    this.dbWishlist.doc(id).set({product_name: prod.name, desc: prod.desc, image: prod.image, price: prod.price, 
     id: id, uid : firebase.auth().currentUser.uid, timestamp: new Date().getTime(), categories: prod.categories}).then(()=>{
      //  this.toastController("Added to wishlist");
      // this. presentToast($event)
      
     })
     this.wishItemCount.next(this.wishItemCount.value + 1);
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

logRatingChange(){
  
  firebase.firestore().collection("Rating").get().then(snapshot =>{
    this.Products = []
    snapshot.forEach(doc=>{
      this.Products.push(doc.data())
    })
  })
}
getPictures(){
  let obj = {id : '', obj : {}};
  this.db.collection('Pictures').doc('images').get().then(snapshot => {
    this.Homescreen = {
      deco: null,
      lamps: null,
      pottery: null,
      vase: null
    }
    if (!snapshot.exists) {
            this.myProduct = false;
          } else {
            this.myProduct = true;
              obj.id = snapshot.id;
              obj.obj = snapshot.data();
              this.Homescreen = {
                deco: snapshot.data().deco,
                lamps: snapshot.data().lamps,
                pottery: snapshot.data().pottery,
                vase: snapshot.data().vase
              }
              obj = {id : '', obj : {}};
            console.log("xxc", this.Homescreen);
          }
     });
}
  getProducts(){
    this.db.collection('Products').where('categories', '==', this.value).get().then((snapshot) =>{
      this.Products = []
      if(snapshot.size > 0){
        let obj = {obj : {}, id : ''}
        snapshot.forEach(doc =>{

          obj.obj = doc.data();
          obj.id = doc.id
          this.Products.push(obj)
          obj = {obj : {}, id : ''}
          
        })
      }
    })
  }
  
  async createViewProduct(event) {
    console.log('My details ', event);
    
    this.data.data = event
    this.router.navigateByUrl('view-product-details');


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

  showList(i) {
    this.active = i;
   
    
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
  specialsAlso(){
    this.router.navigateByUrl('/specials');
  }
  PrivacyPolicy(){
    this.router.navigateByUrl('/privacy-policy')
  }
  TermsAndConditions(){
    this.router.navigateByUrl('/terms-and-conditions')
  }
  async presentToast(ev) {
    const popover = await this.popoverController.create({
      component:Popover3Component,
      event: ev,
      
      // cssClass: 'pop-over-style',
      translucent: true,
    });
   popover.present();
    setTimeout(()=>popover.dismiss(),500);
    
  }



  async allSpecials(event){

    //  console.log('SFDSDFSDF', this.data.data.image = event.obj.image);
    //  console.log('Image in the service ', this.data.data.image);
    this.data.data = event
    const modal = await this.modalController.create({
      component:ViewProductDetailsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: event
    });
    return await modal.present();
  /*    this.db.collection('sales').get().then(snapshot => {
      this.data.data.image = event.obj.image;
      this.data.data.name = event.obj.name;
      this.data.data.price = event.obj.price;
      this.data.data.desc = event.obj.desc
      this.data.data.productno = event.obj.productCode
     })
    }
    async createViewProduct(event){
    this.data.data = event
    const modal = await this.modalController.create({
      component:ViewProductDetailsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: event
    });
    return await modal.present(); */
  }

     ///////////////// for sales
  //   getSpecials(){
  //   //  let obj = {id : '', obj : {}};
  //   this.db.collection('Sales').limit(4).onSnapshot(snapshot => {
  //     this.proSales = [];
  //             snapshot.forEach(doc => {
  //              // obj.id = doc.id;
  //              // obj.obj = doc.data();
  //               this.proSales.push({id : doc.id, obj : doc.data()});
  //              // obj = {id : '', obj : {}};
                
  //             });
  //             this.SpecialScrin.push(this.proSales[0])
  //          // }
  //      });
  // }

  getSpecials(){
    //  let obj = {id : '', obj : {}};
    this.db.collection('Sales').limit(4).onSnapshot(snapshot => {
      this.proSales = [];
              snapshot.forEach(doc => {
               // obj.id = doc.id;
               // obj.obj = doc.data();
                this.proSales.push({id : doc.id, obj : doc.data()});
               // obj = {id : '', obj : {}};
                
              });
              this.SpecialScrin.push(this.proSales[0])
           // }
       });
  }
}









