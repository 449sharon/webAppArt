// import { Component, OnInit } from '@angular/core';
// import { ModalController, ToastController } from '@ionic/angular';
// import { BehaviorSubject } from 'rxjs';
// import * as firebase from 'firebase';
// import * as moment from 'moment'
// import { ConfirmationPage } from '../confirmation/confirmation.page';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// @Component({
//   selector: 'app-add-to-cart',
//   templateUrl: './add-to-cart.page.html',
//   styleUrls: ['./add-to-cart.page.scss'],
// })
// export class AddToCartPage implements OnInit {
//   private cartItemCount = new BehaviorSubject(0);
//   private currentNumber: number = 1;
//   customerUid = firebase.auth().currentUser.uid;
//   mysize: string = '';
//   sizes = [];
//   quantity = 1;
//   name;
//   productCode;
//   key;
//   total = 0;
//   myCart: Boolean = false;
//   // cart = [];
//   // myArr = [];
//   amount: number;
//   dbCart = firebase.firestore().collection('Cart');
//   dbOrder = firebase.firestore().collection('Order');
//   dbUser = firebase.firestore().collection('UserProfile');
//   cartProduct = [];
//   orderProd = [];
//   loader: boolean = true;
//   tempIndex: any;
//   myProduct: boolean;
//   id
//   dataInTheCart = []
//   constructor(public modalController: ModalController,
//     public toastCtrl: ToastController) {
//     this.dbUser.doc(firebase.auth().currentUser.uid).onSnapshot(element => {
//       console.log(element.data());
//       this.name = element.data().name
//     })
//   }
//   ionViewWillEnter() {
//     setTimeout(() => {
//       this.loader = false;
//     }, 2000);
//   }
//   ngOnInit() {

//     firebase.firestore().collection("Cart").where('uid', '==', firebase.auth().currentUser.uid).get().then((result : any) => {
//       console.log(result);
//       //this.myCart
//       for(let key in result.docs){
//         this.cartProduct.push(result.docs[key].data())
//       }
//       if(this.cartProduct.length > 0){
//         this.myCart = true
//       }else{
//         this.myCart = false
//       }
//     }).then( result => {
//       console.log(this.cartProduct);
      
//     })

    
//     //this.getProducts();
//     this.trackOrder();
//   }
//   ionViewWillLeave() {
//   }
//   value
//   trackOrder() {
//     this.dbOrder.onSnapshot(res => {
//     //  console.log('I am a snapshot', res);
//       for (let key in res.docChanges()) {
//         let change = res.docChanges()[key]
//         if (change.type === 'modified') {
//        //   console.log(change.doc.data().date);
//           this.value = change.doc.data().date
//         //  console.log(this.value);
//         }
//       }
//     })
//   }
//   getProducts() {
//     firebase.firestore().collection("Cart").where("customerUid", "==", firebase.auth().currentUser.uid).onSnapshot(snapshot => {
//       if( this.cartProduct = []){
//         this.myCart = true;
//     snapshot.forEach(doc => {
//       let obj = { obj: doc.data(), id: doc.id }
//         this.cartProduct.push(obj)
//        console.log("my products", obj)
//       });
//       }else{
//       }
     
  
//     });
//   }
//   plus(prod, index) {
//     let id = prod.id
//     this.dbCart.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(1) }).then(res => {
//     })
//   }
//   minus(prod, index) {
//     let id = prod.id
//     if (prod.obj.quantity === 1) {
//      this.toastController("You have reached minimum quantity");
//     } else {
//       this.dbCart.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(-1) }).then(res => {
//       })
//     }
//   }
//   dismiss() {
//     this.modalController.dismiss({
//       'dismissed': true
//     });
//   }
//   private increment(p) {
//     this.currentNumber = this.currentNumber + 1;
//     this.cartProduct[p].quantity = this.currentNumber
//   }
//   private decrement(p) {
//     if (this.currentNumber > 1) {
//       this.currentNumber = this.currentNumber - 1;
//       this.cartProduct[p].quantity = this.currentNumber;
//     }
//     return this.currentNumber;
//   }
//   decreaseCartItem(p) {
//     this.cartProduct[p].prod.quantity--;
//   }
//   increaseCartItem(p) {
//     console.log(p);
//     this.cartProduct[p].prod.quantity++;
//   }
//   removeCartItem(id) {
//     this.dbCart.doc(id).delete();
//     console.log("I am deleting you", id);
//   }
//   getTotal() {
//     return this.cartProduct.reduce((i, j) => i + j.price * j.quantity, 0);
//   }
//   ////////////////////////////////////////////////////////////////////////////////////
//   //////////////////////// group orders together.
//   placeOrder() {
//     let inside = this.getTotal();
//     console.log('hereTtooo ', inside);
//     this.orderProd = [];
//     let key = Math.floor(Math.random() * 100000);
//     for (let j = 0; j < this.cartProduct.length; j++) {
//       console.log('Products ', this.cartProduct[j]);
//       this.orderProd.push(this.cartProduct[j]);
//     }
//     if (this.cartProduct.length === 0) {
//       this.toastController('You cannot place order with empty Cart');
//     } else {
//       console.log(inside);
      
