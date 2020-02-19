import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController,PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { CartServiceService } from 'src/app/services/cart-service.service';
import * as moment from 'moment';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Popover2Component } from 'src/app/components/popover2/popover2.component';

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
  value : boolean 
  tempIndex = [] 
  addToTheCart = []

  MyDataToCart = []

  productCode: any;
  price: number;
  productCount=0;
  myCart: boolean;
  constructor(public modalController: ModalController,
    public toastController : ToastController,
    private cartService: CartServiceService,
    public popoverController: PopoverController,
    private alertCtrl: AlertController) {
    this.dbUser.doc(firebase.auth().currentUser.uid).onSnapshot(element => {
      console.log(element.data());
      this.name = element.data().name
      console.log('cartList', this.cartProduct)
    })
   }
   ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }
  ngOnInit() {
    this.wishItemCount = this.cartService.getWishItemCount();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.getProducts();
  }

/*ADDING MY ITEMS FROM WISHLIST TO THE CART*/

  CheckBox(event, id, value){


    console.log(event," dddd ", value);
    let checked : boolean = !value;

    firebase.firestore().collection("WishList").doc(id).set({checked : checked}, {merge : true})
   
  }

  getProducts() {

    

    firebase.firestore().collection("WishList").onSnapshot(data => {
      this.cart = []
      let obj = {obj : {}, id : ""}
      data.forEach(item => {
        if(item.data().customerUid == firebase.auth().currentUser.uid){
          obj.obj = item.data()
          obj.id = item.id
          this.cart.push(obj)
          obj = {obj : {}, id : ""}
          console.log("my wishlist products", item.data());
        }
      })
    })
    
    // this.dbWishlist.where("customerUid","==",firebase.auth().currentUser.uid).onSnapshot(data => {
      
    //   this.cart = []
    //   data.forEach(item => {
    //     let obj = {
    //       obj : item.data(), 
    //       id : item.id
    //     }
    //     this.cart.push(obj)    
    //   })
    // })

//     console.log("mylist....");
    
//       this.dbWishlist.onSnapshot((res)=>{
//       this.cart = [];
//       let obj = {obj : {}, id : ""}
//       res.forEach((doc)=>{

//         obj.obj = doc.data()
//         obj.id = doc.id

//         this.cart.push(obj);
//         obj = {obj : {}, id : ""}
//         let i = this.cart.length
//         this.cart[i -1]['productID'] 
// console.log("vvv", this.cart);
//       })
//     })
  }

  
  addToCart() {
    
 
      

      firebase.firestore().collection("WishList").onSnapshot(data => {

        this.MyDataToCart = []
  
        data.forEach(item => {
          if(item.data().checked){
            //  this.MyDataToCart.push(item.data())
            firebase.firestore().collection("Cart").doc().set(item.data())
             firebase.firestore().collection("WishList").doc(item.id).delete()
          }
        })
       })

   



  }


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

  getCartItemCount() {
    return this.cartItemCount;
  }
  
  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }

  plus(prod) {
    let id = prod.id
    this.dbWishlist.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(1) }).then(res => {

    })

  }
  minus(prod) {
    let id = prod.id
    if (prod.obj.quantity === 1) {
    } else {
      this.dbWishlist.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(-1) }).then(res => {

      })
    }
  }

  increaseCartItem() {
   this.currentNumber = this.currentNumber + 1;
    this.quantity = this.currentNumber
  }
 
  removeCartItem(o) {
    console.log("data id ", o);
    
   

    firebase.firestore().collection("WishList").doc(o).delete()
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.obj.price * j.obj.quantity, 0);
    
  }
  sizeSelect(i, val, y) {
    this.sizes = i.detail.value;
   }


}
