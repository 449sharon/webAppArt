import { Component, OnInit, Renderer2, ViewChild, ElementRef, NgModuleFactoryLoader, } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { CartService } from '../cart.service';
import { AddToCartPage } from '../pages/add-to-cart/add-to-cart.page';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import { AddToWishListPage } from '../pages/add-to-wish-list/add-to-wish-list.page';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import {NavigationExtras} from '@angular/router';
import { ProfilePage } from '../pages/profile/profile.page';
import { ViewProductDetailsPage } from '../pages/view-product-details/view-product-details.page';
import { ProductService } from '../services/product-service.service';
import { CartServiceService } from '../services/cart-service.service';
import { FaqsPage } from '../pages/faqs/faqs.page';
import { ExpectedConditions } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  cartItemCount: BehaviorSubject<number>;
  // wishItemCount: BehaviorSubject<number>;
  // active: any;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  dbWishlist = firebase.firestore().collection('Wishlist');
  dbMessages = firebase.firestore().collection('Messages');
  db = firebase.firestore();
  event = {
    id: '',
    image: '',
    categories:'',
    name:'',
    price:null,
    productCode:'',
    desc: null,
    small:'',
    medium:'',
    large: ''
  };
  active: boolean;
  errtext = '';
  myProduct = false;
   controller = document.querySelector('ion-alert-controller');
   email
   names
  // message
  message = {
    fullname: '',
    email: '',
    message:''
 }


