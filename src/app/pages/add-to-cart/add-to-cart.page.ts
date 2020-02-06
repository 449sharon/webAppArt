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
​ quantity = 1;
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
​id

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
​
  ionViewWillLeave(){
​
  }
  value
  trackOrder(){
    this.dbOrder.onSnapshot(res =>{
      console.log('I am a snapshot',res);
      
      for(let key in res.docChanges()){
        let change = res.docChanges()[key]
        if(change.type === 'modified'){
          console.log(change.doc.data().date);
          this.value = change.doc.data().date
          console.log(this.value);
          
        }
      }
    })
  }
​
  getProducts() {

    let obj = {
      obj : {},
      id : ''
    };
    firebase.firestore().collection("Cart").onSnapshot(snapshot => {
      this.cartProduct = [];
    if (snapshot.empty) {
              this.myProduct = false;
            } else {
              this.myProduct = true;
              snapshot.forEach(doc =>{
                obj = {
                  obj : doc.data(),
                  id : doc.id
                };
                this.cartProduct.push(obj)

              });
            }
          });
          
          //////////////////////////////////////////////////////////////
    // firebase.firestore().collection("Cart").onSnapshot(data => {
    //   this.cartProduct = [];
    //   data.forEach(item => {
    //     if(item.data().obj.uid == firebase.auth().currentUser.uid){
    //       this.cartProduct.push(item.data().obj)
    //     }
    //   })
    // })

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
    console.log("I am deleting you", id);
    this.cartItemCount.next(this.cartItemCount.value - 1);
    
  }
 
  getTotal() {
    return this.cartProduct.reduce((i, j) => i + j.obj.price * j.obj.quantity, 0); 
  }
   ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// group orders together.
  placeOrder(){
    ​    let inside = this.getTotal();
        console.log('hereTtooo ', inside);
        this.orderProd=[];
        let key = Math.floor(Math.random()*100000);
       for (let j = 0; j < this.cartProduct.length; j++) {
        console.log('Products ', this.cartProduct[j]);
        this.orderProd.push(this.cartProduct[j]);
       } 
      if(this.cartProduct.length === 0){
        this.toastController('You cannot place order with empty Cart');
      }else{
        this.dbOrder.doc('Pitseng'+ key).set({
          totalPrice:inside,
          date: moment().format('MMMM Do YYYY, h:mm:ss a'),
          product: this.orderProd,
          name: this.name,
          size : this.sizes,
          // productCode:this.productCode,
          userID: firebase.auth().currentUser.uid,
          pdfLink : "",
          status:'received',
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
      }
    
    async toastController(message) {
      let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
      return toast.present();
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
