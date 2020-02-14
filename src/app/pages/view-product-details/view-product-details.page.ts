// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { ModalController, ToastController, AlertController, PopoverController } from '@ionic/angular';
// import { Router } from '@angular/router';
// import * as firebase from 'firebase';
// import { BehaviorSubject } from 'rxjs';
// import { ProductService } from 'src/app/services/product-service.service';
// import { CartServiceService } from 'src/app/services/cart-service.service';
// import { Popover2Component } from 'src/app/components/popover2/popover2.component';
// import { LoginPage } from '../login/login.page';
// import Swal from 'sweetalert2';
// import { ThrowStmt } from '@angular/compiler';
// import { Popover3Component } from 'src/app/components/popover3/popover3.component';


// @Component({
//   selector: 'app-view-product-details',
//   templateUrl: './view-product-details.page.html',
//   styleUrls: ['./view-product-details.page.scss'],
// })
// export class ViewProductDetailsPage implements OnInit {
//   cartItemCount:BehaviorSubject<number>;
//   wishItemCount: BehaviorSubject<number>;
//   @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;
//   dbWishlist = firebase.firestore().collection('Wishlist');
//   dbRating = firebase.firestore().collection('Rating');
 
//   customerUid: any;
//   dbCart = firebase.firestore().collection('Cart');
   
//    currentNumber: number = 1;
//   Products = [];
//   proSales = [];
//   sizes = null;
//   MyObj = [];
//   event = {
//     image: '',
//     categories: '',
//     name: '',
//     price: 0,
//     productno: '',
//     desc: null,
//     small: '',
//     medium: '',
//     large: '',
//     quantity: 1,
//     amount: 0,
//     total: 0
//   };
//   productSize = {
//     small: false,
//     medium: false,
//     large: false
//   }
//   id
//   image = ""
//   constructor(public modalController: ModalController,
//     public productService: ProductService,
//     public data: ProductService,
//     public alertCtrl: AlertController,
//     public toastCtrl: ToastController,
//     public cartService: CartServiceService,
//     private router: Router,
//     public popoverController: PopoverController) { }

//   ngOnInit() {
//     this.wishItemCount = this.cartService.getWishItemCount();
//     this.cartItemCount = this.cartService.getCartItemCount();
//     console.log("Data in the view Details ", this.data.data);
//     // console.log('$(event)');
    
//     // console.log(this.data.data.image);
//   }

//    increment(p) {
//     this.currentNumber = this.currentNumber + 1;
//     this.event.quantity = this.currentNumber
//   }

//    decrement(p) {
//     if (this.currentNumber > 1) {
//       this.currentNumber = this.currentNumber - 1;
//       this.event.quantity = this.currentNumber;
//     }
//     return this.currentNumber;
//   }

//   ionViewWillEnter(event) {
//     this.Products.push(this.data.data)
//     console.log("rrtrtrtrt", this.Products);
    
//     this.proSales.push(this.data.data)
//   }
//   selectedSize(size) {
//     let val = size.toElement.value
//     if (this.sizes == val) {
//       this.sizes = null
//     } else {
//       this.sizes = size.toElement.value
//     }
//     console.log(this.sizes);

//     switch (val) {
//       case 'S':
//         this.productSize = {
//           small: true,
//           medium: false,
//           large: false
//         }
//         break;
//       case 'M':
//         this.productSize = {
//           small: false,
//           medium: true,
//           large: false
//         }
//         break;
//       case 'L':
//         this.productSize = {
//           small: false,
//           medium: false,
//           large: true
//         }
//         break;
//     }

//   }

//   async createModalLogins() {
//     const modal = await this.modalController.create({
//       component: LoginPage,
//       cssClass: 'login-register',
      

      
//     });
//     // this.success()
//     return await modal.present();
    
//   }
  
//   addToCart(i) {
//     // console.log("qqqqqqq  ", i);

//     // let obj = {obj : {
//     //   categories : i.obj.categories,
//     //   desc : i.obj.desc,
//     //   image : i.obj.image,
//     //   items : i.obj.items,
//     //   lastcreated : i.obj.lastcreated,
//     //   name : i.obj.name,
//     //   price : i.obj.price,
//     //   productCode : i.obj.productCode,
//     //   quantity : i.obj.quantity,
//     //   size : i.obj.size,
//     //   uid : firebase.auth().currentUser.uid
//     // }}

//     // firebase.firestore().collection("Cart").doc().set(obj)

//     // setTimeout(() => {

