import { Component, OnInit, Renderer2,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.page.html',
  styleUrls: ['./track-order.page.scss'],
})
export class TrackOrderPage implements OnInit {
  @Input() id: any;
  ref;
  name;
  amount;
  quantity;
  image;
  arr;
  price;
  totalPrice;
  active: any;
dbOrder = firebase.firestore().collection('Order');
dbProfile = firebase.firestore().collection('userProfile');
dbHistory = firebase.firestore().collection('orderHistory');
uid = firebase.auth().currentUser.uid;
db = firebase.firestore();
Orders = []
pdfObj = null;
productOrder = [];
conArray : Array<any> = []
PList = []
storage;
key: any;
loading: any;
orderNumber :any;

delType: string = '';
delCost: number = 0;
status: string = '';
pdfLink = null;
MyPdf = "";

  listDiv: any = document.getElementsByClassName('item-dsiplay');
  list: boolean = false;
  loader: boolean = true;

  trackOrders =  {
    name: '',
    size: '',
    quantity: 0,
    total: 0,
    image: '',
    productCode: '',
    desc: '',
    amount: ''
  }


  constructor(public modalController: ModalController,private render: Renderer2,public route: ActivatedRoute, ) { 
  
  this.name = `${this.name}`;
  this.amount = `${this.amount}`;
  this.quantity = `${this.quantity}`;
  this.image=`${this.image}`;
  this.arr = `${this.arr}`;
  this.price = `${this.price}`;
  this.totalPrice = `${this.totalPrice}`;
  }

  ngOnInit() {
    this.arr.forEach((i)=>{
      console.log('My info ', i.prod);
    })
    console.log(`${this.ref} ${this.name}`)
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    }).then((res)=>{
      console.log(res['data']);
      
    });
  }
  getProduct(key) {
    console.log("This is my key", key);
  
    this.db.collection('Order').doc(key).onSnapshot((file) => {
      console.log(file.data(), '55555');
      this.Orders.push(file.data())
      }) 
  }
  orderReady() {
    this.dbOrder.doc(this.key).onSnapshot((res) => {
      if (res.data().status === 'ready') {
        //console.log('Collect');
        this.dbHistory.doc(this.key).set({ date: new Date().getTime(), pdfLink: null }).then(() => {
          this.dbOrder.doc(this.key).delete();
        })
      } else {
        console.log('Wait until it is');
      }
    })
  }
  // dismiss() {
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  //   }
  downLoad(){
  

 
    // console.log("This is your Plist ", this.PList);
    
      
    //   // this.PList.forEach(pdf => {
    //   //   this.MyPdf = pdf.pdfLink
    //   // })
    
      setTimeout(() => {
        window.location.href = this.PList[0];
       }, 3000);
    }
  // showList() {
  //   this.list = !this.list;
  //   this.loader = true;

  //     setTimeout(() => {
  //       if(this.list) {
  //         this.render.setStyle(this.listDiv[0], 'display', 'block');
    
  //       }else {
  //         setTimeout(() => {
  //           this.render.setStyle(this.listDiv[0], 'display', 'none');
  //         }, 500);
  //       }
  //       this.loader = false;
  //     }, 1000);
  // }
  showList(i, p) {
    this.active = i;

    console.log('year', p);


    this.trackOrders.name = p.obj.name;
    this.trackOrders.quantity = p.obj.quantity;
    this.trackOrders.size = p.obj.size;
    this.trackOrders.total = p.obj.total;
    this.trackOrders.image = p.obj.image;
    this.trackOrders.productCode = p.obj.productCode;
    this.trackOrders.desc = p.obj.desc;
    this.trackOrders.amount =p.obj.amount;
    
   
    this.list = !this.list;
     
          this.loader = false;
       
 }
}
