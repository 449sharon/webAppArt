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

//  cartItemCounts = []

  
 active: boolean;
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
//       this.cartItemCounts = []
//       data.forEach(item => {
//         if(item.data().uid === firebase.auth().currentUser.uid){
//           this.cartItemCounts.push(item.data())
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

  Allspecials(){
    this.router.navigateByUrl('/specials');
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     parms: i
    //   }
    // }
    // this.router.navigate(['categorylist'],navigationExtras)   
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
















  activeTab: string = ''
  makeBold = "";

  toggleTab(selectedTab) {
    this.activeTab = selectedTab;
    // console.log(this.activeTab);
    // this.menuDrawer = 1;
    // this.toggleSideMenu()
    this.makeBold = "makeBold";
    // console.log(this.makeBold);
    if (selectedTab === "FAQs") {
      document.getElementById("one").style.fontWeight = "bold"
      document.getElementById("one").style.borderBottom = "2px solid yellow"
      document.getElementById("two").style.fontWeight = "500"
      document.getElementById("two").style.borderBottom = "0px solid yellow"
      document.getElementById("three").style.fontWeight = "500"
      document.getElementById("three").style.borderBottom = "0px solid yellow"
      document.getElementById("four").style.fontWeight = "500"
      document.getElementById("four").style.borderBottom = "0px solid yellow"
      document.getElementById("five").style.fontWeight = "500"
      document.getElementById("five").style.borderBottom = "0px solid yellow"

      document.getElementById("oneS").style.fontWeight = "bold"
      document.getElementById("oneS").style.background = "rgb(0, 8, 98)"
      document.getElementById("twoS").style.fontWeight = "500"
      document.getElementById("twoS").style.background = "transparent"
      document.getElementById("threeS").style.fontWeight = "500"
      document.getElementById("threeS").style.background = "transparent"
      document.getElementById("fourS").style.fontWeight = "500"
      document.getElementById("fourS").style.background = "transparent"
      document.getElementById("fiveS").style.fontWeight = "500"
      document.getElementById("fiveS").style.background = "transparent"
    }
    else if (selectedTab === "Terms and Privacy Policy") {
      document.getElementById("one").style.fontWeight = "500"
      document.getElementById("one").style.borderBottom = "0px solid yellow"
      document.getElementById("two").style.fontWeight = "bold"
      document.getElementById("two").style.borderBottom = "2px solid yellow"
      document.getElementById("three").style.fontWeight = "500"
      document.getElementById("three").style.borderBottom = "0px solid yellow"
      document.getElementById("four").style.fontWeight = "500"
      document.getElementById("four").style.borderBottom = "0px solid yellow"
      document.getElementById("five").style.fontWeight = "500"
      document.getElementById("five").style.borderBottom = "0px solid yellow"

      document.getElementById("oneS").style.fontWeight = "500"
      document.getElementById("oneS").style.background = "transparent"
      document.getElementById("twoS").style.fontWeight = "500"
      document.getElementById("twoS").style.background = "rgb(0, 8, 98)"
      document.getElementById("threeS").style.fontWeight = "500"
      document.getElementById("threeS").style.background = "transparent"
      document.getElementById("fourS").style.fontWeight = "500"
      document.getElementById("fourS").style.background = "transparent"
      document.getElementById("fiveS").style.fontWeight = "500"
      document.getElementById("fiveS").style.background = "transparent"
    }
    else if (selectedTab === "Payment Process") {
      document.getElementById("one").style.fontWeight = "500"
      document.getElementById("one").style.borderBottom = "0px solid yellow"
      document.getElementById("two").style.fontWeight = "500"
      document.getElementById("two").style.borderBottom = "0px solid yellow"
      document.getElementById("three").style.fontWeight = "bold"
      document.getElementById("three").style.borderBottom = "2px solid yellow"
      document.getElementById("four").style.fontWeight = "500"
      document.getElementById("four").style.borderBottom = "0px solid yellow"
      document.getElementById("five").style.fontWeight = "500"
      document.getElementById("five").style.borderBottom = "0px solid yellow"

      document.getElementById("oneS").style.fontWeight = "bold"
      document.getElementById("oneS").style.background = "rgb(0, 8, 98)"
      document.getElementById("twoS").style.fontWeight = "500"
      document.getElementById("twoS").style.background = "transparent"
      document.getElementById("threeS").style.fontWeight = "500"
      document.getElementById("threeS").style.background = "transparent"
      document.getElementById("fourS").style.fontWeight = "500"
      document.getElementById("fourS").style.background = "transparent"
      document.getElementById("fiveS").style.fontWeight = "500"
      document.getElementById("fiveS").style.background = "transparent"
    }
    else if (selectedTab === "About Company") {
      document.getElementById("one").style.fontWeight = "500"
      document.getElementById("one").style.borderBottom = "0px solid yellow"
      document.getElementById("two").style.fontWeight = "500"
      document.getElementById("two").style.borderBottom = "0px solid yellow"
      document.getElementById("three").style.fontWeight = "500"
      document.getElementById("three").style.borderBottom = "0px solid yellow"
      document.getElementById("four").style.fontWeight = "bold"
      document.getElementById("four").style.borderBottom = "2px solid yellow"
      document.getElementById("five").style.fontWeight = "500"
      document.getElementById("five").style.borderBottom = "0px solid yellow"

      document.getElementById("oneS").style.fontWeight = "bold"
      document.getElementById("oneS").style.background = "rgb(0, 8, 98)"
      document.getElementById("twoS").style.fontWeight = "500"
      document.getElementById("twoS").style.background = "transparent"
      document.getElementById("threeS").style.fontWeight = "500"
      document.getElementById("threeS").style.background = "transparent"
      document.getElementById("fourS").style.fontWeight = "500"
      document.getElementById("fourS").style.background = "transparent"
      document.getElementById("fiveS").style.fontWeight = "500"
      document.getElementById("fiveS").style.background = "transparent"
    }
    else if (selectedTab === "Disclaimer") {
      document.getElementById("one").style.fontWeight = "500"
      document.getElementById("one").style.borderBottom = "0px solid yellow"
      document.getElementById("two").style.fontWeight = "500"
      document.getElementById("two").style.borderBottom = "0px solid yellow"
      document.getElementById("three").style.fontWeight = "500"
      document.getElementById("three").style.borderBottom = "0px solid yellow"
      document.getElementById("four").style.fontWeight = "500"
      document.getElementById("four").style.borderBottom = "0px solid yellow"
      document.getElementById("five").style.fontWeight = "bold"
      document.getElementById("five").style.borderBottom = "2px solid yellow"

      document.getElementById("oneS").style.fontWeight = "bold"
      document.getElementById("oneS").style.background = "rgb(0, 8, 98)"
      document.getElementById("twoS").style.fontWeight = "500"
      document.getElementById("twoS").style.background = "transparent"
      document.getElementById("threeS").style.fontWeight = "500"
      document.getElementById("threeS").style.background = "transparent"
      document.getElementById("fourS").style.fontWeight = "500"
      document.getElementById("fourS").style.background = "transparent"
      document.getElementById("fiveS").style.fontWeight = "500"
      document.getElementById("fiveS").style.background = "transparent"
    }


  }
}