//     //   obj = {obj : {
//     //     categories :"",
//     //     desc :"",
//     //     image  :"",
//     //     items  :"",
//     //     lastcreated :"" ,
//     //     name :"",
//     //     price  :"",
//     //     productCode :"",
//     //     quantity : "" ,
//     //     size : [],
//     //     uid : "",
//     //     status:''
//     //   }}
      
//     // }, 2000);


//     // this.dismiss();
    
//     if(firebase.auth().currentUser == null) {
//       console.log('please login');
//       this.ConfirmationAlert();
//     this.createModalLogins();

      
//     }else {
//       this.customerUid = firebase.auth().currentUser.uid;
//          let customerUid = firebase.auth().currentUser.uid;

//     console.log(i);
//     this.dbCart.add({
//       id: this.id,
//       timestamp: new Date().getTime(),
//       customerUid: this.customerUid,
//        product_name: i.obj.name,
//       productCode: i.obj.productCode,
//       desc: i.obj.desc,
//       status:'received',
//       size: this.sizes,
//       price: i.obj.price,
//       quantity: this.event.quantity,
//       image: i.obj.image,
//       amount: i.obj.price * this.event.quantity
//     })
//     this.cartItemCount.next(this.cartItemCount.value + 1);
//     this.dismiss();
//     this.toastPopover(event)
//     }

 
//   }
//   getCartItemCount() {
//     return this.cartItemCount;
//   }
//   getWishItemCount() {
//     return this.cartItemCount;
//   }
//   createModalLogin() {
//     throw new Error("Method not implemented.");
//   }
//   toastController(arg0: string) {
//     throw new Error("Method not implemented.");
//   }

//   dismiss(){
//   this.modalController.dismiss({
//     'dismissed':true
//   });
// }
// logRatingChange(rating, id){
//  // console.log("changed rating: ",rating);
//   // do your stuff
//   this.dbRating.add({
//     rate: rating,
//     user: firebase.auth().currentUser.uid,
//     prod: id
//   })
// }

//   ////////
//   /////
//   // async toastController(message) {
//   //   let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
//   //   return toast.present();
//   // }


//   star1(value, key){
//     console.log("Method called", key.id, "value ", value); 

   
  
//     firebase.firestore().collection("Rating").doc(key.id).set({
//       id : key,
//       ratings : value
//     }, {merge : true})

//   }


//   addWishlist(i) {

//     console.log("Method Called ", i);
//       if(firebase.auth().currentUser == null){
//          console.log('please like this');
//          this.ConfirmationAlertWish();
//          this.createModalLogins()
//        }else{
//         this.customerUid = firebase.auth().currentUser.uid;
//         firebase.firestore().collection("WishList").doc().set({
  

//             uid : firebase.auth().currentUser.uid,
//             checked : false,
//             categories : i.obj.categories,
//             desc : i.obj.desc,
//             image : i.obj.image,
//             items : i.obj.items,
//             lastcreated : i.obj.lastcreated,
//             name : i.obj.name,
//             price : i.obj.price,
//             productCode : i.obj.productCode,
//             quantity : i.obj.quantity,
//             size : i.obj.sizes

         
//         })
//         // this.presentToast('ev')
//        }
//        this.wishItemCount.next(this.wishItemCount.value + 1);
//        this.dismiss();
//   //  if(firebase.auth().currentUser == null){
//   //    console.log('please like this');
//   //    this.ConfirmationAlertWish();
//   //   //  this.createModalLogins()

//   //  }else{
//   //   this.customerUid = firebase.auth().currentUser.uid; 
//   //     this.dbWishlist.add({
//   //     timestamp: new Date().getTime(),
//   //     customerUid: this.customerUid,
//   //     product_name: i.name,
//   //     productCode: i.productCode,
//   //     desc: i.desc,
//   //     size: this.sizes,
//   //     price: i.price,
//   //     quantity: this.event.quantity,
//   //     image: i.image,
//   //     amount: i.price * this.event.quantity
//   //         // product_name: i.name,
//   //         // productCode: i.productCode,
//   //         // size: this.sizes,
//   //         // price: i.price,
//   //         // quantity: this.event.quantity,
//   //         // image: i.image,
//   //     }).then(() => {
//   //       this.dismiss();
//   //       this.presentToast('ev')
//   //     })
//   //       .catch(err => {
//   //         console.error(err);
//   //       });
//   //  }

//   //       this.wishItemCount.next(this.wishItemCount.value + 1);

//     } 


