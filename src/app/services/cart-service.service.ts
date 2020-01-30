import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartItemCount = new BehaviorSubject(0);
  private wishItemCount = new BehaviorSubject(0);

  constructor() { }

  getCartItemCount() {
    return this.cartItemCount;
  }

  getWishCount(){
    return this.wishItemCount;
  }
}
