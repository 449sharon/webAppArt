import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, PopoverController, NavParams } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TrackOrderPage } from '../track-order/track-order.page';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  cartItemCount: BehaviorSubject<number>;
  db = firebase.firestore();
  storage = firebase.storage().ref();
  uid
  customerUid = firebase.auth().currentUser.uid;
  dbOrder = firebase.firestore().collection('Order');
  profile = {
    image: '',
    name: '',
    number:'',
    address: '',
  
    email: firebase.auth().currentUser.email,
   
    uid: '',
    
  }
  Allorders = [];
  loader: boolean = true;
  uploadprogress = 0;
  errtext = '';
  isuploading = false;
  isuploaded = false;
  isprofile = false;
  admin = {
    uid: '',
    email:''
  }
  
  constructor(public alertCtrl: AlertController,
    private router: Router,
    public modalController: ModalController
   ) { 
    this.uid = firebase.auth().currentUser.uid;
    
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }
 
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Got admin', user);
        this.admin.uid = user.uid
        this.admin.email = user.email
        this.GetOrders();
      this.getProfile();
      } else {
        console.log('no admin');
        
      }
    })
  }
  async getImage(image){
    let imagetosend = image.item(0);
    if (!imagetosend) {
      const imgalert = await this.alertCtrl.create({
        message: 'Select image to upload',
        buttons: [{
          text: 'Okay',
          role: 'cancel'
        }]
      });
      imgalert.present();
    } else {
      if (imagetosend.type.split('/')[0] !== 'image') {
        const imgalert = await this.alertCtrl.create({
          message: 'Unsupported file type.',
          buttons: [{
            text: 'Okay',
            role: 'cancel'
          }]
        });
        imgalert.present();
        imagetosend = '';
        return;
       } else {
        const upload = this.storage.child(image.item(0).name).put(imagetosend);
        upload.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadprogress = progress;
          this.isuploading = true;
          if (progress==100){
            this.isuploading = false;
          } 
        }, error => {
        }, () => {
          upload.snapshot.ref.getDownloadURL().then(downUrl => {this.ngOnInit
            this.profile.image = downUrl;
            this.uploadprogress = 0;
            this.isuploaded = true;
          });
        });
        this.loader
       }
    }
  }
  createAccount(){
    if (!this.profile.address||!this.profile.name||!this.profile. number){
      this.errtext = 'Fields should not be empty'
    } else {
      if (!this.profile.image){
        this.errtext = 'Profile image still uploading or not selected';
      } else {
        this.profile.uid =  this.admin.uid;
        this.db.collection('UserProfile').doc(firebase.auth().currentUser.uid).set(this.profile).then(res => {
          console.log('Profile created');
          this.getProfile();
        }).catch(error => {
          console.log('Error');
        });
      }
    }
  }
   getProfile(){
    this.db.collection('UserProfile').where('uid', '==', this.admin.uid).get().then(snapshot => {
      if (snapshot.empty) {
        this.isprofile = false;
      } else {
        this.isprofile = true;
        snapshot.forEach(doc => {
          this.profile.address = doc.data().address;
          this.profile.image= doc.data().image
          this.profile.name=doc.data().name
        
          this.profile.number=doc.data().number
          this.profile.email=doc.data().email
          
        })
      }
    })
    ////
    //////
  }
  edit() {
    this.isprofile = false;
  }
     ////////////////////////////////// 
     GetOrders(){
      this.dbOrder.where('userID','==',firebase.auth().currentUser.uid).onSnapshot((data)=>{
              console.log("olx", data);
              this.Allorders = [];
                data.forEach((item)=>{
                  this.Allorders.push({ref:item.id,info:item.data(), total:item.data()})
                })
                console.log("ccc", this.Allorders);
    
          }) 
      }
    
  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }
  async createTrackOder(item) {
    console.log(item)
    const modal = await this.modalController.create({
      component:TrackOrderPage,
      cssClass: 'track-order',
      componentProps: { ref: item.ref,totalPrice: item.info.totalPrice,name: item.info.product[0].prod.product_name,price: item.info.product[0].prod.price,quantity: item.info.product[0].prod.quantity,image: item.info.product[0].prod.image,
      arr:item.info.product },
    },);
    return await modal.present();
  }
  
  
}