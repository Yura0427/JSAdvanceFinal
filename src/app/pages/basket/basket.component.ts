import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  items = []
  totalPrice: number = 0

  constructor() { }

  ngOnInit() {
    this.getItems()
  }

  getItems() {
    this.items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const item = JSON.parse(localStorage.getItem(localStorage.key(i)))
      this.items.push(item)
      this.totalPrice += JSON.parse(localStorage.getItem(localStorage.key(i))).price
    }
  }

  delProd(item) {
    localStorage.removeItem(item.key)
    this.getItems() 
  }

}
