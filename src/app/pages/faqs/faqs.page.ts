import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase'
import { AlertController } from '@ionic/angular';
import { QueryValueType } from '@angular/compiler/src/core';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {

  dbFaq = firebase.firestore();
//    firstQues = {
//      question1: '',
//      answer1: ''
//    }
//    SecondQues = {
//     question2: '',
//     answer2: ''
//   }
//   refundQues = {
//     question1: '',
//     answer1: ''
//   }
//   refunds1Ques = {
//    question2: '',
//    answer2: ''
//  }
//  returnQues = {
//   question1: '',
//   answer1: ''
// }
// returns1Ques = {
//  question2: '',
//  answer2: ''
// }
// technicalQues = {
//   question1: '',
//   answer1: ''
// }
// technical1Ques = {
//  question2: '',
//  answer2: ''
// }
questions = [];
searchArray = [];
ordershipment = [];
Refund = [];
Return = [];
Technical = [];
  refunds: string;
  return :string;
  technical :string;
  constructor(public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit(){

 this.dbFaq.collection('FAQS').doc('OrdersShipment').collection('questions').get().then((data) => {
  console.log('messges',data);
   let order =[] ;  
  
  data.forEach(doc => {
    order.push(doc.data());
      console.log('messges', doc.data());
    });
    console.log('question',order);
    this.ordershipment=order
    let array = []

    this.questions = this.questions.concat(this.ordershipment)
    console.log(this.questions);
    
  
 
    
    // this.firstQues.answer1 = data.data().answer;
    // this.firstQues.question1 = data.data().question1;

 })
 this.dbFaq.collection('FAQS').doc('Refunds').collection('Questions').get().then((data) => {
  console.log('refund',data);
   let refun =[] ;  
  
  data.forEach(doc => {
    refun.push(doc.data());
      console.log('refund', doc.data());
    });
    console.log('question', refun);
    this.Refund= refun
    let array = []

    this.questions = this.questions.concat(this.Refund)
    console.log(this.questions);
    
  
 
    
    // this.firstQues.answer1 = data.data().answer;
    // this.firstQues.question1 = data.data().question1;

 })
 this.dbFaq.collection('FAQS').doc('Returns').collection('Questions').get().then((data) => {
  console.log('Return',data);
   let ret =[] ;  
  
  data.forEach(doc => {
    ret.push(doc.data());
      console.log('Return', doc.data());
    });
    console.log('question', ret);
    this.Return= ret
    let array = []

    this.questions = this.questions.concat(this.Return)
    console.log(this.questions);
    
  
 
    
    // this.firstQues.answer1 = data.data().answer;
    // this.firstQues.question1 = data.data().question1;

 })
 this.dbFaq.collection('FAQS').doc('Technical').collection('Questions').get().then((data) => {
  console.log('messges',data);
   let tech =[] ;  
  
  data.forEach(doc => {
    tech.push(doc.data());
      console.log('messges', doc.data());
    });
    console.log('question',tech);
    this.Technical=tech
    let array = []

    this.questions = this.questions.concat(this.Technical)
    console.log(this.questions);
    
  
 
    
    // this.firstQues.answer1 = data.data().answer;
    // this.firstQues.question1 = data.data().question1;

 })
 
// this.dbFaq.collection('FAQS').doc('Refunds').collection('Questions').get().then((data) => {

//   this.refundQues.answer1 = data.data().answer;
//   this.refundQues.question1 = data.data().question1;

// })

// this.dbFaq.collection('FAQS').doc('Returns').collection('Questions').get().then((data) => {

//   this.returnQues.answer1 = data.data().answer;
//   this.refundQues.question1 = data.data().question1;

// })

// this.dbFaq.collection('FAQS').doc('Technical').collection('Questions').get().then((data) => {

//   this.technicalQues.answer1 = data.data().answer;
//   this.technicalQues.question1 = data.data().question1;

// })

// this.dbFaq.collection('FAQS').doc('Refunds').get().then((data) => {

//   this.refunds = data.data().refunds;

// })
// this.dbFaq.collection('FAQS').doc('Returns').get().then((data) => {

//   this.return = data.data().returns;

// })
// this.dbFaq.collection('FAQS').doc('Technical').get().then((data) => {

//   this.technical = data.data().technical;

// })

  }
  searchresult(event) {
    // console.log(usersinput);
    console.log(event.target.value);
    this.filterItems(event.target.value, this.questions)
    console.log(this.questions);
    // this.changingValue()
  }
  filterItems(query, array) {
    let queryFormatted = query.toLowerCase();
    // console.log(queryFormatted);
    // console.log(array);
    if (queryFormatted !== '' && queryFormatted !== '*') {
      let answerResult = array.filter(item => item.answer.toLowerCase().indexOf(queryFormatted) >= 0)
      let questionResult = array.filter(item => item.question1.toLowerCase().indexOf(queryFormatted) >= 0)
      console.log(answerResult);
      console.log(questionResult);
      let returnResult
      let addToReturn: boolean
      returnResult = answerResult
      if (returnResult.length === 0) {
        returnResult = questionResult
      }
      for (let i in questionResult) {
        addToReturn = false
        for (let key in returnResult) {
          if (returnResult[key].docRef !== questionResult[i].docRef) {
            console.log(returnResult[key].docRef);
            addToReturn = true
          } else if (returnResult[key].docRef === questionResult[i].docRef) {
            addToReturn = false
            break
          }
        }
        if (addToReturn === true) {
          returnResult.push(questionResult[i])
        }
      }
      console.log('ideas are flowing');
      let addBrand: boolean
      let addCategory: boolean
      let addName: boolean
      addName = false
      addCategory = false
      addBrand = false
      //// console.log(brandResult);
      //// console.log(categoryResult);
      // console.log(nameResult);
      this.searchArray = returnResult
    } else if (queryFormatted === '*') {
      this.searchArray = this.questions
    }
    console.log(this.searchArray);
  }








  async ShowAnswer(items, i){
    console.log("Called");
    
    setTimeout(() => {
      this.searchArray.splice(i, 1)
    }, 1000);

    const alert = await this.alertController.create({
      header: 'Answer is :',
      subHeader: '',
      message: items.answer,
      buttons: ['OK']
    });

    await alert.present();

  }

  
dismiss(){
  this.modalController.dismiss({
    'dismissed':true
  });
}


}
