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

  CheckBox(event, data){
    console.log(event);
    console.log(data);
    
    console.log(event.target.checked);
    let isChecked = event.target.checked
    if(isChecked === true){
      this.addToTheCart.push(data)
    }else{
      for(let i in this.addToTheCart){
        if(this.addToTheCart[i] === data){
          console.log('there is a matching item in add to the cart');
          this.addToTheCart.splice(Number(i), 1)
        }
      }
      
    }
    console.log(this.addToTheCart);
    
    console.log(data);
    
    console.log("My method is called ", data.obj);

    console.log(this.value);
    console.log(this.value);
    
    
    this.value = !this.value
  
    // if(this.value){
    //   console.log("My method is called ", this.value);

    //   setTimeout(() => {

    //     this.dbWishlist.doc(data.id).update({
    //       categories : data.obj.categories,
    //       checked : true,
    //       desc : data.obj.desc,
    //       image :data.obj.image,
    //       // items : data.obj.items,
    //       // lastcreated : data.obj.lastcreated,
    //       name : data.obj.name,
    //       price : data.obj.price,
    //       //  productCode : data.obj.productCode,
    //       // quantity : data.obj.quantity,
    //       // size : data.obj.size,
    //     })

    //   }, 2000)

    // this.tempIndex.push(data.id)

    // this.addToTheCart.push(data.obj)
  
    // }
    // else{
    //   console.log("My method is called ", this.value);
    
    //   setTimeout(() => {

    //     firebase.firestore().collection("Wishlist").doc(data.id).update({
    //       categories : data.obj.obj.categories,
    //       checked : false,
    //       desc : data.obj.obj.desc,
    //       image :data.obj.obj.image,
    //       // items : data.obj.obj.items,
    //       // lastcreated : data.obj.obj.lastcreated,
    //       name : data.obj.obj.name,
    //       price : data.obj.obj.price,
    //      productCode : data.obj.obj.productCode,
    //       // quantity : data.obj.obj.quantity,
    //       // size : data.obj.obj.size,
    //     })
    //   }, 3000)
    // }
  }

  getProducts() {

    

    firebase.firestore().collection("WishList").onSnapshot(data => {
      this.cart = []
      data.forEach(item => {
        if(item.data().customerUid == firebase.auth().currentUser.uid){
          this.cart.push(item.data())
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
    console.log(this.addToTheCart);
    let dataInTheCart : Array<any> = []
    let add : boolean = false
    //firebase.firestore().collection('Cart')
    // this.addToTheCart.forEach(item => {
      
    // })
    let exists : boolean
    //this.addToTheCart.forEach(item => {
      // this.toastPopover(this.event)
      //console.log(item.obj);
      firebase.firestore().collection("Cart").where('customerUid', '==', firebase.auth().currentUser.uid).get().then((result : any) => {
        console.log(result);
        
        for(let key in result.docs){
          dataInTheCart.push(result.docs[key].data())
        }
        for(let i in this.addToTheCart){
          if(dataInTheCart.length === 0){
            add = true
          }
          for(let j in dataInTheCart){
            if(dataInTheCart[j].id === this.addToTheCart[i].obj.id){
              console.log('found a match');
              add = false
              break
            }else{
              add = true
            }
          }
          if(add === true){
            firebase.firestore().collection("Cart").add(this.addToTheCart[i].obj).then(result => {
              firebase.firestore().collection('Wishlist').doc(this.addToTheCart[i].obj.id).delete()
            })
          }else{
            //firebase.firestore().collection('Wishlist').doc(item.obj.id).delete()
          }
        }
      }).then( result => {
        console.log(dataInTheCart);
        
      })

    //})
    // this.addToTheCart = []

    // setTimeout(() => {

    //   this.tempIndex.forEach(key => {
    //     firebase.firestore().collection("Wishlist").doc(key).delete()
    //  })

    // }, 3000)
    // this.cartItemCount.next(this.cartItemCount.value + 1);
 


    // console.log("my list");

    //     this.myProd=[];
    //    for (let j = 0; j < this.cart.length; j++) {
    //     console.log('Products ', this.cart[j]);
    //     this.myProd.push(this.cart[j]);
    //    }
    //    this.dbCart.doc().set({
    //      product: this.myProd
    //     }).then(() => {
    //       this.myProd=[];
    //           this.dbWishlist.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
    //             res.forEach((i)=>{
    //               console.log("Delete all the items on my wishlist", i);
    //               this.dbWishlist.doc(i.id).delete();
    //             })
    //         })
    //    })
    //     console.log('My prod ', this.myProd);
    //      this.dismiss(); 
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

  // plus(prod, index) {
  //   let id = prod.id
  //   this.dbWishlist.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(1) }).then(res => {

  //   })

  // }
  // minus(prod, index) {
  //   let id = prod.id
  //   if (prod.obj.quantity === 1) {
  //   } else {
  //     this.dbWishlist.doc(id).update({ quantity: firebase.firestore.FieldValue.increment(-1) }).then(res => {

  //     })
  //   }
  // }

  increaseCartItem() {
   this.currentNumber = this.currentNumber + 1;
    this.quantity = this.currentNumber
  }
 
  removeCartItem(o) {
    this.dbWishlist.doc(o).delete()
  }
 
  // getTotal() {
  //   return this.cart.reduce((i, j) => i + j.obj.price * j.obj.quantity, 0);
    
  // }
  sizeSelect(i, val, y) {
    this.sizes = i.detail.value;
   }


}