//     //   if(firebase.auth().currentUser == null) {
//       // console.log('please login');
//       // this.ConfirmationAlert();
//       // this.createModalLogins();
  
        
//       // }else {
//       //   this.customerUid = firebase.auth().currentUser.uid;
//   async toastPopover(ev) {
//     const popover = await this.popoverController.create({
//       component:Popover2Component,
//       event: ev,
      
//       // cssClass: 'pop-over-style',
//       translucent: true,
//     });
    
//    popover.present();
//     setTimeout(()=>popover.dismiss(),500);
    
    
//   }
//   async presentToast(ev) {
//     const popover = await this.popoverController.create({
//       component:Popover3Component,
//       event: ev,
      
//       // cssClass: 'pop-over-style',
//       translucent: true,
//     });
    
//    popover.present();
//     setTimeout(()=>popover.dismiss(),500);
    
//   }

//   ConfirmationAlert(){
//     Swal.fire({
//       title: 'Please login/sign up before adding items to your cart',
//       showClass: {
//         popup: 'animated fadeInDown faster'
//       },
//       hideClass: {
//         popup: 'animated fadeOutUp faster'
//       }
//     })
//     this.dismiss()
//    this.createModalLogins();
//    }


//    ConfirmationAlertWish(){
//     Swal.fire({
//       title: 'Please login/sign up before adding items to your wishlist',
//       showClass: {
//         popup: 'animated fadeInDown faster'
//       },
//       hideClass: {
//         popup: 'animated fadeOutUp faster'
//       }
//     })
//     this.dismiss()
//    this.createModalLogins();
//    }

//    success(){
//     Swal.fire({
//       icon: 'success',
//       title: 'Logged in successfully ',
//       showClass: {
//         popup: 'animated fadeInDown faster'
//       },
//       hideClass: {
//         popup: 'animated fadeOutUp faster'
//       },
//       showConfirmButton: false,
//       timer: 500
//     })
//    }
// }



import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, ToastController, AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/services/product-service.service';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { Popover2Component } from 'src/app/components/popover2/popover2.component';
import { LoginPage } from '../login/login.page';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';
import { Popover3Component } from 'src/app/components/popover3/popover3.component';


@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.page.html',
  styleUrls: ['./view-product-details.page.scss'],
})
export class ViewProductDetailsPage implements OnInit {
  cartItemCount:BehaviorSubject<number>;
  wishItemCount: BehaviorSubject<number>;
  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;
  dbWishlist = firebase.firestore().collection('Wishlist');
  dbRating = firebase.firestore().collection('Rating');
 
  customerUid: any;
  dbCart = firebase.firestore().collection('Cart');
   
   currentNumber: number = 1;
  Products = [];
  proSales = [];
  sizes = null;
  MyObj = [];
  event = {
    image: '',
    categories: '',
    name: '',
    price: 0,
    productno: '',
    desc: null,
    small: '',
    medium: '',
    large: '',
    quantity: 1,
    amount: 0,
    total: 0
  };
  productSize = {
    small: false,
    medium: false,
    large: false
  }
  id
  image = ""
  constructor(public modalController: ModalController,
    public productService: ProductService,
    public data: ProductService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public cartService: CartServiceService,
    private router: Router,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.wishItemCount = this.cartService.getWishItemCount();
    this.cartItemCount = this.cartService.getCartItemCount();
    console.log("Data in the view Details ", this.data.data);
    // console.log('$(event)');
    
    // console.log(this.data.data.image);
  }

   increment(p) {
    this.currentNumber = this.currentNumber + 1;
    this.event.quantity = this.currentNumber
  }

   decrement(p) {
    if (this.currentNumber > 1) {
      this.currentNumber = this.currentNumber - 1;
      this.event.quantity = this.currentNumber;
    }
    return this.currentNumber;
  }

  ionViewWillEnter(event) {
    this.Products.push(this.data.data)
    console.log("rrtrtrtrt", this.Products);
    
    this.proSales.push(this.data.data)
  }
  selectedSize(size) {
    let val = size.toElement.value
    if (this.sizes == val) {
      this.sizes = null
    } else {
      this.sizes = size.toElement.value
    }
    console.log(this.sizes);

    switch (val) {
      case 'S':
        this.productSize = {
          small: true,
          medium: false,
          large: false
        }
        break;
      case 'M':
        this.productSize = {
          small: false,
          medium: true,
          large: false
        }
        break;
      case 'L':
        this.productSize = {
          small: false,
          medium: false,
          large: true
        }
        break;
    }

  }

