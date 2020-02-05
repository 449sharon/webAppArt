import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { CartServiceService } from 'src/app/services/cart-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-to-wish-list',
  templateUrl: './add-to-wish-list.page.html',
  styleUrls: ['./add-to-wish-list.page.scss'],
})
export class AddToWishListPage implements OnInit {
  private cartItemCount = new BehaviorSubject(0);
  private wishItemCount = new BehaviorSubject(0);
  //db = firebase.firestore();
   db = firebase.database();
   dbCart = firebase.firestore().collection('Cart');
  cart = [];
  myArr = [];
  mysize: string = '';
  sizes = [];
  quantity : number = 1;
  checkbox=[];
  checked : boolean = false;
  name;
  key;
  total = 0;
  loader: boolean = true;
  amount: number;
  dbWishlist = firebase.firestore().collection('Wishlist');
  ///
  myProd = [];
  dbOrder = firebase.firestore().collection('Order');
  dbUser = firebase.firestore().collection('UserProfile');
  cartProduct = [];
  orderProd = [];
  currentNumber = 1;
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
  productCode: any;
  constructor(public modalController: ModalController,
    public toastController : ToastController,
    private cartService: CartServiceService,
    private alertCtrl: AlertController) {
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
  getProducts() {
    console.log("mylist....");
    
      this.dbWishlist.onSnapshot((res)=>{
      this.cart = [];
      let obj = {obj : {}, id : ""}
      res.forEach((doc)=>{

        obj.obj = doc.data()
        obj.id = doc.id

        this.cart.push(obj);
        obj = {obj : {}, id : ""}
        let i = this.cart.length
        this.cart[i -1]['productID'] 
console.log("vvv", this.cart);
      })
    })
  }
  addToCart() {

    console.log("my list");
    
    // let customerUid = firebase.auth().currentUser.uid;

    // console.log(i);
    // this.dbCart.add({
    //   timestamp: new Date().getTime(),
    //   // customerUid: customerUid,
    //   product_name: i.name,
    //   productCode: i.event.productCode,
    //   desc: i.desc,
    //   size: this.sizes,
    //   price: i.price,
    //   quantity: this.event.quantity,
    //   image: i.image,
    //   amount: i.price * this.event.quantity
    // })
    // this.cartItemCount.next(this.cartItemCount.value + 1);
    // this.dismiss();

        this.myProd=[];
       for (let j = 0; j < this.cart.length; j++) {
        console.log('Products ', this.cart[j]);
        this.myProd.push(this.cart[j]);
       }
       this.dbCart.doc().set({
         product: this.myProd
        }).then(() => {
          
              this.dbWishlist.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
                res.forEach((i)=>{
                  console.log("Delete all the items on my wishlist", i);
                  this.dbWishlist.doc(i.id).delete();
                })
            })
       })
        console.log('My prod ', this.myProd);
         this.dismiss(); 
  }

  getCartItemCount() {
    return this.cartItemCount;
  }
  
  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }
  decreaseCartItem() {
    if (this.currentNumber > 1) {
      this.currentNumber = this.currentNumber - 1;
      this.quantity = this.currentNumber;
    }
    return this.currentNumber;
  }
 
  increaseCartItem() {
   this.currentNumber = this.currentNumber + 1;
    this.quantity = this.currentNumber
  }
 
  removeCartItem(o) {
    // firebase.firestore().collection('Wishlist').doc(o.id).delete()
    this.dbWishlist.doc(o.id).delete();
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.quantity, 0);
    
  }
  sizeSelect(i, val, y) {
    this.sizes = i.detail.value;
   }


}
