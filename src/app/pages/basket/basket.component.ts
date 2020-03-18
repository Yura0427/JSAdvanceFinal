import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  items = []
  totalPrice: number = 0

  name: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  arrOrder: any[]

  constructor(private orderService: OrderService, ) { }

  ngOnInit() {
    this.getItems()
  }

  getItems() {
    this.items = [];
    this.totalPrice = 0
    for (let i = 0; i < localStorage.length; i++) {
      const item = JSON.parse(localStorage.getItem(localStorage.key(i)))
      this.items.push(item)
      this.totalPrice += (JSON.parse(localStorage.getItem(localStorage.key(i))).price * JSON.parse(localStorage.getItem(localStorage.key(i))).quantity)
    }
  }
  minus(item) {
    const it = JSON.parse(localStorage.getItem(item.key))
    if (it.quantity > 1) {
      it.quantity = it.quantity - 1
    }
    localStorage.setItem(item.key, JSON.stringify(it))
    this.getItems()
  }
  plus(item) {
    const it = JSON.parse(localStorage.getItem(item.key))
    it.quantity = it.quantity + 1
    localStorage.setItem(item.key, JSON.stringify(it))
    this.getItems()
  }

  delProd(item) {
    localStorage.removeItem(item.key)
    this.getItems()
  }

  order(items) {
    this.arrOrder = []
    items.forEach(element => {
      this.arrOrder.push(`Ключ замовленя: ${element.key} Кількість: ${element.quantity}`)  
      // this.productService.usersRef.doc(element.key).valueChanges().subscribe(
      //   data => {
      //     console.log(data)
      //   })
    });
    this.orderService.createOrder({
      name:  this.name,
      email: this.email,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      orders: this.arrOrder,
    })
  }
}