  async createModalLogins() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'login-register',
      

      
    });
    // this.success()
    return await modal.present();
    
  }
  
  addToCart(i) {
    
    if(firebase.auth().currentUser == null) {
      console.log('please login');
      this.ConfirmationAlert();
    this.createModalLogins();

      
    }else {
      this.customerUid = firebase.auth().currentUser.uid;
         let customerUid = firebase.auth().currentUser.uid;

    console.log(i);
    this.dbCart.add({
      id: this.id,
      timestamp: new Date().getTime(),
      customerUid: this.customerUid,
       product_name: i.obj.name,
      productCode: i.obj.productCode,
      desc: i.obj.desc,
      status:'received',
      size: this.sizes,
      price: i.obj.price,
      quantity: this.event.quantity,
      image: i.obj.image,
      amount: i.obj.price * this.event.quantity
    })
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.dismiss();
    this.toastPopover('ev')
    }

 
  }
  getCartItemCount() {
    return this.cartItemCount;
  }
  getWishItemCount() {
    return this.cartItemCount;
  }
  createModalLogin() {
    throw new Error("Method not implemented.");
  }
  toastController(arg0: string) {
    throw new Error("Method not implemented.");
  }

  dismiss(){
  this.modalController.dismiss({
    'dismissed':true
  });
}
logRatingChange(rating, id){
 // console.log("changed rating: ",rating);
  // do your stuff
  this.dbRating.add({
    rate: rating,
    user: firebase.auth().currentUser.uid,
    prod: id
  })
}

  ////////
  /////
  // async toastController(message) {
  //   let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
  //   return toast.present();
  // }



  
  star1(value, key){
    console.log("Method called", key.id, "value ", value); 

   
  
    firebase.firestore().collection("Products").doc(key.id).set({
      ratings : value
    }, {merge : true})

  }

  addWishlist(i) {

    console.log("Method Called ", i);
      if(firebase.auth().currentUser == null){
         console.log('please like this');
         this.ConfirmationAlertWish();
         this.createModalLogins()
       }else{
        this.customerUid = firebase.auth().currentUser.uid;
        firebase.firestore().collection("WishList").doc().set({
  
          obj : {
            uid : firebase.auth().currentUser.uid,
            checked : false,
            categories : i.obj.categories,
            desc : i.obj.desc,
            image : i.obj.image,
            items : i.obj.items,
            lastcreated : i.obj.lastcreated,
            name : i.obj.name,
            price : i.obj.price,
            productCode : i.obj.productCode,
            quantity : i.obj.quantity,
            size : i.obj.size
          },
         
        })
        // this.presentToast('ev')
       }
       this.wishItemCount.next(this.wishItemCount.value + 1);
       this.dismiss();
  //  if(firebase.auth().currentUser == null){
  //    console.log('please like this');
  //    this.ConfirmationAlertWish();
  //   //  this.createModalLogins()

  //  }else{
  //   this.customerUid = firebase.auth().currentUser.uid; 
  //     this.dbWishlist.add({
  //     timestamp: new Date().getTime(),
  //     customerUid: this.customerUid,
  //     product_name: i.name,
  //     productCode: i.productCode,
  //     desc: i.desc,
  //     size: this.sizes,
  //     price: i.price,
  //     quantity: this.event.quantity,
  //     image: i.image,
  //     amount: i.price * this.event.quantity
  //         // product_name: i.name,
  //         // productCode: i.productCode,
  //         // size: this.sizes,
  //         // price: i.price,
  //         // quantity: this.event.quantity,
  //         // image: i.image,
  //     }).then(() => {
  //       this.dismiss();
  //       this.presentToast('ev')
  //     })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //  }

  //       this.wishItemCount.next(this.wishItemCount.value + 1);

    } 


    //   if(firebase.auth().currentUser == null) {
      // console.log('please login');
      // this.ConfirmationAlert();
      // this.createModalLogins();
  
        
      // }else {
      //   this.customerUid = firebase.auth().currentUser.uid;
  async toastPopover(ev) {
    const popover = await this.popoverController.create({
      component:Popover2Component,
      event: ev,
      
      // cssClass: 'pop-over-style',
      translucent: true,
    });
    
   popover.present();
    setTimeout(()=>popover.dismiss(),500);
    
    
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

  ConfirmationAlert(){
    Swal.fire({
      title: 'Please login/sign up before adding items to your cart',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    })
    this.dismiss()
   this.createModalLogins();
   }


   ConfirmationAlertWish(){
    Swal.fire({
      title: 'Please login/sign up before adding items to your wishlist',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    })
    this.dismiss()
   this.createModalLogins();
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
}