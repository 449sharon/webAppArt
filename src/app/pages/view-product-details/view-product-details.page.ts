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
import * as moment from 'moment';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  db = firebase.firestore();
  customerUid: any;
  dbCart = firebase.firestore().collection('Cart');
  SpecialScrin = []
  proSales = [];
   currentNumber: number = 1;
  Products = [];
  specials = []
  myProduct = false;
  sizes = null;
  MyObj = [];
  cartForm : FormGroup;
  size = [];
  event = {
    image: '',
    categories: '',
    name: '',
    price: 0,
    productCode: '',
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


  productSize = {
    small: false,
    medium: false,
    large: false
  }
  id
  image = ""

  CartNumber = 0;
  constructor(public modalController: ModalController,
    public productService: ProductService,
    public data: ProductService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public cartService: CartServiceService,
    private router: Router,
    private fb: FormBuilder,
    public popoverController: PopoverController) { 
     
      this.adminInfo();
      this.cartForm = this.fb.group({
        size: new FormControl('', Validators.compose([Validators.required]))
      })
    }

  ngOnInit() {

  
    firebase.firestore().collection("Sales").orderBy("percentage", "desc").limit(1).onSnapshot(snapshot => {
      this.specials = []
      snapshot.forEach(data => {
        this.specials.push(data.data())
        console.log("Percentage ", data.data());
        
      })
    })
    
    // firebase.firestore().collection("Sales").orderBy("percentage", "desc").limit(1).onSnapshot(snapshot => {
    //   this.specials = []
    //   snapshot.forEach(data => {
    //     this.specials.push(data.data())
    //     console.log("Percentage ", data.data());
        
    //   })
    // })
    

    this.db.collection('Sales').limit(4).onSnapshot(snapshot => {
      this.proSales = [];
              snapshot.forEach(doc => {
              
                this.proSales.push( doc.data());
               
              });
              this.SpecialScrin.push(this.proSales[0])
          
       });

    this.wishItemCount = this.cartService.getWishItemCount();
    this.cartItemCount = this.cartService.getCartItemCount();
    console.log("Data in the view Details ", this.data.data);
    // console.log('$(event)');
    
    // console.log(this.data.data.image);
  }

   increment(p) {
    this.currentNumber = this.currentNumber + 1;
    this.Mydata.quantity = this.currentNumber
  }

   decrement(p) {
    if (this.currentNumber > 1) {
      this.currentNumber = this.currentNumber - 1;
      this.Mydata.quantity = this.currentNumber;
    }
    return this.currentNumber;
  }

  ionViewWillEnter() {

  

  
  this.Mydata.image = this.data.data.image
  this.Mydata.imageSide = this.data.data.imageSide
  this.Mydata.imageBack = this.data.data.imageBack
  this.Mydata.imageTop = this.data.data.imageTop
  this.Mydata.categories = this.data.data.categories
  this.Mydata.lastcreated  = this.data.data.lastcreated
  this.Mydata.name = this.data.data.name
  this.Mydata.productCode = this.data.data.productCode
  this.Mydata.price = this.data.data.price
  this.Mydata.desc = this.data.data.desc
  this.Mydata.items = this.data.data.items
  this.Mydata.sizes = this.data.data.sizes;
  this.Mydata.checked = this.data.data.checked
  this.Mydata.quantity  = this.data.data.quantity
  this.Mydata.ratings  = this.data.data.ratings


console.log("This data is ",this.data.data , 'got', this.Mydata.sizes);

  
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
        this.productSize.small = !this.productSize.small
        if(this.productSize.small) {
          this.size.push('S');
          console.log(this.size);
          
        }else {
          this.size.splice(this.size.indexOf('S') , 1);
          console.log(this.size);
        }
        break;
      case 'M':
        this.productSize.medium = !this.productSize.medium
        if(this.productSize.medium) {
          this.size.push('M');
          console.log(this.size);
          
        }else {
          this.size.splice(this.size.indexOf('M') , 1);
          console.log(this.size);
        }
        break;
      case 'L':
        this.productSize.large = !this.productSize.large
        if(this.productSize.large) {
          this.size.push('L');
          console.log(this.size);
          
        }else {
          this.size.splice(this.size.indexOf('L') , 1);
          console.log(this.size);
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
  

  
  addToCart() {
    
    if(firebase.auth().currentUser == null) {
      console.log('please login');
      this.ConfirmationAlert();
    this.createModalLogins();

      
    }else {
      this.customerUid = firebase.auth().currentUser.uid;
         let customerUid = firebase.auth().currentUser.uid;

  firebase.firestore().collection("Cart").doc().set({

    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    customerUid:firebase.auth().currentUser.uid,
    name:this.Mydata.name,
    productCode:this.Mydata.productCode,
    desc:this.Mydata.desc,
    status:'received',
    size: this.size,
    price:this.Mydata.price,
    quantity: this.Mydata.quantity,
    image:this.Mydata.image,
    amount:this.Mydata.price * this.Mydata.quantity


  })
   
    // this.cartItemCount.next(this.cartItemCount.value + 1);
    // this.dismiss();
    this.toastPopover(event)
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

  
  star1(value, key){
    console.log("Method called", key.id, "value ", value); 

   
  
    firebase.firestore().collection("Products").doc(key.id).set({
      ratings : value
    }, {merge : true})

  }

  addWishlist() {



      if(firebase.auth().currentUser == null){
         console.log('please like this');
         this.ConfirmationAlertWish();
         this.createModalLogins()
       }else{
        this.customerUid = firebase.auth().currentUser.uid;


        firebase.firestore().collection("WishList").doc().set({

          date: moment().format('MMMM Do YYYY, h:mm:ss a'),
          customerUid:firebase.auth().currentUser.uid,
          name:this.Mydata.name,
      
          desc:this.Mydata.desc,
          status:'received',
          size: this.sizes,
          price:this.Mydata.price,
          quantity: this.Mydata.quantity,
          image:this.Mydata.image,
          amount:this.Mydata.price * this.Mydata.quantity,
          checked : this.Mydata.checked 
      
        })

       }
       this.wishItemCount.next(this.wishItemCount.value + 1);
       this.presentToast(event)
    } 
  async toastPopover(ev) {
    const popover = await this.popoverController.create({
      component:Popover2Component,
      event: ev,
      cssClass: 'wishlist',
      translucent: true,
    });
    
   popover.present();
    setTimeout(()=>popover.dismiss(),500);
    
    
  }
  async presentToast(ev) {
    const popover = await this.popoverController.create({
      component:Popover3Component,
      event: ev,
      cssClass: 'wishlist',
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
   Info = []
   adminInfo(){
    this.db.collection('admins').get().then(snapshot => {
    this.Info = [];
    if (snapshot.empty) {
           this.myProduct = false;
         } else {
           this.myProduct = true;
           snapshot.forEach(doc => {
             this.Info.push(doc.data());
             console.log("admin", this.Info);
           });
           
         }
     })
  }


  allSpecials(event){

    console.log("Data here ", event);
    
  this.Mydata.image = event.image
  this.Mydata.categories = event.categories
  this.Mydata.lastcreated  = event.lastcreated
  this.Mydata.name =event.name
  this.Mydata.productCode = event.productCode
  this.Mydata.price = event.price
  this.Mydata.desc = event.desc
  this.Mydata.items = event.items
  this.Mydata.sizes = event.sizes
  this.Mydata.quantity = event.data.quantity
  this.Mydata.ratings  = event.ratings
    
  }


  TermsAndConditions(){}
  PrivacyPolicy(){}
  createFaqs(){}
}