//       this.dbOrder.doc('Pitseng' + key).set({
//         totalPrice: inside,
//         date: moment().format('MMMM Do YYYY, h:mm:ss a'),
//         product: this.orderProd,
//         name: this.name,
//         size: this.sizes,
//         // productCode:this.productCode,
//         userID: firebase.auth().currentUser.uid,
//         pdfLink: "",
//         // status: 'received',
//         orderNumber: 'Pitseng' + key
//       }).then(() => {
//         this.dbCart.where('customerUid', '==', firebase.auth().currentUser.uid).onSnapshot((res) => {
//           res.forEach((i) => {
//             console.log(this.dbCart.doc(i.id));
            
//             this.dbCart.doc(i.id).delete();
//           })
//         })
//       })
//       console.log('My prod ', this.orderProd);
//       this.dismiss();
//       this.SuccessModal(key);
//     }
//   }
 
//   async toastController(message) {
//     let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
//     return toast.present();
//   }
//   async SuccessModal(key) {
//     const modal = await this.modalController.create({
//       component: ConfirmationPage,
//       componentProps: { id: key, total: this.total },
//       cssClass: 'confirmation',
//     });
//     return await modal.present();
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import * as moment from 'moment'
import { ConfirmationPage } from '../confirmation/confirmation.page';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.page.html',
  styleUrls: ['./add-to-cart.page.scss'],
})
export class AddToCartPage implements OnInit {
  private cartItemCount = new BehaviorSubject(0);
  private currentNumber: number = 1;
  customerUid = firebase.auth().currentUser.uid;
  mysize: string = '';
  sizes = [];
  quantity 
  name;
  productCode;
  key;
  total = 0;
  myCart  = false;
  // cart = [];
  // myArr = [];
  amount: number;
  dbCart = firebase.firestore().collection('Cart');
  dbOrder = firebase.firestore().collection('Order');
  dbUser = firebase.firestore().collection('UserProfile');
  cartProduct = [];
  cartProduct1 = []
  orderProd = [];
  loader: boolean = true;
  tempIndex: any;
  myProduct: boolean;
  id

  // dataInTheCart = []

  constructor(public modalController: ModalController,
    private router: Router,
    public toastCtrl: ToastController) {
    this.dbUser.doc(firebase.auth().currentUser.uid).onSnapshot(element => {
      console.log(element.data());
      this.name = element.data().name
    })
  }

