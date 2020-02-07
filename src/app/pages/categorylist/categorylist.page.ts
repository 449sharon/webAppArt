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

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.page.html',
  styleUrls: ['./categorylist.page.scss'],
})
export class CategorylistPage implements OnInit {
  active: boolean;
  db = firebase.firestore();
 value
 

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
 dbWishlist = firebase.firestore().collection('Wishlist');
  constructor(private router: Router,  public modalController: ModalController,
    private data: ProductService, private activatedRouter : ActivatedRoute,
    public popoverController: PopoverController,  public toastCtrl: ToastController) { 
      this.adminInfo();
      // this.getSpecials();
    }
  
  
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params =>{
      console.log('value', this.router.getCurrentNavigation().extras.state.parms);
      this.value = this.router.getCurrentNavigation().extras.state.parms;
    })
    this.getProducts(); 
  }
  addToWishlist(prod, id) {

    console.log("Product Info ",prod);
    this.dbWishlist.doc(id).set({name: prod.name, desc: prod.desc, image: prod.image, price: prod.price, 
     id: id, uid : firebase.auth().currentUser.uid, timestamp: new Date().getTime(), categories: prod.categories}).then(()=>{
       this.toastController("Added to wishlist");
     })
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
    const modal = await this.modalController.create({
      component:ViewProductDetailsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: event
    });
    return await modal.present();
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


}