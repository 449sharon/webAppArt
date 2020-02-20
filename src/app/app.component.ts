import { Component } from '@angular/core';

import { Platform, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { AddToWishListPage } from './pages/add-to-wish-list/add-to-wish-list.page';
import { AddToCartPage } from './pages/add-to-cart/add-to-cart.page';
import { ProfilePage } from './pages/profile/profile.page';
import { TrackOrderPage } from './pages/track-order/track-order.page';
import { FaqsPage } from './pages/faqs/faqs.page';
import * as firebase from 'firebase';

import { SpecialsPage } from './pages/specials/specials.page';
import { PopoverComponent } from './components/popover/popover.component';
import { BehaviorSubject } from 'rxjs';
import { CartServiceService } from './services/cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

   cartItemCount = new BehaviorSubject(0);
 wishItemCount = new BehaviorSubject(0);
  loader: boolean = true;
  dbMessages = firebase.firestore().collection('Messages');
  message = {
    fullname: '',
    email: '',
    message:''
 }

 CartNumber = 0;
 CartNumber1 = 0
 active: string = ''
 specials = []
 

//  cartItemCounts = []


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private cartService: CartServiceService,
    public modalController: ModalController,
    public popoverController: PopoverController,
    public toastCtrl: ToastController
  ) {
    
// firebase.auth().onAuthStateChanged(user => {
//   if(user){
//     firebase.firestore().collection("Cart").onSnapshot(data => {
//       this.cartItemCount = []
//       data.forEach(item => {
//         if(item.data().customerUid === firebase.auth().currentUser.uid){
//           this.cartItemCount.push(item.data())
//         }
//       })
//     })

//   }
// })
    


    this.initializeApp();
    // this.cartItemCount.next(this.cartItemCount.value + 1);
    this.cartItemCount = this.cartService.getCartItemCount();
    this.wishItemCount = this.cartService.getWishItemCount();
   
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(){

    firebase.firestore().collection("Cart").onSnapshot(data => {

      
      this.CartNumber = 0;
      data.forEach(item => {

        if(item.data().customerUid == firebase.auth().currentUser.uid){
          this.CartNumber += 1;
        }
       
      })
    })

    firebase.firestore().collection("Sales").orderBy("percentage", "desc").limit(1).onSnapshot(snapshot => {
      this.specials = []
      snapshot.forEach(data => {
        this.specials.push(data.data())
        console.log("Percentage ", data.data());
        
      })
    })

    firebase.firestore().collection("WishList").onSnapshot(data => {
      this.CartNumber1 = 0;
      data.forEach(item => {

        if(item.data().customerUid == firebase.auth().currentUser.uid){
          this.CartNumber1 += 1;
        }
       
      })
    })

  }

  Allspecials(){
    this.router.navigateByUrl('/specials');  
  }
  
  async createAddToWishList() {
    const modal = await this.modalController.create({
      component:AddToWishListPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    
  }


  async createAddToCart() {
    const modal = await this.modalController.create({
      component:AddToCartPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }

 updateActive = name => this.active = name;

  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  showList(i) {
    this.active = i;
  }
  async createFaqs() {
    const modal = await this.modalController.create({
      component:FaqsPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  openAboutUS(){
    this.router.navigateByUrl('/about-us');
}

  openHome(){
    this.router.navigateByUrl('/')
  }

  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component:PopoverComponent,
      event: ev,
      cssClass: 'pop-over-style',
      translucent: true,
    });
    return await popover.present();
    
  }
  getAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.router.navigateByUrl('/home')
        //  this.loader
      }else {
        this.router.navigateByUrl('/login')
      }
     
      
    })
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
  getCartItemCount() {
    return this.cartItemCount;
  }
  getWishItemCount(){
    return this.wishItemCount;
  }



















  ShowActive(activeButton) {
    console.log('this is active')
    this.active = activeButton;

    if (activeButton === "home") {
      document.getElementById("home").style.textDecoration = "underline";
      // document.getElementById("home").style.textDecorationColor = "#B73225";
      document.getElementById("home").style.lightingColor = "#B73225";
      document.getElementById("about").style.textDecoration = "transparent";
      document.getElementById("about").style.textDecoration = "transparent";
      
      // text-decoration: underline;
    }
    else if (activeButton === "about") {


      document.getElementById("home").style.textDecoration = "transparent";
      document.getElementById("about").style.textDecoration = "underline";
  
 
     }
    
  }
}
