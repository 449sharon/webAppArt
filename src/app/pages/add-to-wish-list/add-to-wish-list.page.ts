import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController,PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { CartServiceService } from 'src/app/services/cart-service.service';
import * as moment from 'moment';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Popover2Component } from 'src/app/components/popover2/popover2.component';
import { ProductService } from 'src/app/services/product-service.service';


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
  cartWish = [];
  myArr = [];
  mysize: string = '';
  sizes = [];
  quantity : number = 1;
  checkbox=[];
  checked : boolean;
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

  Mydata = {

    image: '',
    imageSide: '',
    imageBack: '',
    imageTop: '',
    categories:'',
    lastcreated : '',
    name:'',
    productCode: '',
    price:0,
    desc: null,
    items:'',
    checked:false,
    sizes: [],
    quantity  : 1,
    ratings : ''

   }
  
  value : boolean 
  tempIndex = [] 
  selectedItems = []

  MyDataToCart = []
  productCode: any;
  price: number;
  productCount=0;
  myCart = false;
  constructor(public modalController: ModalController,
    public toastController : ToastController,
    private cartService: CartServiceService,
    public data: ProductService,
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

//     this.Mydata.image = this.data.data.image
//   this.Mydata.imageSide = this.data.data.imageSide
//   this.Mydata.imageBack = this.data.data.imageBack
//   this.Mydata.imageTop = this.data.data.imageTop
//   this.Mydata.categories = this.data.data.categories
//   this.Mydata.lastcreated  = this.data.data.lastcreated
//   this.Mydata.name = this.data.data.name
//   this.Mydata.productCode = this.data.data.productCode
//   this.Mydata.price = this.data.data.price
//   this.Mydata.desc = this.data.data.desc
//   this.Mydata.items = this.data.data.items
//   this.Mydata.sizes = this.data.data.sizes;
//   this.Mydata.checked = this.data.data.checked
//   this.Mydata.quantity  = this.data.data.quantity
//   this.Mydata.ratings  = this.data.data.ratings
// console.log("Image side ",this.data.data.imageSide);

// console.log("This data is ",this.data.data , 'got', this.Mydata.sizes);

  }
  ngOnInit() {
    this.wishItemCount = this.cartService.getWishItemCount();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.getProducts();
  }

/*ADDING MY ITEMS FROM WISHLIST TO THE CART*/



   async CheckBoxes(obj){
  console.log(obj)

    // let index = this.cart.indexOf(obj);
    //     if (index === -1) {
    //         if (event.target.checked){
    //           return this.cart.push(obj);
    //         }
    //     } else {
    //         if (!event.target.checked){
    //             // return this.cart.splice(index, 1);
    //         }
    //     }
        
  }

  getProducts() {

    firebase.firestore().collection("WishList").onSnapshot(data => {
      this.cart = []
      let obj = {obj : {}, id : ""}
      data.forEach(item => {
        if(item.data().customerUid == firebase.auth().currentUser.uid){
          this.myCart = true
          obj.obj = item.data()
          obj.id = item.id
          this.cart.push(obj)
          obj = {obj : {}, id : ""}
          console.log("my wishlist products", item.data());
        }else  {
          this.myCart = false
        }
      })
    })
    
  }

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
  
  addToCart(productCode) {
    
      
    let addCart = firebase.firestore().collection('MyCart')
  let increment: number = 0
  addCart.where('productCode', '==', productCode).get().then((snapshot => {
  if(snapshot.size > 0){
   console.log('Do not add to wish list');
    snapshot.forEach(data => {
      increment = data.data().quantity + 1
      addCart.doc(data.id).set({quantity: increment }, {merge: true});
      console.log('items increment by one');
      
    })
  }else{

    console.log(this.cart);
  
    this.cart.forEach(item => {
      if(item.checked === true){
         console.log("my item ", item);
         console.log("all of my items ", item.obj.name, item.obj.productCode, item.obj.desc, item.obj.size, item.obj.price, item.obj.quantity, item.obj.image);
         firebase.firestore().collection("MyCart").add({

      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      customerUid:firebase.auth().currentUser.uid,
      name:item.obj.name,
      productCode:item.obj.productCode,
      desc:item.obj.desc,
      status:'received',
      size: item.obj.size,
      price:item.obj.price,
      quantity: item.obj.quantity,
      image:item.obj.image,
      amount:item.obj.price * item.obj.quantity
      }).then(res => {
        firebase.firestore().collection("WishList").doc(item.id).delete()
        })
      }
    })

  }
        
  }))
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

  plus(prod, index) {
    let id = prod.id
    this.dbWishlist.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(1) }).then(res => {

    })

  }
  minus(prod, id) {
    // let id = prod.id
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
