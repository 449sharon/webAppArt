import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  mysize: string = '';
 sizes = [];
​ quantity = 1;
  name;
  productCode;
  key;
  total = 0;
  cart = [];
  myArr = [];
  amount: number;
  dbCart = firebase.firestore().collection('Cart');
  dbOrder = firebase.firestore().collection('Order');
  dbUser = firebase.firestore().collection('UserProfile');
  cartProduct = [];
  orderProd = [];
  loader: boolean = true;
​

  constructor(public modalController: ModalController) {
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
  }
​
  ionViewWillLeave(){
​
  }
​
  getProducts() {
    this.dbCart.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
      this.cartProduct = [];
      res.forEach((doc)=>{
        
        this.cartProduct.push({id: doc.id,prod:doc.data()});
        console.log("oooh", this.cartProduct );   
    // return this.total = this.total + parseFloat(doc.data().price) * parseFloat(doc.data().quantity);
      })
    })
  }
 

  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }
  private increment (p) {
    this.currentNumber = this.currentNumber + 1;
    this.cartProduct[p].quantity = this.currentNumber
  }
  
  private decrement (p) {
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
  }
 
  getTotal() {
    return this.cartProduct.reduce((i, j) => i + j.prod.price * j.prod.quantity, 0); 
  }
   ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// group orders together.
  placeOrder(){
    ​
        let inside = this.getTotal();
        console.log('hereTtooo ', inside);
        this.orderProd=[];
        let key = Math.floor(Math.random()*100000);
       for (let j = 0; j < this.cartProduct.length; j++) {
        console.log('Products ', this.cartProduct[j]);
        this.orderProd.push(this.cartProduct[j]);
       }
       this.dbOrder.doc('Pitseng'+ key).set({
         totalPrice:inside,
         date: moment().format('MMMM Do YYYY, h:mm:ss a'),
         product: this.orderProd,
         name: this.name,
         size : this.sizes,
        //  productCode:this.productCode,
         userID: firebase.auth().currentUser.uid,
         pdfLink : "",
         orderNumber:'Pitseng'+key
        }).then(() => {
              this.dbCart.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
                res.forEach((i)=>{
                  this.dbCart.doc(i.id).delete();
                })
            })
       })
        console.log('My prod ', this.orderProd);
         this.dismiss(); 
         this.SuccessModal(key);
      }
      async SuccessModal(key) {
        const modal = await this.modalController.create({
          component: ConfirmationPage,
          componentProps: {id : key, total : this.total },
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