  ionViewWillEnter() {
    // this.getProducts();
    // if(this.cartProduct.length === 0){
    //   console.log('cart is empty',this.cartProduct.length)
    //   document.getElementById("empty").style.display = "block";
    // }else{
    //   console.log('there is somthing inthe cart',this.cartProduct.length)
    //   document.getElementById("empty").style.display = "none";
      
    // }

    setTimeout(() => {
     
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {


//Get data from the Cart

    firebase.firestore().collection("MyCart").onSnapshot(snapshot => {
      this.cartProduct1 = []
      let obj = { obj: {}, id: "" }
      snapshot.forEach(item => {
        if(item.data().customerUid ==  firebase.auth().currentUser.uid){
          let obj = { obj: item.data(), id: item.id }
          this.cartProduct1.push(obj)
          console.log("my items in the cart ", obj);
          obj = { obj: {}, id: "" }    
          
                
        }
      })

    });


   
    this.trackOrder();
   
  }

  ionViewWillLeave() {

  }
  value
  trackOrder() {
    this.dbOrder.onSnapshot(res => {
    //  console.log('I am a snapshot', res);

      for (let key in res.docChanges()) {
        let change = res.docChanges()[key]
        if (change.type === 'modified') {
       //   console.log(change.doc.data().date);
          this.value = change.doc.data().date
        //  console.log(this.value);

        }
      }
    })
  }



  // plus(prod, index) {
  //   let id = prod.id
  //   this.dbCart.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(1) }).then(res => {

  //   })

  // }


  // minus(prod, id) {
  //   // let id = prod.id
  //   if (prod.obj.quantity === 1) {
  //    this.toastController("You have reached minimum quantity");
  //   } else {
  //     this.dbCart.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(-1) }).then(res => {

  //     })
  //   }
  // }

  

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
 

  // increment() {
  //   this.currentNumber = this.currentNumber + 1;
  //   this.cartProduct1.quantity = this.currentNumber
  // }

  //  decrement() {
  //   if (this.currentNumber > 1) {
  //     this.currentNumber = this.currentNumber - 1;
  //     this.cartProduct1.quantity = this.currentNumber;
  //   }
  //   return this.currentNumber;
  // }
  
  increment(i) {

    i.obj.quantity += 1
    console.log("dfsdf ", i);
  }

   decrement(i) {

  
   

    if ( i.obj.quantity > 1) {
      i.obj.quantity -= 1
      console.log("dfsdf ", i);
      // this.currentNumber = this.currentNumber - 1;
      // this.quantity = this.currentNumber;
    }
    return this.currentNumber;

  }

//   plus(prod, index) {
//     let id = prod.id
//     this.dbCart.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(1) }).then(res => {
// ​
//     })
// ​
//   }
// ​
// ​
//   minus(prod, id) {
//     // let id = prod.id
//     if (prod.obj.quantity === 1) {
//      this.toastController("You have reached minimum quantity");
//     } else {
//       this.dbCart.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(-1) }).then(res => {
// ​
//       })
//     }
//   }
​
  decreaseCartItem(p) {
    this.cartProduct[p].prod.quantity--;
  }

  increaseCartItem(p) {
    console.log(p);
    this.cartProduct[p].prod.quantity++;
  }

  removeCartItem(id) {

    firebase.firestore().collection("MyCart").doc(id).delete()
    console.log("I am deleting you", id);
    // this.router.navigateByUrl('/add-to-cart');
  
  }

  async createAddToWishList() {
    const modal = await this.modalController.create({
      component:AddToCartPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }


  getTotal() {
    return this.cartProduct1.reduce((i, j) => i + j.obj.price * j.obj.quantity, 0);
  }

  ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// group orders together.
  placeOrder(arr) {
    for (let i = 0; i < arr.length; i++) {
      firebase.firestore().collection("MyCart").onSnapshot(snapshot => {
        snapshot.forEach(item => {
          if (item.id === arr[i].id) {
            console.log("error adding");
            
          } else {
            let inside = this.getTotal();
            console.log('hereTtooo ', inside);
            this.orderProd = [];
            let key = Math.floor(Math.random() * 100000);
            for (let j = 0; j < this.cartProduct1.length; j++) {
              console.log('Products ', this.cartProduct1[j]);
              this.orderProd.push(this.cartProduct1[j]);
            }
            if (this.cartProduct1.length === 0) {
        
              
              this.toastController('You cannot place order with empty Cart');
              this.myCart=false
            } else {
              this.myCart=true
              this.dbOrder.doc('Pitseng' + key).set({
                totalPrice: inside,
                date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                product: this.orderProd,
                name: this.name,
                size: this.sizes,
                // productCode:this.productCode,
                userID: firebase.auth().currentUser.uid,
                pdfLink: "",
                status: 'received',
                orderNumber: 'Pitseng' + key
              }).then(() => {

                  firebase.firestore().collection("MyCart").onSnapshot(data => {
                    data.forEach(item => {
                      if(item.data().customerUid == firebase.auth().currentUser.uid){
                             firebase.firestore().collection("MyCart").doc(item.id).delete()
                      }
                    })
                  })
              })
              console.log('My prod ', this.orderProd);
              this.dismiss();
              this.SuccessModal(key);
            }
          }
        })
      });
    }
  }


  //   if (this.prodCart.length === 0) {
  //     this.toastController('You cannot place order with empty basket');
  //   } else {
  //     let docname = 'ZXY' + Math.floor(Math.random() * 10000000);
  //     this.dbOrder.doc(docname).set({ 
  //       product: myArr, 
  //       timestamp: new Date().getTime(), 
  //       status: 'received', 
  //       userID: firebase.auth().currentUser.uid, 
  //       totalPrice: this.getTotal() }).then(() => {
  //       doc.forEach((id) => {
  //         this.dbCart.doc(id).delete();
  //       })
  //       this.router.navigate(['payment', docname])
  //     })
  //   }
  // }
  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
  }
  async SuccessModal(key) {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      componentProps: { id: key, total: this.total },
      cssClass: 'confirmation',
    });
    return await modal.present();
  }


  // async createConfirmation() {
  //   const modal = await this.modalController.create({
  //     component:ConfirmationPage,
  //     cssClass: 'confirmation',


  //   });
  //   return await modal.present();
  // }

}