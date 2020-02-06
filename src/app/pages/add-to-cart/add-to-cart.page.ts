import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import * as moment from 'moment'
import { ConfirmationPage } from '../confirmation/confirmation.page';

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
  quantity = 1;
  name;
  productCode;
  key;
  total = 0;
  // cart = [];
  // myArr = [];
  amount: number;
  dbCart = firebase.firestore().collection('Cart');
  dbOrder = firebase.firestore().collection('Order');
  dbUser = firebase.firestore().collection('UserProfile');
  cartProduct = [];
  orderProd = [];
  loader: boolean = true;
  tempIndex: any;
  myProduct: boolean;
  id

  constructor(public modalController: ModalController,
    public toastCtrl: ToastController) {
    this.dbUser.doc(firebase.auth().currentUser.uid).onSnapshot(element => {
      console.log(element.data());
      this.name = element.data().name
    })
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {
    this.getProducts();
    this.trackOrder();

  }

  ionViewWillLeave() {

  }
  value
  trackOrder() {
    this.dbOrder.onSnapshot(res => {
      console.log('I am a snapshot', res);

      for (let key in res.docChanges()) {
        let change = res.docChanges()[key]
        if (change.type === 'modified') {
          console.log(change.doc.data().date);
          this.value = change.doc.data().date
          console.log(this.value);

        }
      }
    })
  }

  getProducts() {
    firebase.firestore().collection("Cart").where("customerUid", "==", firebase.auth().currentUser.uid).onSnapshot(snapshot => {
      this.cartProduct = [];
      snapshot.forEach(doc => {
        this.cartProduct.push({ obj: doc.data(), id: doc.id })
      });
    });
  }
  plus(prod, index) {
    let id = prod.id
    this.dbCart.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(1) }).then(res => {

    })

  }
  minus(prod, index) {
    let id = prod.id
    if (prod.obj.quantity === 1) {
     this.toastController("You have reached minimum quantity");
    } else {
      this.dbCart.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(-1) }).then(res => {

      })
    }
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  private increment(p) {
    this.currentNumber = this.currentNumber + 1;
    this.cartProduct[p].quantity = this.currentNumber
  }

  private decrement(p) {
    if (this.currentNumber > 1) {
      this.currentNumber = this.currentNumber - 1;
      this.cartProduct[p].quantity = this.currentNumber;
    }
    return this.currentNumber;
  }
  decreaseCartItem(p) {
    this.cartProduct[p].prod.quantity--;
  }

  increaseCartItem(p) {
    console.log(p);
    this.cartProduct[p].prod.quantity++;
  }

  removeCartItem(id) {
    this.dbCart.doc(id).delete();
    console.log("I am deleting you", id);
  }

  getTotal() {
    return this.cartProduct.reduce((i, j) => i + j.price * j.quantity, 0);
  }
  ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// group orders together.
  placeOrder() {
    let inside = this.getTotal();
    console.log('hereTtooo ', inside);
    this.orderProd = [];
    let key = Math.floor(Math.random() * 100000);
    for (let j = 0; j < this.cartProduct.length; j++) {
      console.log('Products ', this.cartProduct[j]);
      this.orderProd.push(this.cartProduct[j]);
    }
    if (this.cartProduct.length === 0) {
      this.toastController('You cannot place order with empty Cart');
    } else {
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
        this.dbCart.where('customerUid', '==', firebase.auth().currentUser.uid).onSnapshot((res) => {
          res.forEach((i) => {
            this.dbCart.doc(i.id).delete();
          })
        })
      })
      console.log('My prod ', this.orderProd);
      this.dismiss();
      this.SuccessModal(key);
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
