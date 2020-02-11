import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
//import { FileSaver } from 'file-saver';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
declare var require: any
const FileSaver = require('file-saver');
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
  conArray: Array<any> = []
  PList = []
  storage;
  key: any;
  loading: any;
  orderNumber: any;

  delType: string = '';
  delCost: number = 0;
  status: string = '';
  pdfLink = null;
  MyPdf = "";

  listDiv: any = document.getElementsByClassName('item-dsiplay');
  list: boolean = false;
  loader: boolean = true;

  trackOrders = {
    name: '',
    size: '',
    quantity: 0,
    total: 0,
    image: '',
    productCode: '',
    desc: '',
    amount: ''
  }
  orderStatus = '';
  pageName;
  reciept = '';
  constructor(public modalController: ModalController, private render: Renderer2, public route: ActivatedRoute,
     private http : HttpClient) {
    this.pageName = `${this.pageName}`;
    this.name = `${this.name}`;
    this.amount = `${this.amount}`;
    this.quantity = `${this.quantity}`;
    this.image = `${this.image}`;
    this.arr = `${this.arr}`;
    this.price = `${this.price}`;
    this.totalPrice = `${this.totalPrice}`;
  
  }

  ngOnInit() {
    /* this.arr.forEach((i)=>{
      console.log('My info ', i.prod);
    }) */
    console.log("My array ", this.arr);

    this.getProduct(this.ref)
    console.log("My page ", this.pageName)
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    }).then((res) => {
      console.log(res['data']);

    });
  }
  getProduct(key) {
    if (this.pageName === 'history') {
      this.dbHistory.doc(key).onSnapshot((file) => {
        //console.log(file.data(), '55555');
        //this.Orders.push(file.data())
        this.orderStatus = file.data().status
        this.reciept = file.data().pdfLink;
      })
    } else {
      //console.log("This is my key", key);
      this.dbOrder.doc(key).onSnapshot((file) => {
        //console.log(file.data(), '55555');
        //this.Orders.push(file.data())
        this.orderStatus = file.data().status
      })
    }

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
  downLoad() {
    FileSaver.saveAs(this.reciept);
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

    if (this.pageName === 'pending') {
      this.trackOrders.name = p.obj.name;
      this.trackOrders.quantity = p.obj.quantity;
      this.trackOrders.size = p.obj.size;
      this.trackOrders.total = p.obj.total;
      this.trackOrders.image = p.obj.image;
      this.trackOrders.productCode = p.obj.productCode;
      this.trackOrders.desc = p.obj.desc;
      this.trackOrders.amount = p.obj.amount;
    } else {
      this.trackOrders.name = p.name;
      this.trackOrders.quantity = p.quantity;
      this.trackOrders.size = p.size;
      this.trackOrders.total = p.total;
      this.trackOrders.image = p.image;
      this.trackOrders.productCode = p.productCode;
      this.trackOrders.desc = p.desc;
      this.trackOrders.amount = p.amount;
    }



    this.list = !this.list;

    this.loader = false;

  }
}