//  validations_form: FormGroup;
//  errorMessage: string = '';

   Products = [];
   proSales = [];
   currentDiv: boolean;
   mainContentDiv
   ShowThisDiv:boolean;
   categories
   listDiv: any = document.getElementsByClassName('categorySection');
   list: boolean = false;
   loader: boolean = true;

   Homescreen = {
     deco: null,
     lamps: null,
     pottery: null,
     vase: null
   }
   SpecialScrin = []
   sizes = null;
   specials = []

  constructor( public toastCtrl: ToastController, 
    private data: ProductService,private router: Router, 
    private cartService: CartServiceService, private render: Renderer2,
     public modalController: ModalController,public navCtrl: NavController) {
    this.adminInfo();
    this.getSpecials();
   
    // this.getPictures();
  }

  ngOnInit() {
    this.db.collection('mainImage').doc('Deco').onSnapshot(data => {
      this.Homescreen.deco = data.data().image;
  
      console.log('Not working!');
      
    })
    this.db.collection('mainImage').doc('Vase').onSnapshot(data => {
      this.Homescreen.vase = data.data().image;
  
      console.log('Not working!');
      
    })
    
    this.db.collection('mainImage').doc('Pottery').onSnapshot(data => {
      this.Homescreen.pottery = data.data().image;
  
      console.log('Not working!');
      
    })
    this.db.collection('mainImage').doc('Lamps').onSnapshot(data => {
      this.Homescreen.lamps = data.data().image;
  
      console.log('Not working!');
      
    })
    firebase.firestore().collection("Sales").orderBy("percentage", "desc").limit(1).onSnapshot(snapshot => {
      this.specials = []
      snapshot.forEach(data => {
        this.specials.push(data.data())
        console.log("Percentage ", data.data());
        
      })
    })
  }


  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }


   processForm(event) {
    event.preventDefault();
    this.controller.create({
      header: 'Account Created',
      message: `Created account for: <b>${this.email} ${this.names} ${this.message} </b>`,
      buttons: [{
        text: 'OK'
      }]
    }).then(alert => alert.present());
  }

 handleEmailValue(event) {
  this.email = event.target.value;
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
  async createFaqs() {
    const modal = await this.modalController.create({
      component:FaqsPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  // showList() {
  //   this.list = !this.list;
  //   this.loader = true;

  //     setTimeout(() => {
  //       if(this.list) {
  //         this.render.setStyle(this.listDiv[0], 'display', 'block');
    
  //       }else {
  //         setTimeout(() => {
  //           this.render.setStyle(this.listDiv[0], 'display', 'none');
  //         }, 500);
  //       }
  //       this.loader = false;
  //     }, 1000);
  // }

 handleNamesValue(event) {
    this.names = event.target.value;
  }
  handleMessageValue(event){
    this.message = event.target.value
  }

  changeContent(){
    if( this.mainContentDiv ){
      this.currentDiv = true

    }else{
      this.ShowThisDiv  = false
    }
  }


  categorylist(i){
    console.log('seko',i);
    
    let navigationExtras: NavigationExtras = {
      state: {
        parms: i
      }
    }
    this.router.navigate(['categorylist'],navigationExtras)   
  }
  // goSpecials(data) {
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       data: data,
  //       col: 'specials',
  //       //currency: JSON.stringify(currency),
  //       // refresh: refresh
  //     }
  //   };
  //   //this.router.navigate(['list', data])
  //   this.navCtrl.navigateForward(['specials', data], navigationExtras);
  // }
  
  addToWishlist(prod, id) {
     console.log("Product Info ",prod);
     this.dbWishlist.doc(id).set({
     /*   name: prod.name, desc: prod.desc, image: prod.image, price: prod.price, 
      id: id, uid : firebase.auth().currentUser.uid, timestamp: new Date().getTime(), categories: prod.categories */
      id: id,
      timestamp: new Date().getTime(),
      uid : firebase.auth().currentUser.uid,
      product_name: prod.name,
      productCode: prod.productCode,
      desc: prod.desc,
      size: this.sizes,
      price: prod.price,
      quantity: 1,
      image: prod.image,
      }).then(()=>{
    
    }).then(()=>{
        this.toastController("Added to wishlist");
      })
  }
  async allSpecials(event){
    
    console.log("Method called ", event);
    
    this.data.data.image  = event.obj.image
    this.data.data.imageSide  = event.obj.imageSide
    this.data.data.imageBack  = event.obj.imageBack
    this.data.data.imageTop  = event.obj.imageTop
    this.data.data.categories  = event.obj.categories
    this.data.data.lastcreated   = event.obj.lastcreated
    this.data.data.name  = event.obj.name
    this.data.data.productCode = event.obj.productCode
    this.data.data.price  = event.obj.price
    this.data.data.desc   = event.obj.desc
    this.data.data.items  = event.obj.items
    this.data.data.sizes  = event.obj.sizes
   
    this.data.data.ratings  = event.obj.ratings
   
    this.router.navigateByUrl('view-product-details');
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
     ///////////////// for sales
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

openAboutUS(){
    this.router.navigateByUrl('/about-us');
}

  openHome(){
    this.router.navigateByUrl('/')
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

async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
}


////////
/////

  addWishlist(i) {
    //
    if(firebase.auth().currentUser){
    let  customerUid = firebase.auth().currentUser.uid;
      console.log(i);
      this.dbWishlist.add({
        timestamp: new Date().getTime(),
        customerUid: customerUid,
        name : i.obj.name,
        price: i.obj.price,
        size:i.obj.size,
        productCode: i.obj.productCode,
        quantity: i.obj.quantity,
        percentage:i.obj.percentage,
        totalprice:i.obj.totalprice,
        image: i.obj.image
       }).then(() => {
        this.toastController('product Added to wishlist')
      })
        .catch(err => {
               console.error(err);
      });

      // this.wishItemCount.next(this.wishItemCount.value + 1);
    
    }else{
     // this.createModalLogin();
    }    
 }
//  async presentPopover(ev) {
//   const popover = await this.popoverController.create({
//     component:PopoverComponent,
//     event: ev,
//     cssClass: 'pop-over-style',
//     translucent: true,
//   });
//   return await popover.present();
  
// }

showList(i) {
  this.active = i;
}


// addWishlist(i) {
   

//   this.dbWishlist.add({
//     timestamp: new Date().getTime(),
//     product_name: i.name,
//     productCode: i.productCode,
//     size: this.sizes,
//     price: i.price,
//     quantity: this.event.quantity,
//     image: i.image,
// }).then(() => {
//   this.presentToast('ev')
//   // this.dismiss();
//   // ('product Added to wishlist')
// })
//   .catch(err => {
//     console.error(err);
//   });

// //  this.wishItemCount.next(this.wishItemCount.value + 1);

// } 
}
