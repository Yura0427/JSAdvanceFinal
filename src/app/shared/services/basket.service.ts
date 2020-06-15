import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  itemsLength: number;
  items: EventEmitter<number> = new EventEmitter();

  constructor() { };

  getItemsLength() {
    this.itemsLength = null;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) != 'user') {
        this.itemsLength++;
      }
      this.items.next(this.itemsLength);
    }
  }
}
