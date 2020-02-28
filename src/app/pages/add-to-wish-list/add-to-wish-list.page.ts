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

   async CheckBoxes(obj, id, value){
     console.log("jjjjjjjjj ");
     
    let index = this.cart.indexOf(obj);
        // if (index === -1) {
        //     if (event.target.checked){
        //       return this.cart.push(obj);
        //     }
        // } else {
        //     if (!event.target.checked){
        //         // return this.cart.splice(index, 1);
        //     }
        // }
        
        console.log("jjjjjjjjj ", obj);
    
      







        
    // firebase.firestore().collection("MyCart").doc().set(
    //   {
    //   date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    //   customerUid:firebase.auth().currentUser.uid,
    //   name:obj.obj.name,
    //   desc:obj.obj.desc,
    //   status:'received',
    //   size: this.sizes,
    //   price:obj.obj.price,
    //   quantity: this.currentNumber,
    //   image:obj.obj.image,
    //   amount:obj.obj.price * obj.obj.quantity,
    //   checked : obj.obj.checked 
    // })
   
    // firebase.firestore().collection("WishList").doc(id).delete()
    //   const alert = await this.alertCtrl.create({
    //     header: '',
    //     subHeader: '',
    //     message: 'Item added to Cart',
    //     buttons: ['Ok']
    //   });
  
    //   await alert.present();

 
  


   


   
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

  increment() {
    this.currentNumber = this.currentNumber + 1;
    this.event.quantity = this.currentNumber
  }

   decrement() {
    if (this.currentNumber > 1) {
      this.currentNumber = this.currentNumber - 1;
      this.event.quantity = this.currentNumber;
    }
    return this.currentNumber;
  }
  
  addToCart() {
    
      // firebase.firestore().collection("WishList").onSnapshot(data => {

        
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
             
            // firebase.firestore().collection("MyCart").doc().set(item.data())
            //  firebase.firestore().collection("WishList").doc(item.id).delete()
             
             
          }
          // console.log(item.data());
        })
      //  })

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
